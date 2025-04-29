"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface SocialTabsProps {
  children: ReactNode;
  activeTab: "search" | "friends" | "requests" | "status";
  friendsCount?: number;
  requestsCount?: number;
  sentRequestsCount?: number;
}

export default function SocialTabs({
  children,
  activeTab,
  friendsCount = 0,
  requestsCount = 0,
}: // sentRequestsCount = 0,
SocialTabsProps) {
  const tabs = [
    {
      id: "search",
      label: "Find Friends",
      href: "/search-friends",
      count: null,
    },
    {
      id: "friends",
      label: "Friends",
      href: "/friends",
      count: friendsCount > 0 ? friendsCount : null,
    },
    {
      id: "requests",
      label: "Requests",
      href: "/friend-requests",
      count: requestsCount > 0 ? requestsCount : null,
    },
    // {
    //   id: "status",
    //   label: "Sent",
    //   href: "/friend-request-status",
    //   count: sentRequestsCount > 0 ? sentRequestsCount : null,
    // },
  ];

  return (
    <div>
      <div className="flex border-b mb-6">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium flex-1 transition-colors text-center relative ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {tab.count !== null && (
              <span className="absolute top-0 right-1 -mt-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
