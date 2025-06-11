'use client';

import { useState } from 'react';
import {
  Paper, FormControl, InputLabel, Select, MenuItem,
  FormGroup, FormControlLabel, Checkbox, Typography,
  TextField, Button
} from '@mui/material';

export default function FormPage() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [othersTextPersonal, setOthersTextPersonal] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [employer, setEmployer] = useState('');

  const handleGenderChange = (e) => setGender(e.target.value);

  const handleOthersChangePersonal = (e) => {
    const value = e.target.value;
    setSelectedInfo((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleOthersTextChangePersonal = (e) => setOthersTextPersonal(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const civilStatus = selectedInfo.includes('Others') ? othersTextPersonal : selectedInfo.join(', ');

    const newEntry = {
      name,
      dob, // Store in ISO format for accurate processing
      age,
      gender,
      civilStatus,
      address,
      contact,
      email,
      occupation,
      employer,
      status: 'Pending',
    };

    const existing = JSON.parse(localStorage.getItem('formData') || '[]');
    const updated = [...existing, newEntry];
    localStorage.setItem('formData', JSON.stringify(updated));

    // Reset fields
    setName('');
    setDob('');
    setAge('');
    setGender('');
    setSelectedInfo([]);
    setOthersTextPersonal('');
    setAddress('');
    setContact('');
    setEmail('');
    setOccupation('');
    setEmployer('');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px'
    }}>
      <Paper elevation={4} sx={{
        display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600,
        padding: 4, borderRadius: 2, bgcolor: '#fff'
      }} component="form" onSubmit={handleSubmit}>

        <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
        <div style={{ display: 'flex', gap: '16px' }}>
          <TextField type="date" label="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required fullWidth />
        </div>

        <FormControl fullWidth required>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select labelId="gender-label" value={gender} onChange={handleGenderChange} label="Gender">
            <MenuItem value=""><em>Select Gender</em></MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormGroup>
          <Typography variant="subtitle1">Civil Status</Typography>
          {['Single', 'Married', 'Widow/er', 'Others'].map((status) => (
            <FormControlLabel
              key={status}
              control={<Checkbox value={status} checked={selectedInfo.includes(status)} onChange={handleOthersChangePersonal} color="primary" />}
              label={status}
            />
          ))}
          {selectedInfo.includes('Others') && (
            <TextField label="If others, specify" size="small" value={othersTextPersonal} onChange={handleOthersTextChangePersonal} fullWidth required />
          )}
        </FormGroup>

        <TextField label="Home Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth required />
        <TextField label="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} fullWidth required />
        <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
        <TextField label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} fullWidth required />
        <TextField label="Employer/Business Name" value={employer} onChange={(e) => setEmployer(e.target.value)} fullWidth required />

        <Button type="submit" variant="contained" color="success" fullWidth>Submit</Button>
      </Paper>

      <p style={{ marginTop: '20px', color: '#333' }}>
        Data saved locally. Go to{' '}
        <a href="/table" style={{ color: '#007BFF', textDecoration: 'none' }}>Table Page</a> to view.
      </p>
    </div>
  );
}  