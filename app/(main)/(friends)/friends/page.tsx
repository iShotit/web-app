"use client";
import FriendsList from "@/components/social/friends-list";
import SocialTabs from "@/components/social/social-tabs";

export default function SearchFriendsPage() {
  return (
    <SocialTabs activeTab="friends">
      <FriendsList />
    </SocialTabs>
  );
}
