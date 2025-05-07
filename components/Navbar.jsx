'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct for App Router

import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const navigateToMembership = () => {
    handleClose(); // Close menu first
    router.push('/Member/Membership'); // ✅ Make sure this route exists under /app/Member/Membership/page.jsx
  };

  return (
    <>
      <HideOnScroll>
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
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
              >
                Dashboard
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={navigateToMembership} sx={{ fontSize: '0.75rem' }}>
                  Membership Application
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ fontSize: '0.75rem' }}>
                  Loan Application
                </MenuItem>
              </Menu>

              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={() => alert('Logging out')}
              >
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar /> {/* Spacer */}
    </>
  );
}
