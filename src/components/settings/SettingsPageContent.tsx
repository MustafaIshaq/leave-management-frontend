"use client";

import { useEffect, useState } from "react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import GeneralSection from "@/components/settings/sections/GeneralSection";
import CarryForwardSection from "@/components/settings/sections/CarryForwardSection";
import LeaveTypesSection from "@/components/settings/sections/LeaveTypesSection";
import DepartmentsSection from "@/components/settings/sections/DepartmentsSection";
import PublicHolidaysSection from "@/components/settings/sections/PublicHolidaysSection";
import BusinessHoursDialog from "@/components/settings/dialogs/BusinessHoursDialog";
import LeaveTypeDialog from "@/components/settings/dialogs/LeaveTypeDialog";
import DepartmentDialog from "@/components/settings/dialogs/DepartmentDialog";
import PublicHolidayDialog from "@/components/settings/dialogs/PublicHolidayDialog";

import { getSettings, updateSettings } from "@/services/settingsService";
import {
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
} from "@/services/leaveTypeService";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/departmentService";
import { getUsers } from "@/services/userService";
import { getHolidays, createHoliday, deleteHoliday } from "@/services/holidayService";

import { SettingsData, BusinessHours, UpdateSettingsPayload } from "@/types/settings";
import { LeaveType } from "@/types/leaveType";
import { Department } from "@/types/department";
import { User } from "@/types/user";
import { Holiday } from "@/types/holiday";
import { toast } from "sonner";

type SettingsTab =
  | "general"
  | "carry-forward"
  | "leave-types"
  | "departments"
  | "public-holidays";

