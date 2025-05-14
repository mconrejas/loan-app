'use client'
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Address: ${address}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Simple Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FormComponent;
