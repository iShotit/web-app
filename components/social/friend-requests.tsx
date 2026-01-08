import {
  useAcceptFriendRequest,
  useDeclineFriendRequest,
  useGetFriendsRequestList,
} from "@/app/api/friends";
import { SearchResult } from "@/types/type";
import { UserItem } from "./user-list-item";
import { InviteButton } from "./invite-buttons";

export default function FriendRequests() {
  const { friendsRequestList, isFetchingFriendRequestList } =
    useGetFriendsRequestList();
  const { acceptFriendRequest, acceptFriendRequestIsPending } =
    useAcceptFriendRequest();
  const { declineFriendRequest, declineFriendRequestIsPending } =
    useDeclineFriendRequest(); // Decline hook

  if (isFetchingFriendRequestList) {
    return "loading...";
  }
  const searchResults: SearchResult[] = friendsRequestList?.map(
    (request: any) => ({
      photo: "",
      status: request.status as "UNACCEPTED" | "PENDING" | "ACCEPTED",
      userId: request.friendFrom.user._id,
      username: request.friendFrom.user.username,
    })
  );

  return (
    <div>
      <div className="space-y-3">
        {searchResults.map((user) => (
          <div
            key={user.userId}
            className="flex items-center justify-between p-4 bg-white rounded-xl 
                               shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <UserItem user={user} />

            <div className=" flex items-center space-x-4">
              <InviteButton
                onClick={() =>
                  acceptFriendRequest({ requestUser: user.userId })
                }
                isLoading={acceptFriendRequestIsPending}
                status="Accept"
              />
              <InviteButton
                onClick={() =>
                  declineFriendRequest({ requestUser: user.userId })
                }
                isLoading={declineFriendRequestIsPending}
                status="decline"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
