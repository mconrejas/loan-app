'use client';

import { useState, ChangeEvent, useEffect, FormEvent } from 'react';

import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  Button,
  SelectChangeEvent,
  Stack,
} from '@mui/material';

interface FormDataEntry {
  name: string;
  dob: string;
  age: string;
  gender: string;
  civilStatus: string;
  address: string;
  contact: string;
  email: string;
  occupation: string;
  employer: string;

  // Membership details
  isResident: string;
  membershipStatus: string;
  membershipPeriod: string;
  purposeOfJoining: string;

  status: string;
}

export default function FormPage() {
  // Page state
  const [currentPage, setCurrentPage] = useState<'personalInfo' | 'membershipDetails'>('personalInfo');

  // Personal Information states
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]);
  const [othersTextPersonal, setOthersTextPersonal] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [employer, setEmployer] = useState('');

  // Membership Details states
  const [isResident, setIsResident] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [membershipPeriod, setMembershipPeriod] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [othersTextMembership, setOthersTextMembership] = useState('');

  // Handlers
  const handleGenderChange = (e: SelectChangeEvent<string>) => setGender(e.target.value);

  const handleOthersChangePersonal = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedInfo((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleOthersTextChangePersonal = (e: ChangeEvent<HTMLInputElement>) => {
    setOthersTextPersonal(e.target.value);
  };

  // Validation for page 1 Next button
  const isPageOneValid = () => {
    // Civil status must be selected, if 'Others' selected, must fill othersTextPersonal
    const civilStatusValid =
      selectedInfo.length > 0 && (selectedInfo.includes('Others') ? othersTextPersonal.trim() !== '' : true);

    return (
      name.trim() !== '' &&
      dob !== '' &&
      age.trim() !== '' &&
      gender !== '' &&
      civilStatusValid &&
      address.trim() !== '' &&
      contact.trim() !== '' &&
      email.trim() !== '' &&
      occupation.trim() !== '' &&
      employer.trim() !== ''
    );
  };

  // Validation for page 2 Submit button
  const isPageTwoValid = () => {
    const purposeValid =
      selectedPurpose !== '' && (selectedPurpose === 'Others' ? othersTextMembership.trim() !== '' : true);

    const membershipPeriodValid = membershipStatus === 'Yes' ? membershipPeriod.trim() !== '' : true;

    return isResident !== '' && membershipStatus !== '' && membershipPeriodValid && purposeValid;
  };

  // Next page handler
  const handleNextPage = () => {
    if (isPageOneValid()) setCurrentPage('membershipDetails');
  };

  // Back page handler
  const handleBackPage = () => {
    setCurrentPage('personalInfo');
  };

  // Submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isPageTwoValid()) return;

    // Prepare civil status string
    const civilStatus = selectedInfo.includes('Others') ? othersTextPersonal : selectedInfo.join(', ');

    // Prepare purpose of joining string
    const purposeOfJoining = selectedPurpose === 'Others' ? othersTextMembership : selectedPurpose;

    const newEntry: FormDataEntry = {
      name,
      dob,
      age,
      gender,
      civilStatus,
      address,
      contact,
      email,
      occupation,
      employer,
      isResident,
      membershipStatus,
      membershipPeriod: membershipStatus === 'Yes' ? membershipPeriod : '',
      purposeOfJoining,
      status: 'Pending',
    };

    const existing: FormDataEntry[] = JSON.parse(localStorage.getItem('formData') || '[]');
    const updated = [...existing, newEntry];
    localStorage.setItem('formData', JSON.stringify(updated));

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

    setIsResident('');
    setMembershipStatus('');
    setMembershipPeriod('');
    setSelectedPurpose('');
    setOthersTextMembership('');

    setCurrentPage('personalInfo');
    alert('Form submitted successfully!');
  };


 const [data, setData] = useState<FormDataEntry[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 600,
          padding: 4,
          borderRadius: 2,
          bgcolor: '#fff',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <center>
          <Typography variant="h5" gutterBottom>
            Membership Application Form
          </Typography>
        </center>

        {currentPage === 'personalInfo' && (
          <>
            <Typography variant="h6" sx={{ mb: 1 }}>
              I. Personal Information
            </Typography>

            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />
            <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
                type="date"
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                InputLabelProps={{ shrink: true, required: false }}
                fullWidth
              />
              <TextField
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                InputLabelProps={{ required: false }}
                fullWidth
              />
            </div>

            <FormControl fullWidth required>
              <InputLabel id="gender-label" required={false}>
                Gender
              </InputLabel>
              <Select labelId="gender-label" value={gender} onChange={handleGenderChange} label="Gender">
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
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
                  control={
                    <Checkbox value={status} checked={selectedInfo.includes(status)} onChange={handleOthersChangePersonal} color="primary" />
                  }
                  label={status}
                />
              ))}
              {selectedInfo.includes('Others') && (
                <TextField
                  label="If others, specify"
                  size="small"
                  value={othersTextPersonal}
                  onChange={handleOthersTextChangePersonal}
                  fullWidth
                  required
                  InputLabelProps={{ required: false }}
                />
              )}
            </FormGroup>

            <TextField
              label="Home Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />
            <TextField
              label="Employer/Business Name"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ required: false }}
            />

            <Button
  variant="contained"
  color="primary"
  onClick={handleNextPage}
  disabled={!isPageOneValid()}
  sx={{
    marginLeft: 'auto',    // pushes the button to the right
    width: '60px',     
    minWidth: 'auto',      
    boxShadow: 'none',    
  }}
