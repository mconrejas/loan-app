'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function MuiNavbar  () {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={() => alert("Navigating to Dashboard")}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => alert("Logging out")}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
