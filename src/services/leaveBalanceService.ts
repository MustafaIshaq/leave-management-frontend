import api from "@/lib/api";
import { LeaveBalance } from "@/types/leaveBalance";

// Employee: get my leave balances
export const getMyLeaveBalances = async (): Promise<LeaveBalance[]> => {
  const response = await api.get("/leave-balances/my");
  return response.data;
};

// Director: get department leave balances
export const getDepartmentLeaveBalances = async (): Promise<LeaveBalance[]> => {
  const response = await api.get("/leave-balances/department");
  return response.data;
};

// Admin: get all leave balances
export const getAllLeaveBalances = async (): Promise<LeaveBalance[]> => {
  const response = await api.get("/leave-balances");
  return response.data;
};

// Optional: get balances for one user
export const getLeaveBalancesByUserId = async (
  userId: number
): Promise<LeaveBalance[]> => {
  const response = await api.get(`/leave-balances/user/${userId}`);
  return response.data;
};