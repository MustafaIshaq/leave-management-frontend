import api from "@/lib/api";
import { Department } from "@/types/department";

// Get all departments
export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments");
  return response.data;
};

// Create department
export const createDepartment = async (data: { name: string }) => {
  const response = await api.post("/departments", data);
  return response.data;
};

// Update department
export const updateDepartment = async (id: number, data: { name: string }) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

// Delete department
export const deleteDepartment = async (id: number) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};