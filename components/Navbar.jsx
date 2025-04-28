'use client';
import Link from next/link;
import {useRouter} from next/router;
import React, { useState } from 'react';
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
const router = useRouter();

const handleNavigate = (path) => {
  handleClose(); // close the menu
  router.push(path); // navigate
};


export default function MembershipForm() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Define the missing handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

              <MenuItem onClick={() => handleNavigate('/membership')} sx={{ fontSize: '0.86rem' }}>
  Membership Application
</MenuItem>
<MenuItem onClick={() => handleNavigate('/loan')} sx={{ fontSize: '0.86rem' }}>
  Loan Application
</MenuItem>


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

      {/* Spacer to push content below the fixed AppBar */}
      <Toolbar />
    </>
  );
}
