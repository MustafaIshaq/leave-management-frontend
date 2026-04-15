export interface BusinessHourDay {
  start: string;
  end: string;
}

export interface BusinessHours {
  monday: BusinessHourDay | null;
  tuesday: BusinessHourDay | null;
  wednesday: BusinessHourDay | null;
  thursday: BusinessHourDay | null;
  friday: BusinessHourDay | null;
  saturday: BusinessHourDay | null;
  sunday: BusinessHourDay | null;
}

export interface SettingsData {
  id: number;
  company_name: string;
  timezone: string;
  business_hours: BusinessHours;
  carry_forward_enabled: boolean;
  max_carry_forward_days: string | number;
  max_carry_forward_hours: string | number;
  updated_at?: string;
  default_leave_days?: number;
  default_leave_hours?: number;
}

export interface UpdateSettingsPayload {
  company_name: string;
  timezone: string;
  business_hours: BusinessHours;
  carry_forward_enabled: boolean;
  max_carry_forward_days: number;
  max_carry_forward_hours: number;
  default_leave_days: number;
  default_leave_hours: number;
}