export default function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [companyName, setCompanyName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" },
    saturday: null,
    sunday: null,
  });
  const [carryForwardEnabled, setCarryForwardEnabled] = useState(false);
  const [maxCarryForwardDays, setMaxCarryForwardDays] = useState("0");
  const [maxCarryForwardHours, setMaxCarryForwardHours] = useState("0");
  const [defaultLeaveDays] = useState("25");
  const [defaultLeaveHours] = useState("180");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Dialog states
  const [businessHoursOpen, setBusinessHoursOpen] = useState(false);

  const [leaveTypeDialogOpen, setLeaveTypeDialogOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | null>(null);

  const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [settingsData, leaveTypesData, departmentsData, usersData, holidaysData] =
        await Promise.all([
          getSettings(),
          getLeaveTypes(),
          getDepartments(),
          getUsers(),
          getHolidays(),
        ]);

      setSettings(settingsData);
      setLeaveTypes(leaveTypesData);
      setDepartments(departmentsData);
      setUsers(usersData);
      setHolidays(holidaysData);

      setCompanyName(settingsData.company_name || "");
      setTimezone(settingsData.timezone || "");
      setBusinessHours(settingsData.business_hours);
      setCarryForwardEnabled(settingsData.carry_forward_enabled || false);
      setMaxCarryForwardDays(String(settingsData.max_carry_forward_days ?? "0"));
      setMaxCarryForwardHours(String(settingsData.max_carry_forward_hours ?? "0"));
    } catch (err) {
      console.error("SETTINGS PAGE ERROR:", err);
      setError("Failed to load settings page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);

      const payload: UpdateSettingsPayload = {
        company_name: companyName,
        timezone,
        business_hours: businessHours,
        carry_forward_enabled: carryForwardEnabled,
        max_carry_forward_days: Number(maxCarryForwardDays),
        max_carry_forward_hours: Number(maxCarryForwardHours),
        default_leave_days: Number(defaultLeaveDays),
        default_leave_hours: Number(defaultLeaveHours),
      };

      await updateSettings(payload);
      await fetchAllData();
    } catch (err) {
      console.error("UPDATE SETTINGS ERROR:", err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  // Leave types handlers
  const handleOpenAddLeaveType = () => {
    setSelectedLeaveType(null);
    setLeaveTypeDialogOpen(true);
  };

  const handleOpenEditLeaveType = (leaveType: LeaveType) => {
    setSelectedLeaveType(leaveType);
    setLeaveTypeDialogOpen(true);
  };

  const handleSubmitLeaveType = async (data: {
    name: string;
    unit: "DAYS" | "HOURS" | "BOTH";
    is_deductible: boolean;
    color: string;
  }) => {
    if (selectedLeaveType) {
      await updateLeaveType(selectedLeaveType.id, data);
    } else {
      await createLeaveType(data);
    }
    await fetchAllData();
  };

const handleDeleteLeaveType = async (id: number) => {
  try {
    await deleteLeaveType(id);
    toast.success("Leave type deleted.");
    await fetchAllData();
  } catch (err) {
    console.error("DELETE LEAVE TYPE ERROR:", err);
    toast.error("Failed to delete leave type.");
  }
};

  // Department handlers
  const handleOpenAddDepartment = () => {
    setSelectedDepartment(null);
    setDepartmentDialogOpen(true);
  };

  const handleOpenEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setDepartmentDialogOpen(true);
  };

  const handleSubmitDepartment = async (data: { name: string }) => {
    if (selectedDepartment) {
      await updateDepartment(selectedDepartment.id, data);
    } else {
      await createDepartment(data);
    }
    await fetchAllData();
  };

  const handleDeleteDepartment = async (id: number) => {
  try {
    await deleteDepartment(id);
    toast.success("Department deleted.");
    await fetchAllData();
  } catch (err) {
    console.error("DELETE DEPARTMENT ERROR:", err);
    toast.error("Failed to delete department.");
  }
};

  // Holiday handlers
  const handleSubmitHoliday = async (data: { title: string; holiday_date: string }) => {
    await createHoliday(data);
    await fetchAllData();
  };

const handleDeleteHoliday = async (id: number) => {
  try {
    await deleteHoliday(id);
    toast.success("Holiday deleted.");
    await fetchAllData();
  } catch (err) {
    console.error("DELETE HOLIDAY ERROR:", err);
    toast.error("Failed to delete holiday.");
  }
};

  if (loading) {
    return <p className="text-sm text-gray-500">Loading settings...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <SettingsSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

        <div className="space-y-6">
          {activeTab === "general" && settings && (
            <GeneralSection
              settings={settings}
              companyName={companyName}
              timezone={timezone}
              businessHours={businessHours}
              onCompanyNameChange={setCompanyName}
              onTimezoneChange={setTimezone}
              onOpenBusinessHours={() => setBusinessHoursOpen(true)}
            />
          )}

          {activeTab === "carry-forward" && (
            <CarryForwardSection
              carryForwardEnabled={carryForwardEnabled}
              maxCarryForwardDays={maxCarryForwardDays}
              maxCarryForwardHours={maxCarryForwardHours}
              onCarryForwardEnabledChange={setCarryForwardEnabled}
              onMaxCarryForwardDaysChange={setMaxCarryForwardDays}
              onMaxCarryForwardHoursChange={setMaxCarryForwardHours}
            />
          )}

          {activeTab === "leave-types" && (
            <LeaveTypesSection
              leaveTypes={leaveTypes}
              onAdd={handleOpenAddLeaveType}
              onEdit={handleOpenEditLeaveType}
              onDelete={handleDeleteLeaveType}
            />
          )}

          {activeTab === "departments" && (
            <DepartmentsSection
              departments={departments}
              users={users}
              onAdd={handleOpenAddDepartment}
              onEdit={handleOpenEditDepartment}
              onDelete={handleDeleteDepartment}
            />
          )}

          {activeTab === "public-holidays" && (
            <PublicHolidaysSection
              holidays={holidays}
              onAdd={() => setHolidayDialogOpen(true)}
              onDelete={handleDeleteHoliday}
            />
          )}

          {(activeTab === "general" || activeTab === "carry-forward") && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={saving}
                className="rounded-lg bg-blue-500 px-6 py-3 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <BusinessHoursDialog
        open={businessHoursOpen}
        onOpenChange={setBusinessHoursOpen}
        value={businessHours}
        onSave={setBusinessHours}
      />

      <LeaveTypeDialog
        open={leaveTypeDialogOpen}
        onOpenChange={setLeaveTypeDialogOpen}
        initialData={selectedLeaveType}
        onSubmit={handleSubmitLeaveType}
      />

      <DepartmentDialog
        open={departmentDialogOpen}
        onOpenChange={setDepartmentDialogOpen}
        initialData={selectedDepartment}
        onSubmit={handleSubmitDepartment}
      />

      <PublicHolidayDialog
        open={holidayDialogOpen}
        onOpenChange={setHolidayDialogOpen}
        onSubmit={handleSubmitHoliday}
      />
    </>
  );
}