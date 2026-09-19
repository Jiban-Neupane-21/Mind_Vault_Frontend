import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { isAxiosError } from "axios";
import { authService } from "@/services/authService";
import type { RegisterFormValues, ApiErrorResponse } from "@/types/auth";
import { registerValidationSchema } from "@/validations/authValidation";

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
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setServerError(null);
      try {
        await authService.register({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        });

        navigate("/login", {
          replace: true,
          state: { registeredEmail: values.email.trim() },
        });
      } catch (err: unknown) {
        if (isAxiosError<ApiErrorResponse>(err)) {
          const status = err.response?.status;
          const backendMessage =
            err.response?.data?.error ||
            err.response?.data?.message ||
            "Registration failed. Please try again.";

          // If PostgreSQL/backend detects duplicate email (409)
          if (status === 409) {
            setFieldError("email", backendMessage);
            return;
          }

          setServerError(backendMessage);
        } else if (err instanceof Error) {
          setServerError(err.message);
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
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
            <PersonAddOutlinedIcon fontSize="small" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Get started with your personal Mind Vault
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
            id="name"
            name="name"
            label="Full Name"
            fullWidth
            autoComplete="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={formik.isSubmitting}
          />

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
            autoComplete="new-password"
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

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            autoComplete="new-password"
            size="small"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            disabled={formik.isSubmitting}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
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
              "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-slate-900 underline hover:text-slate-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
