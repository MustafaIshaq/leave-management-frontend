import api from "@/lib/api";
import {
  CreateLeaveTypePayload,
  LeaveType,
  UpdateLeaveTypePayload,
} from "@/types/leaveType";

// Get all leave types
export const getLeaveTypes = async (): Promise<LeaveType[]> => {
  const response = await api.get("/leave-types");
  return response.data;
};

// Create leave type
export const createLeaveType = async (
  data: CreateLeaveTypePayload
): Promise<LeaveType> => {
  const response = await api.post("/leave-types", data);
  return response.data;
};

// Update leave type
export const updateLeaveType = async (
  id: number,
  data: UpdateLeaveTypePayload
): Promise<LeaveType> => {
  const response = await api.put(`/leave-types/${id}`, data);
  return response.data;
};

// Delete leave type
export const deleteLeaveType = async (id: number) => {
  const response = await api.delete(`/leave-types/${id}`);
  return response.data;
};