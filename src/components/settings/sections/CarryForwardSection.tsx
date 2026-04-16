"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingsSectionWrapper from "@/components/settings/SettingsSectionWrapper";

interface CarryForwardSectionProps {
  carryForwardEnabled: boolean;
  maxCarryForwardDays: string;
  maxCarryForwardHours: string;
  onCarryForwardEnabledChange: (value: boolean) => void;
  onMaxCarryForwardDaysChange: (value: string) => void;
  onMaxCarryForwardHoursChange: (value: string) => void;
}

export default function CarryForwardSection({
  carryForwardEnabled,
  maxCarryForwardDays,
  maxCarryForwardHours,
  onCarryForwardEnabledChange,
  onMaxCarryForwardDaysChange,
  onMaxCarryForwardHoursChange,
}: CarryForwardSectionProps) {
  return (
    <SettingsSectionWrapper
      title="Carry forward"
      description="How much unused allowance can be transferred into the next leave year."
    >
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-2xl font-semibold text-slate-800">
            Users with allowances in days
          </h3>

          <div className="flex items-center gap-4 text-2xl text-slate-700">
            <span>Carry forward</span>
            <Input
              type="number"
              value={maxCarryForwardDays}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onMaxCarryForwardDaysChange(e.target.value)
              }
              className="h-16 w-28 bg-slate-100 text-xl"
            />
            <span>days (max)</span>
          </div>
        </div>

        <div className="border-t pt-8">
          <h3 className="mb-4 text-2xl font-semibold text-slate-800">
            Users with allowances in hours
          </h3>

          <div className="flex items-center gap-4 text-2xl text-slate-700">
            <span>Carry forward</span>
            <Input
              type="number"
              value={maxCarryForwardHours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onMaxCarryForwardHoursChange(e.target.value)
              }
              className="h-16 w-28 bg-slate-100 text-xl"
            />
            <span>hours (max)</span>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex items-center gap-4">
            <Label className="text-2xl font-semibold text-slate-800">
              Carry forward enabled?
            </Label>

            <button
              type="button"
              onClick={() => onCarryForwardEnabledChange(!carryForwardEnabled)}
              className={`relative h-8 w-16 rounded-full transition ${
                carryForwardEnabled ? "bg-blue-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  carryForwardEnabled ? "left-9" : "left-1"
                }`}
              />
            </button>

            <span className="text-2xl text-slate-600">
              {carryForwardEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
    </SettingsSectionWrapper>
  );
}