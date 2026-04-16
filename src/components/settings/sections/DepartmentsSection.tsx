"use client";

import { Trash2, Plus } from "lucide-react";
import SettingsSectionWrapper from "@/components/settings/SettingsSectionWrapper";
import { Department } from "@/types/department";
import { User } from "@/types/user";

interface DepartmentsSectionProps {
  departments: Department[];
  users: User[];
  onAdd: () => void;
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

export default function DepartmentsSection({
  departments,
  users,
  onAdd,
  onEdit,
  onDelete,
}: DepartmentsSectionProps) {
  const getUsersInDepartment = (departmentId: number) => {
    return users.filter((user) => user.department_id === departmentId);
  };

  return (
    <SettingsSectionWrapper
      title="Departments"
      description="Group staff into departments."
    >
      <div className="space-y-0">
        {departments.map((department) => {
          const departmentUsers = getUsersInDepartment(department.id);

          return (
            <div
              key={department.id}
              className="grid items-center gap-4 border-b py-6 lg:grid-cols-[1.5fr_1fr_1fr_auto_auto]"
            >
              <button
                type="button"
                onClick={() => onEdit(department)}
                className="text-left text-2xl text-slate-800"
              >
                {department.name}
              </button>

              <p className="text-xl text-slate-700">
                {departmentUsers[0]?.full_name || "-"}
              </p>

              <p className="text-xl text-slate-700">
                {departmentUsers.length} people
              </p>

              <div className="flex -space-x-3">
                {departmentUsers.slice(0, 3).map((user) => {
                  const initials = user.full_name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={user.id}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-slate-400 text-xl text-white"
                    >
                      {initials}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onDelete(department.id)}
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 size={24} />
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={onAdd}
          className="mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-blue-400 px-8 py-10 text-left text-2xl text-blue-500"
        >
          <Plus size={32} />
          <span>Add a new department</span>
        </button>
      </div>
    </SettingsSectionWrapper>
  );
}