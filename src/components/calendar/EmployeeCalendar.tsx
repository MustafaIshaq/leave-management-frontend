"use client";

import { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { CalendarEventItem } from "@/types/calendar";
import { LeaveType } from "@/types/leaveType";
import ApplyLeaveDialog from "./ApplyLeaveDialog";

interface EmployeeCalendarProps {
  events: CalendarEventItem[];
  leaveTypes: LeaveType[];
  onApplyLeave: (data: {
    leave_type_id: number;
    start_date: string;
    end_date: string;
    unit: "DAYS" | "HOURS";
    total_days?: number;
    total_hours?: number;
    reason: string;
  }) => Promise<void>;
}

function formatDateOnly(dateString: string) {
  return dateString.split("T")[0];
}

export default function EmployeeCalendar({
  events,
  leaveTypes,
  onApplyLeave,
}: EmployeeCalendarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<"single" | "range">("single");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  // Single day click
  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectionMode("single");
    setSelectedStartDate(arg.dateStr);
    setSelectedEndDate(arg.dateStr);
    setDialogOpen(true);
  };

  // Drag selection for multiple days
  const handleSelect = (arg: DateSelectArg) => {
    // FullCalendar select end is exclusive, so subtract one day
    const start = new Date(arg.startStr);
    const endExclusive = new Date(arg.endStr);
    endExclusive.setDate(endExclusive.getDate() - 1);

    const end = endExclusive.toISOString().split("T")[0];

    setSelectionMode("range");
    setSelectedStartDate(arg.startStr.split("T")[0]);
    setSelectedEndDate(end);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          selectable
          selectMirror
          dateClick={handleDateClick}
          select={handleSelect}
          height="auto"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          eventDisplay="block"
        />
      </div>

      <ApplyLeaveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        leaveTypes={leaveTypes}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        selectionMode={selectionMode}
        onSubmit={onApplyLeave}
      />
    </>
  );
}