export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role: "ADMIN" | "DIRECTOR" | "EMPLOYEE";
  department_id: number | null;
}

// Get logged-in user from localStorage
export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

// Get token from localStorage
export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Logout helper
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};