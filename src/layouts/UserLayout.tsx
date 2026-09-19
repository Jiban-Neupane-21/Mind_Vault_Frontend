import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserNavbar from "@/components/navbar/UserNavbar";

export const UserLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UserNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
