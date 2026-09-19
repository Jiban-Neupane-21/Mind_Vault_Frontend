import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultDashboardPath } from "@/utils/roleRedirect";
import CircularProgress from "@mui/material/CircularProgress";

export const PublicRoute = () => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <CircularProgress />
      </div>
    );
  }

  if (token && user) {
    return <Navigate to={getDefaultDashboardPath(user)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
