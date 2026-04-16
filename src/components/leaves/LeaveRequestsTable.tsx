"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/leaveRequest";
import LeaveRequestRow from "./LeaveRequestRow";

interface LeaveRequestsTableProps {
  requests: LeaveRequest[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function LeaveRequestsTable({
  requests,
  onApprove,
  onReject,
}: LeaveRequestsTableProps) {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.map((request) => (
            <LeaveRequestRow
              key={request.id}
              request={request}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}