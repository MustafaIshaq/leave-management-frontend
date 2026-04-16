"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import UsersToolbar from "@/components/users/UsersToolbar";
import UsersTable from "@/components/users/UsersTable";
import UserFormDialog from "@/components/users/UserFormDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  getUsersByDepartment,
  updateUser,
} from "@/services/userService";
import { getDepartments } from "@/services/departmentService";
import { User } from "@/types/user";
import { Department } from "@/types/department";
import { getStoredUser } from "@/lib/auth";

export default function UsersPageContent() {
  const loggedInUser = getStoredUser();

  const [users, setUsers] = useState<User[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setError("");

      const [departmentsData, usersData] = await Promise.all([
        getDepartments(),
        loggedInUser?.role === "DIRECTOR"
          ? getUsersByDepartment()
          : getUsers(),
      ]);

      setDepartments(departmentsData);
      setUsers(usersData);
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

  const filteredUsers = useMemo(() => {
    const searchText = search.toLowerCase();

    return users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      );
    });
  }, [users, search]);

  const handleAddUser = () => {
    setDialogMode("add");
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = async (userId: number) => {
    try {
      const user = await getUserById(userId);

      if (
        loggedInUser?.role === "DIRECTOR" &&
        user.department_id !== loggedInUser.department_id
      ) {
        toast.error("You can only edit users from your own department.");
        return;
      }

      setDialogMode("edit");
      setSelectedUser(user);
      setDialogOpen(true);
    } catch (err) {
      console.error("GET USER BY ID ERROR:", err);
      toast.error("Failed to load user details.");
    }
  };

  const handleDeleteUserClick = (userId: number) => {
    const targetUser = users.find((user) => user.id === userId);

    if (!targetUser) return;

    if (
      loggedInUser?.role === "DIRECTOR" &&
      targetUser.department_id !== loggedInUser.department_id
    ) {
      toast.error("You can only delete users from your own department.");
      return;
    }

    setUserToDelete(targetUser);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      toast.success("User deleted successfully.");
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      await fetchPageData();
    } catch (err) {
      console.error("DELETE USER ERROR:", err);
      toast.error("Failed to delete user.");
    }
  };

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
    const finalDepartmentId =
      loggedInUser?.role === "DIRECTOR"
        ? loggedInUser.department_id
        : formData.department_id;

    try {
      if (dialogMode === "add") {
        await createUser({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password || "",
          role: formData.role,
          department_id: finalDepartmentId,
        });
        toast.success("User created successfully.");
      }

      if (dialogMode === "edit" && selectedUser) {
        await updateUser(selectedUser.id, {
          full_name: formData.full_name,
          email: formData.email,
          role: formData.role,
          department_id: finalDepartmentId,
          designation: formData.designation,
          phone: formData.phone,
          date_of_birth: formData.date_of_birth,
          leave_start_month: formData.leave_start_month,
          work_start_time: formData.work_start_time,
          work_end_time: formData.work_end_time,
        });
        toast.success("User updated successfully.");
      }

      await fetchPageData();
    } catch (err) {
      console.error("SAVE USER ERROR:", err);
      toast.error("Failed to save user.");
      throw err;
    }
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
          onDelete={handleDeleteUserClick}
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

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete user?"
        description={
          userToDelete
            ? `Are you sure you want to delete ${userToDelete.full_name}?`
            : "Are you sure you want to delete this user?"
        }
        onConfirm={handleConfirmDeleteUser}
        confirmText="Delete"
      />
    </>
  );
}