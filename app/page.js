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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Admin Icon
import PersonIcon from '@mui/icons-material/Person'; // User Icon

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const nav = () => {
    handleClose();
    router.push('/User'); 
  };

  const admin = () => {
    handleClose();
    router.push('/Admin'); 
  };

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="logo">
              <AccountCircleIcon />
            </IconButton>

            {/* Title "My Application" */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 0,
                fontWeight: '300', // Thin font style
                fontFamily: "'Arial', sans-serif", // Clean font
                fontSize: '1.2rem', // Font size for "My Application"
                letterSpacing: '0.5px',
              }}
            >
              My Application
            </Typography>

            {/* Centered Title "BILIRAN PROVINCE LIFE CARE MINISTRY COOPERATIVE" */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mr: 10 }}>
              <Typography
                variant="h6" // Same font size for consistency
                sx={{
                  fontWeight: '300', // Thin font style for consistency
                  fontFamily: "'Arial', sans-serif", // Same font family as "My Application"
                  textAlign: 'center',
                  fontSize: '1rem', // Adjusted smaller size for center title
                  letterSpacing: '0.5px', // Optional: Adds spacing between letters
                  color: '#ffffff', // White color for visibility
                }}
              >
                BILIRAN PROVINCE LIFE CARE MINISTRY COOPERATIVE
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar /> {/* Spacer */}

      {/* Upper middle buttons, positioned lower */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '40%', // Lowered to 40%
          left: '50%',
          transform: 'translateX(-50%)', // Center horizontally
        }}
      >
        {/* ADMIN Button with Icon */}
        <Button
          onClick={admin}
          color="primary"
          variant="contained"
          startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '2rem' }} />} // Bigger Admin icon
          sx={{
            marginBottom: 3, // Added more space between buttons
            fontSize: '1rem', // Smaller button text
            padding: '6px 12px', // Smaller padding for smaller button
            minWidth: '120px', // Optional: set a minimum width for the buttons
            height: '40px', // Optional: set a fixed height for the buttons
          }}
        >
          ADMIN
        </Button>

        {/* USER Button with Icon */}
        <Button
          onClick={nav}
          sx={{
            backgroundColor: '#4caf50', // Green color
            color: 'white',
            fontSize: '1rem', // Smaller button text
            padding: '6px 12px', // Smaller padding for smaller button
            minWidth: '120px', // Optional: set a minimum width for the buttons
            height: '40px', // Optional: set a fixed height for the buttons
            '&:hover': {
              backgroundColor: '#388e3c', // Darker green on hover
            },
          }}
          startIcon={<PersonIcon sx={{ fontSize: '2rem' }} />} // Bigger User icon
        >
          USER
        </Button>
      </Box>
    </>
  );
}
