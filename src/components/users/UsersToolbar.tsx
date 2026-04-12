"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsersToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  userCount: number;
  onAddUser: () => void;
}

export default function UsersToolbar({
  search,
  setSearch,
  userCount,
  onAddUser,
}: UsersToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left side - user count */}
      <p className="text-sm text-gray-600">{userCount} users</p>

      {/* Middle - search */}
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder="Search for a user"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Right side - add button */}
      <Button onClick={onAddUser}>+ Add someone</Button>
    </div>
  );
}