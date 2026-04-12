"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
import UserActionsMenu from "./UserActionsMenu";

interface UserRowProps {
  user: User;
  departmentName: string;
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export default function UserRow({
  user,
  departmentName,
  onEdit,
  onDelete,
}: UserRowProps) {
  // Create initials from full name
  const initials = user.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <tr className="border-b">
      {/* Checkbox */}
      <td className="p-4 align-middle">
        <Checkbox />
      </td>

      {/* Name */}
      <td className="p-4 align-middle">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <p className="font-medium text-blue-600">{user.full_name}</p>
        </div>
      </td>

      {/* Email */}
      <td className="p-4 align-middle text-gray-600">{user.email}</td>

      {/* Department name */}
      <td className="p-4 align-middle text-gray-600">{departmentName}</td>

      {/* Actions */}
      <td className="p-4 text-right align-middle">
        <UserActionsMenu
          onEdit={() => onEdit(user.id)}
          onDelete={() => onDelete(user.id)}
        />
      </td>
    </tr>
  );
}