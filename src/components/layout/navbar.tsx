"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// shadcn components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Temporary user data
  // Later this will come from localStorage or backend
  const user = {
    name: "Mustafa Ishaq",
    role: "ADMIN", // Change to "USER" to test role-based links
  };

  // All navbar links
  const navLinks = [
    { name: "Wall Chart", href: "/wall-chart" },
    { name: "Calendar", href: "/calendar" },
    { name: "Users", href: "/users", adminOnly: true },
    { name: "Settings", href: "/settings", adminOnly: true },
  ];

  // Filter links based on role
  const filteredLinks = navLinks.filter((link) => {
    if (link.adminOnly && user.role !== "ADMIN") {
      return false;
    }
    return true;
  });

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/wall-chart" className="text-xl font-bold">
          LeaveFlow
        </Link>

        {/* Desktop navbar links */}
        <nav className="hidden items-center gap-2 md:flex">
          {filteredLinks.map((link) => {
            // Check if current page is active
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
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            {/* User info */}
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>

            <DropdownMenuSeparator />

            {/* Go to profile page */}
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              My Details
            </DropdownMenuItem>

            {/* Sign out */}
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile navbar links */}
      <div className="border-t px-4 py-2 md:hidden">
        <nav className="flex flex-wrap gap-2">
          {filteredLinks.map((link) => {
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