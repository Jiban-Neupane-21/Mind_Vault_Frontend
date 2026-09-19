import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "./pages/RegisterationPage";
import DashboardPage from "@/pages/DashboardPage";
import PublicRoute from "./routes/PublicRoutes";
import GuestHomePage from "./pages/GuestHomePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import GuestLayout from "./layouts/GuestLayout";
import UnauthorizedPage from "./pages/UnauthorizePaged";
import UserLayout from "./layouts/UserLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Guest / Public pages (no login required) */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<GuestLayout />}>
          <Route path="/" element={<GuestHomePage />} />
        </Route>

        {/* Public route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected layout route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/*  Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
