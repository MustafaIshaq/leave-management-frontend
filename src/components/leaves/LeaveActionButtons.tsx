"use client";

import { Button } from "@/components/ui/button";

interface LeaveActionButtonsProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
  onApprove: () => void;
  onReject: () => void;
}

export default function LeaveActionButtons({
  status,
  onApprove,
  onReject,
}: LeaveActionButtonsProps) {
  // Only pending requests can be acted on
  if (status !== "PENDING") {
    return <p className="text-sm text-gray-400">No actions</p>;
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={onApprove}>
        Approve
      </Button>

      <Button size="sm" variant="outline" onClick={onReject}>
        Reject
      </Button>
    </div>
  );
}