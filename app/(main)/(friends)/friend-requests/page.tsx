"use client";
import FriendsRequest from "@/components/social/friend-requests";
import SocialTabs from "@/components/social/social-tabs";

export default function SearchFriendsPage() {
  return (
    <SocialTabs activeTab="requests">
      <FriendsRequest />
    </SocialTabs>
  );
}
