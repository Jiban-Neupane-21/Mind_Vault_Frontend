export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

// Base roles stored in your auth/database
export type Role = "Guest" | "User" | "Admin";

// Admin can toggle between User browsing view and Admin management view
export type ActiveView = "User" | "Admin";
