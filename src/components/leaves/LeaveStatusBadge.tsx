interface LeaveStatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function LeaveStatusBadge({
  status,
}: LeaveStatusBadgeProps) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}