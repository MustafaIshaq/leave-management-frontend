"use client";

import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SettingsSectionWrapper from "@/components/settings/SettingsSectionWrapper";
import { LeaveType } from "@/types/leaveType";

interface LeaveTypesSectionProps {
  leaveTypes: LeaveType[];
  onAdd: () => void;
  onEdit: (leaveType: LeaveType) => void;
  onDelete: (id: number) => void;
}

export default function LeaveTypesSection({
  leaveTypes,
  onAdd,
  onEdit,
  onDelete,
}: LeaveTypesSectionProps) {
  return (
    <SettingsSectionWrapper
      title="Leave types"
      description="Create different categories for different days off."
    >
      <div className="space-y-0">
        {leaveTypes.map((leaveType) => (
          <div
            key={leaveType.id}
            className="flex items-center justify-between border-b py-6"
          >
            <button
              type="button"
              onClick={() => onEdit(leaveType)}
              className="flex items-center gap-4 text-left"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: leaveType.color }}
              >
                {leaveType.name.charAt(0)}
              </div>

              <div>
                <p className="text-2xl text-slate-800">{leaveType.name}</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onDelete(leaveType.id)}
              className="text-slate-400 hover:text-red-500"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="mt-6 flex w-full items-center gap-4 rounded-2xl border-2 border-blue-400 px-8 py-10 text-left text-2xl text-blue-500"
        >
          <Plus size={32} />
          <span>Add a new leave type</span>
        </button>
      </div>
    </SettingsSectionWrapper>
  );
}