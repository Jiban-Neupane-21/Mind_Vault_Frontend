import React, { useState } from "react";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useColorMode } from "@/context/ThemeContextDefinition";

export const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleCloseMenu();
    navigate(path);
  };

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem("token");
    navigate("/login");
  };

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
          {/* Brand & Admin Badge */}
          <Box
            component={RouterLink}
            to="/admin/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "text.primary",
              gap: 1.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                borderRadius: 50,
                border: 2,
                color: "#8B0000",
              }}
            >
              <img
                src="/logo/Logo.png"
                alt="Think Box"
                width={50}
                height={50}
              />
            </Typography>
          </Box>

          {/* Admin Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/admin/home"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/admin/users-report"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Users Report
            </Button>
            <Button
              component={RouterLink}
              to="/admin/contents-report"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Contents Report
            </Button>
            <Button
              component={RouterLink}
              to="/admin/manage-categories"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Manage categories
            </Button>
          </Box>

          {/* Profile Menu Trigger */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleOpenMenu} size="small" sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary-black",
                  fontSize: "0.9rem",
                }}
              />
            </IconButton>

            {/* Profile Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: { minWidth: 190, mt: 1.5, borderRadius: 2 },
                },
              }}
            >
              <MenuItem onClick={() => handleMenuClick("/admin/profile")}>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              <MenuItem onClick={() => handleMenuClick("/admin/settings")}>
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>

              <MenuItem onClick={toggleColorMode}>
                <ListItemIcon>
                  {mode === "dark" ? (
                    <Brightness7Icon fontSize="small" />
                  ) : (
                    <Brightness4Icon fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
                />
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon sx={{ color: "error.main" }}>
                  <LogoutOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
