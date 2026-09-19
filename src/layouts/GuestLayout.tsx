import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import GuestNavbar from '@/components/navbar/GuestNavbar';

export const GuestLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GuestNavbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default GuestLayout;