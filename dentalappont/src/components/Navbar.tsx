"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  CalendarIcon,
  CrownIcon,
  HomeIcon,
  MicIcon,
  ShieldIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const isAdmin = user?.publicMetadata?.role === "admin";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "Voice", href: "/voice", icon: MicIcon },
    { name: "Pro", href: "/pro", icon: CrownIcon },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DentWise Logo"
              width={36}
              height={36}
              className="w-10"
            />
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />

                  <span
                    className={`hidden md:inline transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* 🔥 ADMIN BUTTON (Only Visible To Admin) */}
            {isAdmin && (
              <Link
                href="/admin"
                className={`relative group flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/admin")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShieldIcon className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>

                {pathname.startsWith("/admin") && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          <div className="hidden lg:flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.emailAddresses?.[0]?.emailAddress}
            </span>
          </div>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
