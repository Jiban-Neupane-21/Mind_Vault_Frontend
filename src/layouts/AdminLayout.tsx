import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminNavbar from "@/components/navbar/AdminNavbar";

export const AdminLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
