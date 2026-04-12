import api from "@/lib/api";
import { Department } from "@/types/department";

// Get all departments
export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments");
  return response.data;
};