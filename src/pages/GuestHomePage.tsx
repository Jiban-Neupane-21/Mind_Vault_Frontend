import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultDashboardPath } from "@/utils/roleRedirect";

export default function GuestHomePage() {
  const { user, token } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        Welcome to Mind Vault this is guest page
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        Secure personal knowledge base. Browse freely or log in to access your dashboard.
      </p>

      <div className="mt-6 flex gap-4">
        {token && user ? (
          <Link
            to={getDefaultDashboardPath(user)}
            className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-800"
          >
            Go to My Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-800"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}