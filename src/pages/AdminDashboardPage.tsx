import { useAuth } from "@/hooks/useAuth";
import Button from "@mui/material/Button";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Admin Area
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Admin Management Panel
        </h1>
        <p className="mt-1 text-slate-600">
          Welcome, {user?.name} ({user?.email})
        </p>

        <div className="mt-6">
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
