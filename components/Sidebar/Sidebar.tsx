"use client";

// import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Users,
  MessageCircle,
  Monitor,
  Camera,
  DollarSign,
  BellDotIcon,
  User,
} from "lucide-react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Ishot from "@/assets/ishot.svg";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-6 h-6" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Search className="w-6 h-6" />,
    label: "Search",
    href: "/search-friends",
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: "About iShot-ft",
    href: "/about",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    label: "How it Works",
    href: "/how-it-works",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    label: "Premium",
    href: "/premium",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: "Monetise",
    href: "/monetise",
  },
  {
    icon: <BellDotIcon className="w-6 h-6" />,
    label: "Notification",
    href: "/notification",
  },
  {
    icon: <User className="w-6 h-6" />,
    label: "Profile",
    href: "/profile",
  },
];

export default function Sidebar() {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sticky top-0 left-0 h-screen transform md:translate-x-0 transition duration-200 ease-in-out z-30 md:max-w-[340px] md:w-full bg-white  border-r`}
      >
        {/* Logo */}
        <div className="py-2 relative w-full h-[50px]">
          <Image
            src={Ishot}
            alt="Ishot"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="md:px-4 py-2 ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-3 md:px-4 py-3 mx-auto md:mx-0 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>{item.icon}</TooltipTrigger>
                  <TooltipContent>
                    <span className="font-medium md:hidden">{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="md:flex flex-col  hidden ">
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
