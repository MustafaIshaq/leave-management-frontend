import api from "@/lib/api";
import { CalendarEventItem } from "@/types/calendar";

// Get calendar data for a specific year
export const getYearCalendar = async (
  year: number
): Promise<CalendarEventItem[]> => {
  const response = await api.get(`/calendar/year?year=${year}`);
  return response.data;
};