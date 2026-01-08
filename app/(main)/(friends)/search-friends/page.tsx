"use client";
import SearchFriends from "@/components/social/search-friends";
import SocialTabs from "@/components/social/social-tabs";

export default function SearchFriendsPage() {
  return (
    <SocialTabs activeTab="search">
      <SearchFriends />
    </SocialTabs>
  );
}
