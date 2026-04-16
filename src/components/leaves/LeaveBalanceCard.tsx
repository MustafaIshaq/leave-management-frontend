"use client";

import { LeaveBalance } from "@/types/leaveBalance";

interface LeaveBalanceCardProps {
  balances: LeaveBalance[];
}

export default function LeaveBalanceCard({
  balances,
}: LeaveBalanceCardProps) {
  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">My Leave Balance</h2>

      {balances.length === 0 ? (
        <p className="text-sm text-gray-500">No leave balances found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {balances.map((balance) => (
            <div
              key={balance.id}
              className="rounded-lg border p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                {/* Color dot */}
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: balance.color }}
                />

                {/* Leave type name */}
                <h3 className="font-medium">{balance.leave_type}</h3>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-black">Unit:</span>{" "}
                  {balance.unit}
                </p>

                <p>
                  <span className="font-medium text-black">Allowance:</span>{" "}
                  {balance.total_allowance}
                </p>

                <p>
                  <span className="font-medium text-black">Used:</span>{" "}
                  {balance.deducted}
                </p>

                <p>
                  <span className="font-medium text-black">Remaining:</span>{" "}
                  {balance.remaining}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}