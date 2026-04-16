import api from "@/lib/api";
import { CreateHolidayPayload, Holiday } from "@/types/holiday";

// Get all public holidays
export const getHolidays = async (): Promise<Holiday[]> => {
  const response = await api.get("/holidays");
  return response.data;
};

// Create holiday
export const createHoliday = async (
  data: CreateHolidayPayload
): Promise<Holiday> => {
  const response = await api.post("/holidays", data);
  return response.data;
};

// Delete holiday
export const deleteHoliday = async (id: number) => {
  const response = await api.delete(`/holidays/${id}`);
  return response.data;
};