"use client";

import { LeaveRequest } from "@/types/leaveRequest";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface MyLeaveRowProps {
  request: LeaveRequest;
}

export default function MyLeaveRow({ request }: MyLeaveRowProps) {
  const startDate = new Date(request.start_date).toLocaleDateString();
  const endDate = new Date(request.end_date).toLocaleDateString();

  return (
    <tr className="border-b">
      <td className="p-4 align-middle">
        {request.leave_type || `Type #${request.leave_type_id ?? "-"}`}
      </td>

      <td className="p-4 align-middle">
        {startDate} - {endDate}
      </td>

      <td className="p-4 align-middle">{request.unit}</td>

      <td className="p-4 align-middle">
        {request.total_days ?? request.total_hours ?? "-"}
      </td>

      <td className="p-4 align-middle">{request.reason || "-"}</td>

      <td className="p-4 align-middle">
        <LeaveStatusBadge status={request.status} />
      </td>
    </tr>
  );
}