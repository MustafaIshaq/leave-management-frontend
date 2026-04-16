export interface LeaveType {
  id: number;
  name: string;
  unit: "DAYS" | "HOURS" | "BOTH";
  is_deductible: boolean;
  color: string;
  created_at?: string;
}

export interface CreateLeaveTypePayload {
  name: string;
  unit: "DAYS" | "HOURS" | "BOTH";
  is_deductible: boolean;
  color: string;
}

export interface UpdateLeaveTypePayload {
  name: string;
  unit: "DAYS" | "HOURS" | "BOTH";
  is_deductible: boolean;
  color: string;
}