export interface LeaveBalance {
  id: number;
  user_id: number;
  full_name?: string;
  email?: string;
  department_id?: number;
  department_name?: string;
  leave_type_id: number;
  leave_type: string;
  unit: "DAYS" | "HOURS" | "BOTH";
  color: string;
  total_allowance: string;
  deducted: string;
  remaining: string;
}