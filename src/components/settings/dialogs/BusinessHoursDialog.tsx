"use client";

import { useEffect, useState } from "react";
import { BusinessHours } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BusinessHoursDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: BusinessHours;
  onSave: (value: BusinessHours) => void;
}

const days: { key: keyof BusinessHours; label: string }[] = [
  { key: "monday", label: "Mon" },
  { key: "tuesday", label: "Tue" },
  { key: "wednesday", label: "Wed" },
  { key: "thursday", label: "Thu" },
  { key: "friday", label: "Fri" },
  { key: "saturday", label: "Sat" },
  { key: "sunday", label: "Sun" },
];

export default function BusinessHoursDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: BusinessHoursDialogProps) {
  const [localHours, setLocalHours] = useState<BusinessHours>(value);

  useEffect(() => {
    setLocalHours(value);
  }, [value, open]);

  const handleToggle = (day: keyof BusinessHours, checked: boolean) => {
    setLocalHours((prev) => ({
      ...prev,
      [day]: checked ? { start: "09:00", end: "17:00" } : null,
    }));
  };

  const handleTimeChange = (
    day: keyof BusinessHours,
    field: "start" | "end",
    fieldValue: string
  ) => {
    setLocalHours((prev) => ({
      ...prev,
      [day]: prev[day]
        ? {
            ...prev[day]!,
            [field]: fieldValue,
          }
        : { start: "09:00", end: "17:00" },
    }));
  };

  const handleSave = () => {
    onSave(localHours);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-light">Business hours</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-[100px_1fr] gap-8">
            {/* Left side day labels */}
            <div className="space-y-5 pt-14">
              {days.map((day) => (
                <div key={day.key} className="h-14 text-2xl text-slate-700">
                  {day.label}
                </div>
              ))}
            </div>

            {/* Right side inputs */}
            <div className="grid gap-10 lg:grid-cols-2">
              {/* AM column */}
              <div>
                <h3 className="mb-6 text-center text-3xl text-slate-800">AM</h3>

                <div className="space-y-5">
                  {days.map((day) => {
                    const enabled = localHours[day.key] !== null;

                    return (
                      <div key={`${day.key}-am`} className="flex items-center gap-4">
                        <Checkbox
                          checked={enabled}
                          onCheckedChange={(checked) =>
                            handleToggle(day.key, Boolean(checked))
                          }
                        />

                        <div className="flex flex-1 items-center gap-4 rounded-lg bg-slate-100 px-6 py-4">
                          <Input
                            type="time"
                            value={enabled ? localHours[day.key]?.start ?? "09:00" : "09:00"}
                            disabled={!enabled}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleTimeChange(day.key, "start", e.target.value)
                            }
                            className="border-0 bg-transparent text-2xl shadow-none"
                          />
                          <span className="text-2xl text-slate-600">to</span>
                          <Input
                            type="time"
                            value={enabled ? localHours[day.key]?.end ?? "17:00" : "17:00"}
                            disabled={!enabled}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleTimeChange(day.key, "end", e.target.value)
                            }
                            className="border-0 bg-transparent text-2xl shadow-none"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PM column placeholder to match design */}
              <div>
                <h3 className="mb-6 text-center text-3xl text-slate-800">PM</h3>

                <div className="space-y-5">
                  {days.map((day) => {
                    const enabled = localHours[day.key] !== null;

                    return (
                      <div key={`${day.key}-pm`} className="flex items-center gap-4">
                        <Checkbox
                          checked={enabled}
                          onCheckedChange={(checked) =>
                            handleToggle(day.key, Boolean(checked))
                          }
                        />

                        <div className="flex flex-1 items-center gap-4 rounded-lg bg-slate-100 px-6 py-4 opacity-70">
                          <Input
                            type="time"
                            value={enabled ? "13:00" : "13:00"}
                            disabled
                            className="border-0 bg-transparent text-2xl shadow-none"
                          />
                          <span className="text-2xl text-slate-600">to</span>
                          <Input
                            type="time"
                            value={enabled ? "17:00" : "17:00"}
                            disabled
                            className="border-0 bg-transparent text-2xl shadow-none"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <Button onClick={handleSave} className="rounded-full px-8 py-6 text-xl">
              Save changes
            </Button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-2xl text-slate-400"
            >
              CANCEL
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}