"use client";

import { useEffect, useMemo, useState } from "react";
import { getWallChart } from "@/services/wallchartService";
import { GroupedWallChartUser, WallChartItem } from "@/types/wallchart";

// Get all dates between start and end
function getDatesInRange(start: string, end: string) {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);

  while (current <= last) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const day = String(current.getDate()).padStart(2, "0");

    dates.push(`${year}-${month}-${day}`);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// Format weekday letter like S M T W T F S
function getWeekdayLetter(dateString: string) {
  const date = new Date(dateString);
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  return weekdays[date.getDay()];
}

// Format day number
function getDayNumber(dateString: string) {
  return new Date(dateString).getDate();
}

// Convert API response into grouped users
function groupByUser(data: WallChartItem[]): GroupedWallChartUser[] {
  const groupedMap = new Map<number, GroupedWallChartUser>();

  data.forEach((item) => {
    if (!groupedMap.has(item.user_id)) {
      groupedMap.set(item.user_id, {
        user_id: item.user_id,
        full_name: item.full_name,
        leaves: [],
      });
    }

    groupedMap.get(item.user_id)?.leaves.push(item);
  });

  return Array.from(groupedMap.values());
}

// Check if a day falls inside a leave range
function isDateInLeaveRange(date: string, startDate: string, endDate: string) {
  const current = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return current >= start && current <= end;
}

export default function WallChart() {
  // Store fetched data
  const [items, setItems] = useState<WallChartItem[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // For now, fixed month range
  // Later we can make this dynamic
  const start = "2026-05-01";
  const end = "2026-05-31";

  // Fetch wallchart data
  useEffect(() => {
    const fetchWallChart = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWallChart(start, end);
        setItems(data);
      } catch (err) {
        console.error("WALL CHART ERROR:", err);
        setError("Failed to load wall chart.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallChart();
  }, []);

  // Build all dates for the top row
  const allDates = useMemo(() => {
    return getDatesInRange(start, end);
  }, [start, end]);

  // Group leaves by user
  const groupedUsers = useMemo(() => {
    return groupByUser(items);
  }, [items]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading wall chart...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white p-4 shadow-sm">
      <div className="min-w-max">
        {/* Top row - weekday letters */}
        <div className="mb-8 flex gap-3">
          {allDates.map((date) => (
            <div
              key={`weekday-${date}`}
              className="flex h-12 w-12 items-center justify-center rounded-full border text-xl"
            >
              {getWeekdayLetter(date)}
            </div>
          ))}
        </div>

        {/* Each user's row */}
        <div className="space-y-8">
          {groupedUsers.map((user) => (
            <div key={user.user_id}>
              {/* User name */}
              <p className="mb-3 text-sm font-medium">{user.full_name}</p>

              {/* Days row */}
              <div className="flex gap-3">
                {allDates.map((date) => {
                  // Find if this date belongs to any leave of this user
                  const matchingLeave = user.leaves.find((leave) =>
                    isDateInLeaveRange(date, leave.start_date, leave.end_date)
                  );

                  return (
                    <div
                      key={`${user.user_id}-${date}`}
                      className={`flex h-12 w-12 items-center justify-center text-xl ${
                        matchingLeave ? "rounded-sm bg-gray-200" : ""
                      }`}
                      title={
                        matchingLeave
                          ? `${matchingLeave.leave_type} - ${matchingLeave.status}`
                          : ""
                      }
                    >
                      {getDayNumber(date)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}