import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { ScrollLockWrapper } from "@/components/common/ScrollLockWrapper";

export default function HomePage() {
  const { user, logout } = useAuth();
  const isGuest = !user;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc", // slate-50 equivalent
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Stack spacing={3}>
          {/* Top Bar / Header Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                component="h1"
                color="text.primary"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  fontWeight: 700,
                }}
              >
                {isGuest ? "Welcome to Mind Vault" : "Dashboard"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {isGuest
                  ? "You are currently viewing as a guest visitor."
                  : `Welcome back, ${user?.email}!`}
              </Typography>
            </Box>

            {/* Dynamic Action: Logout for User, Sign In for Guest */}
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              {isGuest ? (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={logout}
                  fullWidth
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Paper>

          {/* Content Section protected by ScrollLock for Guests */}
          <ScrollLockWrapper isGuest={isGuest}>
            <Stack spacing={2}>
              {Array.from({ length: 2000 }, (_, i) => i + 1).map((item) => (
                <Paper
                  key={item}
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="span"
                    color="primary.main"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.75,
                      display: "block",
                      mb: 0.5,
                      fontWeight: 700,
                    }}
                  >
                    Thought #{item}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="h3"
                    color="text.primary"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                      fontWeight: 600,
                    }}
                  >
                    Exploring Architectural Patterns in Modern Web Applications
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, lineHeight: 1.6 }}
                  >
                    Consistency between authentication state and route rendering
                    ensures users get previews without leaking sensitive
                    actions. Full permissions are granted immediately upon
                    sign-in.
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </ScrollLockWrapper>
        </Stack>
      </Container>
    </Box>
  );
}
