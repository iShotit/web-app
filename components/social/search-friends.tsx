import { useEffect, useState } from "react";
import { useFriendsSearch, useSendFriendRequest } from "@/app/api/friends";
import { SearchResult } from "@/types/type";
import { SearchInput } from "./search-input";
import { NoUsersFound } from "./no-users-found";
import useDebounce from "@/hooks/use-debounce";
import { UserItem } from "./user-list-item";
import { InviteButton } from "./invite-buttons";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedUsers, setInvitedUsers] = useState(new Set<string>());
  const [filteredUsers, setFilteredUsers] = useState<SearchResult[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const { searchFriend } = useFriendsSearch();
  const { sendFriendRequest } = useSendFriendRequest();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery === "") {
      setFilteredUsers([]);
      return;
    }

    (async () => {
      const response = await searchFriend({ search: debouncedSearchQuery });
      setFilteredUsers(response.data);
    })();
  }, [debouncedSearchQuery, invitedUsers, searchFriend]);

  const handleInvite = async (userId: string) => {
    try {
      setLoadingUserId(userId);
      await sendFriendRequest({ requestUser: userId });
      setInvitedUsers((prev) => new Set(prev).add(userId));
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search users..."
        />

        {searchQuery && filteredUsers.length === 0 ? (
          <NoUsersFound searchQuery={searchQuery} />
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.userId}
                className="flex items-center justify-between p-4 bg-white rounded-xl 
                               shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <UserItem user={user} />

                <InviteButton
                  onClick={() => handleInvite(user.userId)}
                  isLoading={loadingUserId === user.userId}
                  status={
                    invitedUsers.has(user.userId) ? "PENDING" : user.status
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
