"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
import { Department } from "@/types/department";
import UserRow from "./UserRow";

interface UsersTableProps {
  users: User[];
  departments: Department[];
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
}

export default function UsersTable({
  users,
  departments,
  onEdit,
  onDelete,
}: UsersTableProps) {
  // Helper to get department name from department_id
  const getDepartmentName = (departmentId: number | null) => {
    if (!departmentId) return "-";

    const department = departments.find((dep) => dep.id === departmentId);
    return department ? department.name : "-";
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              departmentName={getDepartmentName(user.department_id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}