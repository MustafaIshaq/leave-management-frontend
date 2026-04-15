import api from "@/lib/api";
import { SettingsData, UpdateSettingsPayload } from "@/types/settings";

// Get current settings
export const getSettings = async (): Promise<SettingsData> => {
  const response = await api.get("/settings");
  return response.data;
};

// Update settings
export const updateSettings = async (
  data: UpdateSettingsPayload
): Promise<SettingsData> => {
  const response = await api.put("/settings", data);
  return response.data;
};