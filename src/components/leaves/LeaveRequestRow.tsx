"use client";

import { LeaveRequest } from "@/types/leaveRequest";
import LeaveStatusBadge from "./LeaveStatusBadge";
import LeaveActionButtons from "./LeaveActionButtons";

interface LeaveRequestRowProps {
  request: LeaveRequest;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function LeaveRequestRow({
  request,
  onApprove,
  onReject,
}: LeaveRequestRowProps) {
  const startDate = new Date(request.start_date).toLocaleDateString();
  const endDate = new Date(request.end_date).toLocaleDateString();

  return (
    <tr className="border-b">
      <td className="p-4 align-middle">
        {request.full_name || `User #${request.user_id}`}
      </td>

      <td className="p-4 align-middle">
        {request.department_name || "-"}
      </td>

      <td className="p-4 align-middle">
        {request.leave_type || `Type #${request.leave_type_id ?? "-"}`}
      </td>

      <td className="p-4 align-middle">
        {startDate} - {endDate}
      </td>

      <td className="p-4 align-middle">{request.unit}</td>

      <td className="p-4 align-middle">{request.reason || "-"}</td>

      <td className="p-4 align-middle">
        <LeaveStatusBadge status={request.status} />
      </td>

      <td className="p-4 align-middle">
        <LeaveActionButtons
          status={request.status}
          onApprove={() => onApprove(request.id)}
          onReject={() => onReject(request.id)}
        />
      </td>
    </tr>
  );
}