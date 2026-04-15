"use client";

import { useEffect, useState } from "react";
import LeaveCalendar from "@/components/calendar/LeaveCalendar";
import { getYearCalendar } from "@/services/calendarService";
import { CalendarEventItem } from "@/types/calendar";
import { Button } from "@/components/ui/button";

export default function CalendarPageContent() {
  // Current selected year
  const [year, setYear] = useState(2026);

  // Calendar events from backend
  const [events, setEvents] = useState<CalendarEventItem[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch calendar data whenever year changes
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getYearCalendar(year);
        setEvents(data);
      } catch (err) {
        console.error("CALENDAR ERROR:", err);
        setError("Failed to load calendar.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [year]);

  return (
    <>
      {/* Page title and year controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setYear((prev) => prev - 1)}
          >
            Previous Year
          </Button>

          <span className="min-w-[80px] text-center font-medium">{year}</span>

          <Button
            variant="outline"
            onClick={() => setYear((prev) => prev + 1)}
          >
            Next Year
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading calendar...</p>}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Calendar */}
      {!loading && !error && <LeaveCalendar events={events} />}
    </>
  );
}