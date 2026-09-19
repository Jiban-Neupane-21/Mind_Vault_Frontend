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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useColorMode } from "@/context/ThemeContextDefinition";

export const UserNavbar: React.FC = () => {
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
    // Clear user tokens/auth state here
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
          {/* Brand */}
          <Box
            component={RouterLink}
            to="/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "text.primary",
              gap: 1,
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

          {/* User Nav Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/home"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Home
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
              to="/create"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Create
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
              to="/sites"
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Sites
            </Button>
          </Box>

          {/* Menu Trigger */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleOpenMenu} size="small" sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.black",
                  fontSize: "0.9rem",
                }}
              />
            </IconButton>

            {/* User Dropdown Menu */}
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
              <MenuItem onClick={() => handleMenuClick("/profile")}>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              <MenuItem onClick={() => handleMenuClick("/settings")}>
                <ListItemIcon>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Setting" />
              </MenuItem>

              <MenuItem
                onClick={() => {
                  toggleColorMode();
                }}
              >
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

              <MenuItem onClick={() => handleMenuClick("/about")}>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="About" />
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

export default UserNavbar;
