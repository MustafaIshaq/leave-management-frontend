"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarEventItem } from "@/types/calendar";

interface LeaveCalendarProps {
  events: CalendarEventItem[];
}

export default function LeaveCalendar({ events }: LeaveCalendarProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        eventDisplay="block"
      />
    </div>
  );
}