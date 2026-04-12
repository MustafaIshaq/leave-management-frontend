export interface User {
  id: number;
  full_name: string;
  email: string;
  role: "ADMIN" | "DIRECTOR" | "EMPLOYEE";
  department_id: number | null;
  designation?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  leave_start_month?: number | null;
  work_start_time?: string | null;
  work_end_time?: string | null;
}