>
  Next
</Button>

          </>
        )}

        {currentPage === 'membershipDetails' && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              II. Membership Details
            </Typography>

            <FormGroup>
              <Typography>Are you a resident of Biliran Province?</Typography>
              {['Yes', 'No'].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      value={status}
                      checked={isResident === status}
                      onChange={() => setIsResident(isResident === status ? '' : status)}
                      color="primary"
                    />
                  }
                  label={status}
                />
              ))}
            </FormGroup>

            <FormGroup>
              <Typography>Previously a member?</Typography>
              {['Yes', 'No'].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      value={status}
                      checked={membershipStatus === status}
                      onChange={() => setMembershipStatus(membershipStatus === status ? '' : status)}
                      color="primary"
                    />
                  }
                  label={status}
                />
              ))}

              {membershipStatus === 'Yes' && (
                <TextField
                  label="If yes, indicate the period"
                  fullWidth
                  value={membershipPeriod}
                  onChange={(e) => setMembershipPeriod(e.target.value)}
                  sx={{ mt: 1 }}
                />
              )}
            </FormGroup>

            <FormGroup>
              <Typography sx={{ mt: 1 }}>Purpose of Joining:</Typography>
              {['Savings and Credit', 'Livelihood Assistance', 'Health Benefits'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      value={item}
                      checked={selectedPurpose === item}
                      onChange={() => setSelectedPurpose(selectedPurpose === item ? '' : item)}
                      color="primary"
                    />
                  }
                  label={item}
                />
              ))}

              <FormControlLabel
                control={
                  <Checkbox
                    value="Others"
                    checked={selectedPurpose === 'Others'}
                    onChange={() => setSelectedPurpose(selectedPurpose === 'Others' ? '' : 'Others')}
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <span>Others:</span>
                    <TextField
                      size="small"
                      value={othersTextMembership}
                      onChange={(e) => setOthersTextMembership(e.target.value)}
                      disabled={selectedPurpose !== 'Others'}
                    />
                  </Stack>
                }
              />
            </FormGroup>

            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
              <Button variant="outlined" onClick={handleBackPage}>
                Back
              </Button>
              <Button variant="contained" color="success" type="submit" disabled={!isPageTwoValid()}>
                Submit
              </Button>
            </Stack>
          </>
        )}
      </Paper>

      <p style={{ marginTop: '20px', color: '#333' }}>
        Data saved locally. Go to{' '}
        <a href="/basic-tables" style={{ color: '#007BFF', textDecoration: 'none' }}>
          Table Page
        </a>{' '}
        to view.
      </p>
    </div>
  );
}
