'use client';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  useScrollTrigger,
  Slide,
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

export default function MembershipForm() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToMembership = () => {
    handleClose();
    router.push('/membership');
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit">
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

              {/* Dropdown menu for Dashboard */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={navigateToMembership}>
                  Membership Application
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
