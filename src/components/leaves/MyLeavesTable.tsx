"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequest } from "@/types/leaveRequest";
import MyLeaveRow from "./MyLeaveRow";

interface MyLeavesTableProps {
  requests: LeaveRequest[];
}

export default function MyLeavesTable({ requests }: MyLeavesTableProps) {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.map((request) => (
            <MyLeaveRow key={request.id} request={request} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}