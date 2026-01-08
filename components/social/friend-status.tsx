import { useGetIncomingFriendRequests } from "@/app/api/friends";
import React from "react";

const FriendStatus = () => {
  const { incomingFriendRequests, isFetchingIncomingRequests } =
    useGetIncomingFriendRequests();

  console.log({ incomingFriendRequests, isFetchingIncomingRequests });
  return <div>friendStatus</div>;
};

export default FriendStatus;
