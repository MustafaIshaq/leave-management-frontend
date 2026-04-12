"use client";

import { useEffect, useMemo, useState } from "react";
import UsersToolbar from "@/components/users/UsersToolbar";
import UsersTable from "@/components/users/UsersTable";
import UserFormDialog from "@/components/users/UserFormDialog";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@/services/userService";
import { getDepartments } from "@/services/departmentService";
import { User } from "@/types/user";
import { Department } from "@/types/department";

export default function UsersPageContent() {
  // Users state
  const [users, setUsers] = useState<User[]>([]);

  // Departments state
  const [departments, setDepartments] = useState<Department[]>([]);

  // Search input
  const [search, setSearch] = useState("");

  // Loading / error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users and departments together
  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersData, departmentsData] = await Promise.all([
        getUsers(),
        getDepartments(),
      ]);

      setUsers(usersData);
      setDepartments(departmentsData);
    } catch (err) {
      console.error("USERS PAGE ERROR:", err);
      setError("Failed to load users page data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  // Search filter
  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      );
    });
  }, [users, search]);

  // Open add dialog
  const handleAddUser = () => {
    setDialogMode("add");
    setSelectedUser(null);
    setDialogOpen(true);
  };

  // Open edit dialog
  const handleEditUser = async (userId: number) => {
    try {
      const user = await getUserById(userId);
      setDialogMode("edit");
      setSelectedUser(user);
      setDialogOpen(true);
    } catch (err) {
      console.error("GET USER BY ID ERROR:", err);
      alert("Failed to load user details.");
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await deleteUser(userId);
      await fetchPageData();
    } catch (err) {
      console.error("DELETE USER ERROR:", err);
      alert("Failed to delete user.");
    }
  };

  // Add or edit user
  const handleSubmitUser = async (formData: {
    full_name: string;
    email: string;
    password?: string;
    role: string;
    department_id: number | null;
    designation: string;
    phone: string;
    date_of_birth: string;
    leave_start_month: number;
    work_start_time: string;
    work_end_time: string;
  }) => {
   if (dialogMode === "add") {
  await createUser({
    full_name: formData.full_name,
    email: formData.email,
    password: formData.password || "",
    role: formData.role,
    department_id: formData.department_id,
  });
}

    if (dialogMode === "edit" && selectedUser) {
      await updateUser(selectedUser.id, {
        full_name: formData.full_name,
        email: formData.email,
        role: formData.role,
        department_id: formData.department_id,
        designation: formData.designation,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        leave_start_month: formData.leave_start_month,
        work_start_time: formData.work_start_time,
        work_end_time: formData.work_end_time,
      });
    }

    await fetchPageData();
  };

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Users</h1>

      <UsersToolbar
        search={search}
        setSearch={setSearch}
        userCount={filteredUsers.length}
        onAddUser={handleAddUser}
      />

      {loading && <p className="text-sm text-gray-500">Loading users...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <UsersTable
          users={filteredUsers}
          departments={departments}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

     <UserFormDialog
  open={dialogOpen}
  onOpenChange={setDialogOpen}
  mode={dialogMode}
  initialData={selectedUser}
  departments={departments}
  onSubmit={handleSubmitUser}
/>
    </>
  );
}