'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

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
  Slide,
  Box
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
    handleClose();
    router.push('/Member/Membership'); 
  };

  const nav = () => {
    handleClose();
    router.push('/'); 
  };

  const navigateToLoanApplication = () => {
    handleClose();
    router.push('/LoanApplication'); 
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mr: 10 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '300',
                  fontFamily: "'Arial', sans-serif",
                  textAlign: 'center',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                }}
              >
                BILIRAN PROVINCE LIFE CARE MINISTRY COOPERATIVE
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
