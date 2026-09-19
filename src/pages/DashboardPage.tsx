import { useAuth } from "@/hooks/useAuth";
import Button from "@mui/material/Button";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">
              Welcome, {user?.email || "User"} this is user page.
            </p>
          </div>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
