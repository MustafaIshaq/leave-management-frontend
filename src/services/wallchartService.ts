import api from "@/lib/api";

// Get wallchart data for a date range
export const getWallChart = async (start: string, end: string) => {
  const response = await api.get(`/wallchart?start=${start}&end=${end}`);
  return response.data;
};