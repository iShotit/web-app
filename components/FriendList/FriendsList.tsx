"use client";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";

import { avatar } from "@/lib/constant";
import { IFriendsList } from "@/types/type";
import { useGetUser } from "@/app/api/user";
import { clearStorage } from "@/lib/localStorage";

interface FriendsListProps {
  user: {
    name: string;
    avatar: string;
  };
  friends: IFriendsList;
}

export default function FriendsList({ friends }: FriendsListProps) {
  const { profileData } = useGetUser();

  const router = useRouter();

  const handleLogout = () => {
    clearStorage();

    router.push("auth/sign-in");
  };

  const imageUrl =
    profileData?.photo && profileData.photo !== "null"
      ? profileData.photo
      : avatar;

  return (
    <div className="w-full  max-w-xs bg-white rounded-lg   ">
      {/* User Profile Section */}
      <div className="p-4 ">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={imageUrl || avatar}
              alt={profileData?.firstname || ""}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{profileData?.username}</h2>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Your friends</h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.userId} className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src={friend.photo || avatar}
                  alt={friend.username}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{friend.username}</p>
                <p className="text-sm text-gray-500">Friend</p>
              </div>
            </div>
          ))}
        </div>
        {/* <Link
          href="/friends"
          className="block text-center text-sm font-medium text-gray-900 hover:text-gray-700 mt-4 py-2"
        >
          View Friends List
        </Link> */}
      </div>
    </div>
  );
}
