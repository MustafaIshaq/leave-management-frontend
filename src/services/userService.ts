import api from "@/lib/api";
import { User } from "@/types/user";

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

// Get single user by id
export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Create new user
export const createUser = async (data: {
  full_name: string;
  email: string;
  password: string;
  role: string;
  department_id?: number | null;
}) => {
  const response = await api.post("/users", data);
  return response.data;
};

// Update user
export const updateUser = async (
  id: number,
  data: {
    full_name: string;
    email: string;
    role: string;
    department_id: number | null;
    designation: string;
    phone: string;
    date_of_birth: string;
    leave_start_month: number;
    work_start_time: string;
    work_end_time: string;
  }
) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// Delete user
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};