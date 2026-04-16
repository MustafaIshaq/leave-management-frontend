"use client";

import { useEffect, useMemo, useState } from "react";
import { LeaveType } from "@/types/leaveType";
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

interface ApplyLeaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveTypes: LeaveType[];
  startDate: string;
  endDate: string;
  selectionMode: "single" | "range";
  onSubmit: (data: {
    leave_type_id: number;
    start_date: string;
    end_date: string;
    unit: "DAYS" | "HOURS";
    total_days?: number;
    total_hours?: number;
    reason: string;
  }) => Promise<void>;
}

function calculateDayDifference(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

export default function ApplyLeaveDialog({
  open,
  onOpenChange,
  leaveTypes,
  startDate,
  endDate,
  selectionMode,
  onSubmit,
}: ApplyLeaveDialogProps) {
  const [leaveTypeId, setLeaveTypeId] = useState<string>("");
  const [unit, setUnit] = useState<"DAYS" | "HOURS">("DAYS");
  const [reason, setReason] = useState("");
  const [totalHours, setTotalHours] = useState("1");
  const [loading, setLoading] = useState(false);

  // If user dragged multiple days, force DAYS
  useEffect(() => {
    if (selectionMode === "range") {
      setUnit("DAYS");
    } else {
      setUnit("DAYS");
    }

    setLeaveTypeId("");
    setReason("");
    setTotalHours("1");
  }, [selectionMode, startDate, endDate, open]);

  const totalDays = useMemo(() => {
    return calculateDayDifference(startDate, endDate);
  }, [startDate, endDate]);

  const selectedLeaveType = leaveTypes.find(
    (item) => String(item.id) === leaveTypeId
  );

  // Allowed units based on leave type
  const allowedUnitOptions = useMemo(() => {
    if (!selectedLeaveType) return ["DAYS"];

    if (selectedLeaveType.unit === "BOTH") return ["DAYS", "HOURS"];
    return [selectedLeaveType.unit];
  }, [selectedLeaveType]);

  useEffect(() => {
    if (!allowedUnitOptions.includes(unit)) {
      setUnit(allowedUnitOptions[0] as "DAYS" | "HOURS");
    }
  }, [allowedUnitOptions, unit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!leaveTypeId) return;

    try {
      setLoading(true);

      await onSubmit({
        leave_type_id: Number(leaveTypeId),
        start_date: startDate,
        end_date: endDate,
        unit,
        ...(unit === "DAYS"
          ? { total_days: totalDays }
          : { total_hours: Number(totalHours) }),
        reason,
      });

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const isRangeSelection = selectionMode === "range";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Apply for leave</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label>Leave Type</Label>
            <Select
              value={leaveTypeId}
              onValueChange={(value) => setLeaveTypeId(value ?? "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>

              <SelectContent>
                {leaveTypes.map((leaveType) => (
                  <SelectItem key={leaveType.id} value={String(leaveType.id)}>
                    {leaveType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Start Date</Label>
              <Input value={startDate} disabled />
            </div>

            <div>
              <Label>End Date</Label>
              <Input value={endDate} disabled />
            </div>
          </div>

          <div>
            <Label>Unit</Label>
            <Select
              value={unit}
              onValueChange={(value) =>
                setUnit((value as "DAYS" | "HOURS") ?? "DAYS")
              }
              disabled={isRangeSelection}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {allowedUnitOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {unit === "DAYS" && (
            <div>
              <Label>Total Days</Label>
              <Input value={String(totalDays)} disabled />
            </div>
          )}

          {unit === "HOURS" && (
            <div>
              <Label>Total Hours</Label>
              <Input
                type="number"
                min="1"
                value={totalHours}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTotalHours(e.target.value)
                }
              />
            </div>
          )}

          <div>
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReason(e.target.value)
              }
              placeholder="Enter reason"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading || !leaveTypeId}>
              {loading ? "Submitting..." : "Submit Leave"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}