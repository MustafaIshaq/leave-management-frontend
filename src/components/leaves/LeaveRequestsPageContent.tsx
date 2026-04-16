"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import LeaveRequestsTable from "@/components/leaves/LeaveRequestsTable";
import {
  approveLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestsByDepartment,
  rejectLeaveRequest,
} from "@/services/leaveRequestService";
import { getDepartments } from "@/services/departmentService";
import { LeaveRequest } from "@/types/leaveRequest";
import { getStoredUser } from "@/lib/auth";

export default function LeaveRequestsPageContent() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const user = getStoredUser();

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      if (user?.role === "ADMIN") {
        const data = await getAllLeaveRequests();
        setRequests(data);
        return;
      }

      if (user?.role === "DIRECTOR") {
        const departments = await getDepartments();
        const currentDepartment = departments.find(
          (dep) => dep.id === user.department_id
        );

        if (!currentDepartment) {
          setRequests([]);
          return;
        }

        const data = await getLeaveRequestsByDepartment(currentDepartment.name);
        setRequests(data);
        return;
      }

      setRequests([]);
    } catch (err) {
      console.error("GET LEAVE REQUESTS ERROR:", err);
      setError("Failed to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    const searchText = search.toLowerCase();

    return requests.filter((request) => {
      return (
        (request.full_name || "").toLowerCase().includes(searchText) ||
        (request.department_name || "").toLowerCase().includes(searchText) ||
        (request.leave_type || "").toLowerCase().includes(searchText) ||
        (request.reason || "").toLowerCase().includes(searchText) ||
        request.status.toLowerCase().includes(searchText)
      );
    });
  }, [requests, search]);

  const handleApprove = async (id: number) => {
    try {
      await approveLeaveRequest(id);
      toast.success("Leave request approved.");
      await fetchRequests();
    } catch (err) {
      console.error("APPROVE LEAVE ERROR:", err);
      toast.error("Failed to approve leave request.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectLeaveRequest(id);
      toast.success("Leave request rejected.");
      await fetchRequests();
    } catch (err) {
      console.error("REJECT LEAVE ERROR:", err);
      toast.error("Failed to reject leave request.");
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Leave Requests</h1>

        <input
          type="text"
          placeholder="Search leave requests"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-sm rounded-md border px-4 py-2"
        />
      </div>

      {loading && <p className="text-sm text-gray-500">Loading leave requests...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && filteredRequests.length === 0 && (
        <p className="text-sm text-gray-500">No leave requests found.</p>
      )}

      {!loading && !error && filteredRequests.length > 0 && (
        <LeaveRequestsTable
          requests={filteredRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </>
  );
}