import api from "@/lib/api";
import { LeaveRequest } from "@/types/leaveRequest";


// Admin: get all leave requests
export const getAllLeaveRequests = async (): Promise<LeaveRequest[]> => {
  const response = await api.get("/leave-requests");
  return response.data;
};

// Director: get leave requests by department name
export const getLeaveRequestsByDepartment = async (
  departmentName: string
): Promise<LeaveRequest[]> => {
  // Using your exact current backend format
  const response = await api.get(
    `/leave-requests/department?=${encodeURIComponent(departmentName)}`
  );
  return response.data;
};

// Get my leave requests
export const getMyLeaveRequests = async (): Promise<LeaveRequest[]> => {
  const response = await api.get("/leave-requests/my");
  return response.data;
};

// Create leave request
export const createLeaveRequest = async (data: {
  leave_type_id: number;
  start_date: string;
  end_date: string;
  unit: "DAYS" | "HOURS";
  total_days?: number;
  total_hours?: number;
  reason: string;
}) => {
  const response = await api.post("/leave-requests", data);
  return response.data;
};

// Approve leave request
export const approveLeaveRequest = async (id: number) => {
  const response = await api.patch(`/leave-requests/${id}/approve`);
  return response.data;
};

// Reject leave request
export const rejectLeaveRequest = async (id: number) => {
  const response = await api.patch(`/leave-requests/${id}/reject`);
  return response.data;
};