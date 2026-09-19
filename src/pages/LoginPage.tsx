import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { isAxiosError } from "axios";
import type { LoginPayload, ApiErrorResponse } from "@/types/auth";
import { loginValidationSchema } from "@/validations/authValidation";
import { getDefaultDashboardPath } from "@/utils/roleRedirect";

// MUI Components
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

// MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname;
  const registrationEmail = (location.state as { registeredEmail?: string })
    ?.registeredEmail;

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<LoginPayload>({
    initialValues: {
      email: registrationEmail || "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        // 1. Receive fresh user object directly
        const loggedInUser = await login({
          email: values.email.trim(),
          password: values.password,
        });
        // If the user was trying to access a specific protected page, send them there.
        // Otherwise, send them to their role-specific landing page.
        const fallbackPath = getDefaultDashboardPath(loggedInUser);
        const destination = from && from !== "/login" ? from : fallbackPath;
        navigate(destination, { replace: true });
      } catch (err: unknown) {
        let message = "Invalid email or password.";

        if (isAxiosError<ApiErrorResponse>(err)) {
          // TypeScript safely knows err is an AxiosError with response.data typed as ApiErrorResponse
          message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            message;
        } else if (err instanceof Error) {
          // Handles standard JavaScript errors
          message = err.message;
        }

        setServerError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
            <LockOutlinedIcon fontSize="small" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sign in to Mind Vault
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to access your notes and vault
          </p>
        </div>

        {serverError && (
          <Alert
            severity="error"
            className="mt-6"
            onClose={() => setServerError(null)}
          >
            {serverError}
          </Alert>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 space-y-4"
          noValidate
        >
          <TextField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={formik.isSubmitting}
          />

          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            autoComplete="current-password"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={formik.isSubmitting}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{
              py: 1.2,
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              backgroundColor: "#0f172a",
              "&:hover": { backgroundColor: "#1e293b" },
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-slate-900 underline hover:text-slate-700"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
