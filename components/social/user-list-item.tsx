import Image from "next/image";
import { avatar } from "@/lib/constant";

interface UserItemProps {
  user: {
    userId: string;
    username: string;
    status: string;
  };
}

export const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
        <Image src={avatar} alt={user.username} fill className="object-cover" />
      </div>
      <span className="font-medium text-gray-800">{user.username}</span>
    </div>
  );
};
