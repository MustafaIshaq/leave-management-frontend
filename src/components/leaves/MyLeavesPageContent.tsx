"use client";

import { useEffect, useMemo, useState } from "react";
import MyLeavesTable from "@/components/leaves/MyLeavesTable";
import LeaveBalanceCard from "@/components/leaves/LeaveBalanceCard";
import { getMyLeaveRequests } from "@/services/leaveRequestService";
import { getMyLeaveBalances } from "@/services/leaveBalanceService";
import { LeaveRequest } from "@/types/leaveRequest";
import { LeaveBalance } from "@/types/leaveBalance";
import { getLeaveTypes } from "@/services/leaveTypeService";
import { LeaveType } from "@/types/leaveType";

export default function MyLeavesPageContent() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchMyLeavesData = async () => {
    try {
      setLoading(true);
      setError("");

      const [leaveRequestsData, leaveBalancesData, leaveTypesData] =
        await Promise.all([
          getMyLeaveRequests(),
          getMyLeaveBalances(),
          getLeaveTypes(),
        ]);

      setRequests(leaveRequestsData);
      setBalances(leaveBalancesData);
      setLeaveTypes(leaveTypesData);
    } catch (err) {
      console.error("GET MY LEAVES ERROR:", err);
      setError("Failed to load your leave data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLeavesData();
  }, []);

  // Add leave type name into requests if backend only gives leave_type_id
  const requestsWithLeaveTypeNames = useMemo(() => {
    return requests.map((request) => {
      const matchedLeaveType = leaveTypes.find(
        (leaveType) => leaveType.id === request.leave_type_id
      );

      return {
        ...request,
        leave_type: matchedLeaveType?.name || request.leave_type,
      };
    });
  }, [requests, leaveTypes]);

  const filteredRequests = useMemo(() => {
    const searchText = search.toLowerCase();

    return requestsWithLeaveTypeNames.filter((request) => {
      return (
        (request.leave_type || "").toLowerCase().includes(searchText) ||
        (request.reason || "").toLowerCase().includes(searchText) ||
        request.status.toLowerCase().includes(searchText) ||
        request.unit.toLowerCase().includes(searchText)
      );
    });
  }, [requestsWithLeaveTypeNames, search]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">My Leaves</h1>

        <input
          type="text"
          placeholder="Search my leaves"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-sm rounded-md border px-4 py-2"
        />
      </div>

      {loading && <p className="text-sm text-gray-500">Loading your leave data...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <LeaveBalanceCard balances={balances} />

          {filteredRequests.length === 0 ? (
            <p className="text-sm text-gray-500">No leave requests found.</p>
          ) : (
            <MyLeavesTable requests={filteredRequests} />
          )}
        </>
      )}
    </>
  );
}