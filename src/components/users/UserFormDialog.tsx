"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Department } from "@/types/department";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData: User | null;
  departments: Department[];
  onSubmit: (formData: {
    full_name: string;
    email: string;
    password?: string;
    role: string;
    department_id: number | null;
    designation: string;
    phone: string;
    date_of_birth: string;
    leave_start_month: number;
    work_start_time: string;
    work_end_time: string;
  }) => Promise<void>;
}

export default function UserFormDialog({
  open,
  onOpenChange,
  mode,
  initialData,
  departments,
  onSubmit,
}: UserFormDialogProps) {
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [departmentId, setDepartmentId] = useState<string>("none");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [leaveStartMonth, setLeaveStartMonth] = useState("1");
  const [workStartTime, setWorkStartTime] = useState("09:00");
  const [workEndTime, setWorkEndTime] = useState("17:00");

  // Loading + error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fill form when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFullName(initialData.full_name || "");
      setEmail(initialData.email || "");
      setPassword("");
      setRole(initialData.role || "EMPLOYEE");
      setDepartmentId(
        initialData.department_id !== null && initialData.department_id !== undefined
          ? String(initialData.department_id)
          : "none"
      );
      setDesignation(initialData.designation || "");
      setPhone(initialData.phone || "");
      setDateOfBirth(
        initialData.date_of_birth ? initialData.date_of_birth.split("T")[0] : ""
      );
      setLeaveStartMonth(
        initialData.leave_start_month
          ? String(initialData.leave_start_month)
          : "1"
      );
      setWorkStartTime(
        initialData.work_start_time
          ? initialData.work_start_time.slice(0, 5)
          : "09:00"
      );
      setWorkEndTime(
        initialData.work_end_time
          ? initialData.work_end_time.slice(0, 5)
          : "17:00"
      );
      setError("");
    }

    // Reset form when adding
    if (mode === "add") {
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("EMPLOYEE");
      setDepartmentId("none");
      setDesignation("");
      setPhone("");
      setDateOfBirth("");
      setLeaveStartMonth("1");
      setWorkStartTime("09:00");
      setWorkEndTime("17:00");
      setError("");
    }
  }, [mode, initialData, open]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !role) {
      setError("Please fill the required fields.");
      return;
    }

    if (mode === "add" && !password) {
      setError("Password is required for a new user.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        full_name: fullName,
        email,
        ...(mode === "add" ? { password } : {}),
        role,
        department_id: departmentId === "none" ? null : Number(departmentId),
        designation,
        phone,
        date_of_birth: dateOfBirth,
        leave_start_month: Number(leaveStartMonth),
        work_start_time: `${workStartTime}:00`,
        work_end_time: `${workEndTime}:00`,
      });

      onOpenChange(false);
    } catch (err) {
      console.error("USER FORM ERROR:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add User" : "Edit User"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullName(e.target.value)
              }
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter email"
            />
          </div>

          {/* Password only in add mode */}
          {mode === "add" && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
              />
            </div>
          )}

          {/* Role */}
          <div>
            <Label htmlFor="role">Role</Label>
           <Select
  value={role}
  onValueChange={(value) => setRole(value ?? "EMPLOYEE")}
>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="DIRECTOR">DIRECTOR</SelectItem>
                <SelectItem value="EMPLOYEE">EMPLOYEE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="department">Department</Label>
          <Select
  value={departmentId}
  onValueChange={(value) => setDepartmentId(value ?? "none")}
>
              <SelectTrigger>
           <SelectValue>
  {
    departmentId === "none"
      ? "No Department"
      : departments.find((d) => String(d.id) === departmentId)?.name ||
        "Select department"
  }
</SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No Department</SelectItem>

                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={String(department.id)}
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Designation */}
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={designation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDesignation(e.target.value)
              }
              placeholder="Enter designation"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              placeholder="Enter phone"
            />
          </div>

          {/* Date of birth */}
          <div>
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={dateOfBirth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDateOfBirth(e.target.value)
              }
            />
          </div>

          {/* Leave start month */}
          <div>
            <Label htmlFor="leave_start_month">Leave Start Month</Label>
            <Input
              id="leave_start_month"
              type="number"
              min="1"
              max="12"
              value={leaveStartMonth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLeaveStartMonth(e.target.value)
              }
            />
          </div>

          {/* Work start time */}
          <div>
            <Label htmlFor="work_start_time">Work Start Time</Label>
            <Input
              id="work_start_time"
              type="time"
              value={workStartTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWorkStartTime(e.target.value)
              }
            />
          </div>

          {/* Work end time */}
          <div>
            <Label htmlFor="work_end_time">Work End Time</Label>
            <Input
              id="work_end_time"
              type="time"
              value={workEndTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWorkEndTime(e.target.value)
              }
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? mode === "add"
                  ? "Adding..."
                  : "Updating..."
                : mode === "add"
                ? "Add User"
                : "Update User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}