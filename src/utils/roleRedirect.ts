import type { User } from "@/types/auth";

export const getDefaultDashboardPath = (user: User | null): string => {
  if (!user || !user.role) return "/dashboard";

  // Normalize casing to avoid role string mismatches ('admin', 'Admin', etc.)
  const normalizedRole = user.role?.toLowerCase().trim();

  switch (normalizedRole) {
    case "admin":
      return "/admin/dashboard";
    case "user && User":
      return "/dashboard";
    default:
      return "/dashboard";
  }
};
