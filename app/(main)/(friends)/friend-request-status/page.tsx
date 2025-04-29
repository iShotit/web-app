"use client";
import FriendStatus from "@/components/social/friend-status";
import SocialTabs from "@/components/social/social-tabs";

export default function SearchFriendsPage() {
  return (
    <SocialTabs activeTab="status">
      <FriendStatus />
    </SocialTabs>
  );
}
