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
  TextField,
  useScrollTrigger,
  Slide
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication logic
    if (username === 'admin' && password === 'admin') {
      router.push('/Admin');
    } else if (username === 'user' && password === 'user') {
      router.push('/User');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 320,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{ mb: 2, width: '100%' }}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2, width: '100%' }}
          required
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: '100%' }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
