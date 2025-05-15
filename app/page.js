'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

import {
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

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

            <Typography
              variant="h6"
              sx={{
                flexGrow: 0,
                fontWeight: '300',
                fontFamily: "'Arial', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.5px',
              }}
            >
              My Application
            </Typography>

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

      <Toolbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button
          onClick={admin}
          color="primary"
          variant="contained"
          startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '2rem' }} />}
          sx={{
            marginBottom: 3,
            fontSize: '1rem',
            padding: '6px 12px',
            minWidth: '120px',
            height: '40px',
          }}
        >
          ADMIN
        </Button>

        <Button
          onClick={nav}
          sx={{
            backgroundColor: '#4caf50',
            color: 'white',
            fontSize: '1rem',
            padding: '6px 12px',
            minWidth: '120px',
            height: '40px',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
          }}
          startIcon={<PersonIcon sx={{ fontSize: '2rem' }} />}
        >
          USER
        </Button>
      </Box>
    </>
  );
}
