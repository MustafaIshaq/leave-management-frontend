export interface LeaveRequest {
  id: number;
  user_id: number;
  leave_type_id?: number;
  full_name?: string;
  department_id?: number;
  department_name?: string;
  leave_type?: string;
  start_date: string;
  end_date: string;
  unit: "DAYS" | "HOURS" | "BOTH";
  total_days: string | number | null;
  total_hours: string | number | null;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
}