import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";

// Context
import { NavViewProvider } from "@/context/NavViewProvider";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages - Auth & General
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "./pages/RegisterationPage";
import UnauthorizedPage from "./pages/UnauthorizePaged";

// Pages - Shared Public / User / Locked Content
import HomePage from "./pages/DashboardPage";

// Pages - Admin Exclusive
import AdminDashboardPage from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Provides toggle state for Admin between User & Admin views */}
      <NavViewProvider>
        <Routes>
          {/* ========================================================= */}
          {/* 1. AUTH PAGES (Public only: redirects to home if logged in) */}
          {/* ========================================================= */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* ========================================================= */}
          {/* 2. MAIN LAYOUT (Accessible by Guest, User, & Admin)        */}
          {/*    Navbar adapts automatically based on login / role       */}
          {/* ========================================================= */}
          <Route element={<MainLayout />}>
            {/* Same pages loaded by both Guest & User */}
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/thoughts" element={<ThoughtsPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/sites" element={<SitesPage />} /> */}

            {/* Requires login (User or Admin) */}
            <Route
              element={<ProtectedRoute allowedRoles={["User", "Admin"]} />}
            >
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>
          </Route>

          {/* ========================================================= */}
          {/* 3. ADMIN MANAGEMENT ROUTES (Admin only)                   */}
          {/* ========================================================= */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route element={<MainLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              {/* <Route path="/users" element={<UserManagementPage />} />
              <Route path="/contents" element={<ContentManagementPage />} /> */}
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </NavViewProvider>
    </BrowserRouter>
  );
}
