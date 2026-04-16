"use client";

import { useEffect, useState } from "react";
import LeaveCalendar from "@/components/calendar/LeaveCalendar";
import EmployeeCalendar from "@/components/calendar/EmployeeCalendar";
import { getYearCalendar } from "@/services/calendarService";
import { createLeaveRequest } from "@/services/leaveRequestService";
import { getLeaveTypes } from "@/services/leaveTypeService";
import { CalendarEventItem } from "@/types/calendar";
import { LeaveType } from "@/types/leaveType";
import { Button } from "@/components/ui/button";
import { getStoredUser } from "@/lib/auth";

export default function CalendarPageContent() {
  const user = getStoredUser();

  const [year, setYear] = useState(2026);
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      setError("");

      const [calendarData, leaveTypesData] = await Promise.all([
        getYearCalendar(year),
        getLeaveTypes(),
      ]);

      setEvents(calendarData);
      setLeaveTypes(leaveTypesData);
    } catch (err) {
      console.error("CALENDAR ERROR:", err);
      setError("Failed to load calendar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [year]);

  const handleApplyLeave = async (data: {
    leave_type_id: number;
    start_date: string;
    end_date: string;
    unit: "DAYS" | "HOURS";
    total_days?: number;
    total_hours?: number;
    reason: string;
  }) => {
    await createLeaveRequest(data);
    await fetchCalendarData();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setYear((prev) => prev - 1)}>
            Previous Year
          </Button>

          <span className="min-w-[80px] text-center font-medium">{year}</span>

          <Button variant="outline" onClick={() => setYear((prev) => prev + 1)}>
            Next Year
          </Button>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading calendar...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && user?.role === "EMPLOYEE" && (
        <EmployeeCalendar
          events={events}
          leaveTypes={leaveTypes}
          onApplyLeave={handleApplyLeave}
        />
      )}

      {!loading && !error && user?.role !== "EMPLOYEE" && (
        <LeaveCalendar events={events} />
      )}
    </>
  );
}