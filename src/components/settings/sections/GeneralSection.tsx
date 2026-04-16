"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingsSectionWrapper from "@/components/settings/SettingsSectionWrapper";
import { BusinessHours, SettingsData } from "@/types/settings";

interface GeneralSectionProps {
  settings: SettingsData;
  companyName: string;
  timezone: string;
  businessHours: BusinessHours;
  onCompanyNameChange: (value: string) => void;
  onTimezoneChange: (value: string) => void;
  onOpenBusinessHours: () => void;
}

export default function GeneralSection({
  companyName,
  timezone,
  businessHours,
  onCompanyNameChange,
  onTimezoneChange,
  onOpenBusinessHours,
}: GeneralSectionProps) {
  const openDays = Object.entries(businessHours)
    .filter(([, value]) => value !== null)
    .map(([key]) => key.slice(0, 3))
    .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .sort()
    .join(", ");

  return (
    <SettingsSectionWrapper title="Workspace settings">
      <div className="space-y-8">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:items-center">
          <Label htmlFor="company_name" className="text-2xl font-semibold text-slate-800">
            Company name
          </Label>
          <Input
            id="company_name"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onCompanyNameChange(e.target.value)
            }
            className="h-16 bg-slate-100 text-xl"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:items-center">
          <Label htmlFor="timezone" className="text-2xl font-semibold text-slate-800">
            Time zone
          </Label>
          <Input
            id="timezone"
            value={timezone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTimezoneChange(e.target.value)
            }
            className="h-16 bg-slate-100 text-xl"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[280px_1fr] lg:items-center">
          <p className="text-2xl font-semibold text-slate-800">Business hours</p>

          <button
            type="button"
            onClick={onOpenBusinessHours}
            className="text-left text-2xl text-blue-500 underline underline-offset-4"
          >
            {openDays || "No business days selected"}
          </button>
        </div>
      </div>
    </SettingsSectionWrapper>
  );
}