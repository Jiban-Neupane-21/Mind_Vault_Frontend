"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Role, NavItem } from "@/types/nav";
import {
  userNavItems,
  adminNavItems,
  sharedUtilityItems,
} from "@/config/navConfig";
import { useNavView } from "@/hooks/useNavView";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";

// Icons
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface NavbarProps {
  role: Role;
  onThemeToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, onThemeToggle }) => {
  const theme = useTheme();
  const { activeView, toggleView } = useNavView();
  const navigate = useNavigate();

  // Anchor state for the Secondary Links Menu
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleToggle = () => {
    const nextView = activeView === "Admin" ? "User" : "Admin";
    toggleView();
    navigate(nextView === "Admin" ? "/admin/dashboard" : "/");
  };

  const isGuest = role === "Guest";
  const isAdmin = role === "Admin";

  const navLinks: NavItem[] = React.useMemo(() => {
    if (isAdmin && activeView === "Admin") {
      return adminNavItems;
    }

    return [
      ...userNavItems,
      isGuest
        ? { label: "Sign In", href: "/login", icon: LoginOutlinedIcon }
        : {
            label: "Profile",
            href: "/profile",
            icon: PersonOutlineOutlinedIcon,
          },
    ];
  }, [isAdmin, activeView, isGuest]);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 1.5, sm: 3 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* Brand & Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "text.primary",
          }}
        >
          <Avatar
            src="/logo/Logo.png"
            alt="Frustate Box Logo"
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              border: "1.5px solid",
              borderColor: "error.main",
            }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              display: { xs: "none", sm: "inline" },
              fontWeight: "bold",
              fontFamily: '"Times New Roman", Times, serif',
              letterSpacing: 0.5,
            }}
          >
            Frustate Box
          </Typography>
        </Box>

        {/* Primary Links */}
        <Box
          component="nav"
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            gap: { xs: 0.5, md: 1 },
            minWidth: 0,
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Tooltip
                key={item.href}
                title={
                  <Box sx={{ display: { xs: "block", md: "block" } }}>
                    {item.label}
                  </Box>
                }
                arrow
              >
                <Button
                  component={Link}
                  to={item.href}
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                    flexDirection: { xs: "row", md: "column" },
                    minWidth: { xs: 40, md: 64 },
                    width: { xs: 40, md: "auto" },
                    height: { xs: 40, md: "auto" },
                    p: { xs: 0.75, md: 1 },
                    borderRadius: 2,
                  }}
                >
                  {Icon && (
                    <Icon
                      sx={{
                        fontSize: 20,
                        mb: { xs: 0, md: 0.25 },
                      }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      display: { xs: "none", md: "block" },
                      fontWeight: 600,
                      lineHeight: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              </Tooltip>
            );
          })}
        </Box>

        {/* Right-side Utilities, View Switcher & Dropdown Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 },
          }}
        >
          {/* Admin Mode Switcher */}
          {isAdmin && (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={activeView === "Admin"}
                  onChange={handleToggle}
                  color="secondary"
                />
              }
              label={
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: { xs: "none", sm: "inline" },
                    fontWeight: 600,
                  }}
                >
                  Admin
                </Typography>
              }
              sx={{ m: 0 }}
            />
          )}

          {/* Theme Toggle Button */}
          {onThemeToggle && (
            <Tooltip title="Toggle Theme">
              <IconButton
                onClick={onThemeToggle}
                size="small"
                color="inherit"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 0.75,
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}

          {/* Secondary Links: More Menu Button */}
          {sharedUtilityItems.length > 0 && (
            <>
              <Tooltip title="More options">
                <IconButton
                  onClick={handleOpenMenu}
                  size="small"
                  color="inherit"
                  aria-label="more options"
                  aria-controls={isMenuOpen ? "secondary-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? "true" : undefined}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 0.75,
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Menu
                id="secondary-menu"
                anchorEl={menuAnchorEl}
                open={isMenuOpen}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                  paper: {
                    elevation: 4,
                    sx: {
                      minWidth: 180,
                      borderRadius: 2,
                      mt: 1,
                      border: "1px solid",
                      borderColor: "divider",
                    },
                  },
                }}
              >
                {sharedUtilityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <MenuItem
                      key={item.href}
                      component={Link}
                      to={item.href}
                      onClick={handleCloseMenu}
                      sx={{
                        py: 1,
                        px: 2,
                        gap: 1.5,
                        fontSize: "0.875rem",
                      }}
                    >
                      {Icon && (
                        <ListItemIcon
                          sx={{ minWidth: "auto", color: "text.secondary" }}
                        >
                          <Icon fontSize="small" />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            variant: "body2",
                            sx: { fontWeight: 500 },
                          },
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
