"use client";

import { Trash2, Plus } from "lucide-react";
import SettingsSectionWrapper from "@/components/settings/SettingsSectionWrapper";
import { Holiday } from "@/types/holiday";

interface PublicHolidaysSectionProps {
  holidays: Holiday[];
  onAdd: () => void;
  onDelete: (id: number) => void;
}

export default function PublicHolidaysSection({
  holidays,
  onAdd,
  onDelete,
}: PublicHolidaysSectionProps) {
  return (
    <SettingsSectionWrapper title="Public holidays">
      <div className="space-y-0">
        {holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="flex items-center justify-between border-b py-6"
          >
            <div>
              <p className="text-2xl text-slate-800">{holiday.title}</p>
              <p className="text-lg text-slate-500">
                {new Date(holiday.holiday_date).toLocaleDateString()}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDelete(holiday.id)}
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
          <span>Add a new public holiday</span>
        </button>
      </div>
    </SettingsSectionWrapper>
  );
}