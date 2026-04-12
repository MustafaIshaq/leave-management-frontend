export interface WallChartItem {
  id: number;
  user_id: number;
  full_name: string;
  department_id: number | null;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  color: string;
}

export interface GroupedWallChartUser {
  user_id: number;
  full_name: string;
  leaves: WallChartItem[];
}