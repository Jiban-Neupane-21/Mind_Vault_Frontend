import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ThemeToggle from "@/components/common/ThemeToggle";

export const GuestNavbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Brand Logo & Name */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "text.primary",
              gap: 1,
            }}
          >
            <LockOutlinedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Mind Vault
            </Typography>
          </Box>

          {/* Guest Public Nav Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/quotes"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Quotes
            </Button>
            <Button
              component={RouterLink}
              to="/thoughts"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Thoughts
            </Button>
            <Button
              component={RouterLink}
              to="/create-sites"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Create Sites
            </Button>
          </Box>

          {/* Theme Toggle & Auth Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ThemeToggle />
            <Button
              component={RouterLink}
              to="/login"
              variant="text"
              color="primary"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              disableElevation
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Signup
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default GuestNavbar;
