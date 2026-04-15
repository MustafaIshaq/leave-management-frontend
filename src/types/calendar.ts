export interface CalendarEventItem {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "leave" | "holiday";
  status?: string;
  color?: string;
}