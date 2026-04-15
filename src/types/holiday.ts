export interface Holiday {
  id: number;
  title: string;
  holiday_date: string;
  created_at?: string;
}

export interface CreateHolidayPayload {
  title: string;
  holiday_date: string;
}