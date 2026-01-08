"use client";

import { useGetFriendsList } from "@/app/api/friends";
import { SearchResult } from "@/types/type";
import React from "react";
import { UserItem } from "./user-list-item";
// import { InviteButton } from "./invite-buttons";

const FriendsList = () => {
  const { friendsList, isFetchingFriendList } = useGetFriendsList();
  // const { unfriendUser, unfriendUserIsPending } = useUnfriendRequest();

  if (isFetchingFriendList) {
    return "loading...";
  }

  const searchResults: SearchResult[] = friendsList?.map((request: any) => ({
    photo: "",
    status: "ACCEPTED",
    userId: request.userId,
    username: request.username,
  }));

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
              {/* <InviteButton
                onClick={() => unfriendUser({ requestUser: user.userId })}
                isLoading={unfriendUserIsPending}
                status="remove"
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
