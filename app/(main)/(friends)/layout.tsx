import type { ReactNode } from "react";

export default function SocialLayout({ children }: { children: ReactNode }) {
  return <main className="container mx-auto px-4 py-8 ">{children}</main>;
}

// max-w-[480px]
