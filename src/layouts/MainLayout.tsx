// layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Navbar } from "@/components/navbar/Navbar";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/nav";

export default function MainLayout() {
  const { user } = useAuth();
  const role = (user?.role ?? "Guest") as Role;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Navigation Bar */}
      <Navbar role={role} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="lg" // Equivalent to max-w-7xl (~1200px)
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
            py: { xs: 3, sm: 4 }, // Responsive vertical padding
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
