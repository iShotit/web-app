import { SearchResult } from "@/types/type";
// import { InviteButton } from "./invite-buttons";
import { UserItem } from "./user-list-item";

interface UserListProps {
  filteredUsers: SearchResult[];
  // loadingUserId: string | null;
  // invitedUsers: Set<string>;
  // handleInvite: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  filteredUsers,
  // loadingUserId,
  // invitedUsers,
  // handleInvite,
}) => {
  return (
    <div className="space-y-3">
      {filteredUsers.map((user) => (
        <div
          key={user.userId}
          className="flex items-center justify-between p-4 bg-white rounded-xl 
                     shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <UserItem user={user} />

          {/* <InviteButton
            onClick={() => handleInvite(user.userId)}
            isLoading={loadingUserId === user.userId}
            status={invitedUsers.has(user.userId) ? "PENDING" : user.status}
          /> */}
        </div>
      ))}
    </div>
  );
};
