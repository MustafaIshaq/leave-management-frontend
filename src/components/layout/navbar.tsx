"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AuthUser, getStoredUser, logoutUser } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);

  // Read logged-in user from localStorage after component mounts
  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
  }, []);

  // Build navbar links based on role
  const navLinks = useMemo(() => {
    if (!user) return [];

    if (user.role === "ADMIN") {
      return [
        { name: "Wall Chart", href: "/wall-chart" },
        { name: "Calendar", href: "/calendar" },
        { name: "Leave Requests", href: "/leave-requests" },
        { name: "Users", href: "/users" },
        { name: "Settings", href: "/settings" },
      ];
    }

    if (user.role === "DIRECTOR") {
      return [
        { name: "Wall Chart", href: "/wall-chart" },
        { name: "Calendar", href: "/calendar" },
        { name: "Leave Requests", href: "/leave-requests" },
        { name: "Users", href: "/users" },
      ];
    }

    return [
      { name: "Wall Chart", href: "/wall-chart" },
      { name: "Calendar", href: "/calendar" },
      { name: "My Leaves", href: "/my-leaves" },
    ];
  }, [user]);

  // Logout action
  const handleSignOut = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/wall-chart" className="text-xl font-bold">
          LeaveFlow
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link key={link.name} href={link.href}>
                <Button variant={isActive ? "default" : "ghost"}>
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none">
            <Avatar>
              <AvatarFallback>
                {user?.full_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role || ""}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push("/profile")}>
              My Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile nav links */}
      <div className="border-t px-4 py-2 md:hidden">
        <nav className="flex flex-wrap gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link key={link.name} href={link.href}>
                <Button variant={isActive ? "default" : "ghost"} size="sm">
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}