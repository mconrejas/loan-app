'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Container,
  Paper,
} from '@mui/material';

export default function MembershipForm() {
  const [currentPage, setCurrentPage] = useState('personalInfo');
  const [gender, setGender] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [membershipPeriod, setMembershipPeriod] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [othersText, setOthersText] = useState('');
  const [isResident, setIsResident] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    age: '',
    homeAddress: '',
    contactNumber: '',
    emailAddress: '',
    occupation: '',
    employerBusiness: '',
  });

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextPage = () => {
    const pages = [
      'personalInfo',
      'membershipDetails',
      'shareCapitalContribution',
      'beneficiaryInfo',
      'declaration',
      'Cooperative',
    ];
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
    }
  };

  const handleBackPage = () => {
    const pages = [
      'personalInfo',
      'membershipDetails',
      'shareCapitalContribution',
      'beneficiaryInfo',
      'declaration',
      'Cooperative',
    ];
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1]);
    }
  };

  const isPersonalInfoValid = () => {
    return (
      formData.fullName !== '' &&
      formData.dateOfBirth !== '' &&
      formData.age !== '' &&
      gender !== '' &&
      formData.homeAddress !== '' &&
      formData.contactNumber !== '' &&
      formData.emailAddress !== '' &&
      formData.occupation !== '' &&
      formData.employerBusiness !== ''
    );
  };

  const isMembershipDetailsValid = () => {
    return (
      isResident !== '' &&
      selectedPurpose !== '' &&
      membershipStatus !== '' &&
      (membershipStatus !== 'Yes' || (membershipStatus === 'Yes' && membershipPeriod !== ''))
    );
  };

  const isNextButtonEnabled = () => {
    if (currentPage === 'personalInfo') {
      return isPersonalInfoValid();
    }

    if (currentPage === 'membershipDetails') {
      return isMembershipDetailsValid();
    }

    return false;
  };

  const handleMembershipStatusChange = (e) => {
    setMembershipStatus(e.target.value);
  };

  const handlePurposeChange = (e) => {
    setSelectedPurpose(e.target.value);
    if (e.target.value !== 'Others') {
      setOthersText('');
    }
  };

  const handleResidentChange = (e) => {
    setIsResident(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
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
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Age"
                  type="number"
                  fullWidth
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Stack>

              {/* Gender Dropdown */}
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  onChange={handleGenderChange}
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              {/* Home Address */}
              <TextField
                label="Home Address"
                fullWidth
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                required
              />

              {/* Contact Information */}
              <TextField
                label="Contact Number"
                fullWidth
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
              <TextField
                label="Occupation"
                fullWidth
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
              <TextField
                label="Employer/Business Name"
                fullWidth
                name="employerBusiness"
                value={formData.employerBusiness}
                onChange={handleChange}
                required
              />

              {/* Navigation Buttons */}
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleNextPage}
                  disabled={!isNextButtonEnabled()}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </>
        )}

        {currentPage === 'membershipDetails' && (
          <>
            <Typography variant="h6">II. Membership Details</Typography>
            <FormGroup>
              <Typography>Are you a resident of Biliran Province?</Typography>
              {['Yes', 'No'].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      value={status}
                      checked={isResident === status}
                      onChange={handleResidentChange}
                      color="primary"
                    />
                  }
                  label={status}
                />
              ))}
            </FormGroup>

            {/* Previously a member */}
            <FormGroup>
              <Typography>Previously a member?</Typography>
              {['Yes', 'No'].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      value={status}
                      checked={membershipStatus === status}
                      onChange={handleMembershipStatusChange}
                      color="primary"
                    />
                  }
                  label={status}
                />
              ))}

              {/* Conditional text field when 'Yes' is selected */}
              {membershipStatus === 'Yes' && (
                <TextField
                  label="If yes, indicate the period"
                  fullWidth
                  name="membershipPeriod"
                  value={membershipPeriod}
                  onChange={(e) => setMembershipPeriod(e.target.value)}
                />
              )}
            </FormGroup>

            {/* Purpose of Joining */}
            <FormGroup>
              <Typography sx={{ mt: 1 }}>Purpose of Joining:</Typography>
              {['Savings and Credit', 'Livelihood Assistance', 'Health Benefits'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      value={item}
                      checked={selectedPurpose === item}
                      onChange={handlePurposeChange}
                      color="primary"
                    />
                  }
                  label={item}
                />
              ))}

              {/* 'Others' option with a text field */}
              <FormControlLabel
                control={
                  <Checkbox
                    value="Others"
                    checked={selectedPurpose === 'Others'}
                    onChange={handlePurposeChange}
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" alignItems="center">
                    <span>Others:</span>
                    <TextField
                      size="small"
                      disabled={selectedPurpose !== 'Others'}
                      value={othersText}
                      onChange={(e) => setOthersText(e.target.value)}
                      sx={{ ml: 1 }}
                    />
                  </Stack>
                }
              />
            </FormGroup>

            {/* Navigation Buttons */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button onClick={handleBackPage}>Back</Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={!isNextButtonEnabled()}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  );
}
