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
  const [approved, setApproved] = useState(false);
  const [notApproved, setNotApproved] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleApprovedChange = (event) => setApproved(event.target.checked);
  const handleNotApprovedChange = (event) => setNotApproved(event.target.checked);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
    if (currentIndex < pages.length - 1) setCurrentPage(pages[currentIndex + 1]);
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
    if (currentIndex > 0) setCurrentPage(pages[currentIndex - 1]);
  };

  return (
    <>

      <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <center><Typography variant="h5" gutterBottom>Membership Application Form</Typography></center>

          {currentPage === 'personalInfo' && (
            <>
              <Typography variant="h6">I. Personal Information</Typography>
              <Stack spacing={2}>
                <TextField label="Full Name" fullWidth />
                <Stack direction="row" spacing={2}>
                  <TextField type="date" label="Date of Birth" InputLabelProps={{ shrink: true }} fullWidth />
                  <TextField label="Age" type="number" fullWidth />
                </Stack>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                <FormGroup>
                  <Typography variant="subtitle1">Civil Status</Typography>
                  {['Single', 'Married', 'Widow/er', 'Others'].map((status) => (
                    <FormControlLabel key={status} control={<Checkbox />} label={status} />
                  ))}
                  <TextField label="If others, specify" />
                </FormGroup>

                <TextField label="Home Address" fullWidth />
                <TextField label="Contact Number" fullWidth />
                <TextField label="Email Address" type="email" fullWidth />
                <TextField label="Occupation" fullWidth />
                <TextField label="Employer/Business Name" fullWidth />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="contained" onClick={handleNextPage}>Next</Button>
                </Stack>
              </Stack>
            </>
          )}

          {currentPage === 'membershipDetails' && (
            <>
              <Typography variant="h6">II. Membership Details</Typography>
              <FormGroup>
                <Typography>Are you a resident of Biliran Province?</Typography>
                <FormControlLabel control={<Checkbox />} label="Yes" />
                <FormControlLabel control={<Checkbox />} label="No" />
              </FormGroup>

              <FormGroup>
                <Typography>Previously a member?</Typography>
                <FormControlLabel control={<Checkbox />} label="Yes" />
                <FormControlLabel control={<Checkbox />} label="No" />
                <TextField label="If yes, indicate the period" />
              </FormGroup>

              <FormGroup>
                <Typography>Purpose of Joining:</Typography>
                {['Savings and Credit', 'Livelihood Assistance', 'Health Benefits'].map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Stack direction="row" alignItems="center">
                      <span>Others:</span>
                      <TextField size="small" sx={{ ml: 1 }} />
                    </Stack>
                  }
                />
              </FormGroup>

              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button onClick={handleBackPage}>Back</Button>
                <Button variant="contained" onClick={handleNextPage}>Next</Button>
              </Stack>
            </>
          )}

          {currentPage === 'shareCapitalContribution' && (
            <>
              <Typography variant="h6">III. Share Capital Contribution</Typography>
              <Stack spacing={2}>
                <TextField label="Initial Share Capital (₱)" fullWidth />
                <TextField label="Minimum Required (₱)" fullWidth />

                <FormGroup>
                  <Typography>Payment Method:</Typography>
                  {['Cash', 'Check', 'Bank Transfer'].map((method) => (
                    <FormControlLabel key={method} control={<Checkbox />} label={method} />
                  ))}
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Stack direction="row" alignItems="center">
                        <span>Other:</span>
                        <TextField size="small" sx={{ ml: 1 }} />
                      </Stack>
                    }
                  />
                </FormGroup>

                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <Button onClick={handleBackPage}>Back</Button>
                  <Button variant="contained" onClick={handleNextPage}>Next</Button>
                </Stack>
              </Stack>
            </>
          )}

          {currentPage === 'beneficiaryInfo' && (
            <>
              <Typography variant="h6">IV. Beneficiary Information</Typography>
              <Stack spacing={2}>
                <TextField label="Name of Beneficiary" fullWidth />
                <TextField label="Relationship" fullWidth />
                <TextField label="Contact Number of Beneficiary" fullWidth />
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <Button onClick={handleBackPage}>Back</Button>
                  <Button variant="contained" onClick={handleNextPage}>Next</Button>
                </Stack>
              </Stack>
            </>
          )}

{currentPage === 'declaration' && (
  <>
    <Typography variant="h6">V. Declaration of Applicant</Typography>
    <Typography paragraph textAlign="justify">
      I, the undersigned, hereby apply for membership in the <strong>Biliran Province Life Care Ministry Cooperative</strong>.
      I pledge to abide by the cooperative's bylaws, policies, and Code of Ethics. I understand the rights and
      responsibilities of membership, including participation in the cooperative's programs and activities.
    </Typography>
    <Stack spacing={2}>
      <TextField
        type="file"
        label="Signature"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        type="date"
        label="Date"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
        
      </Stack>
    </Stack>
  </>
)}
 
      {currentPage === 'Cooperative' && (
        <>
        <div className="declaration-container">
          <Typography variant="h6" sx={{ marginBottom: 2 }}>VI. For Cooperative Use Only</Typography>
          
          <Stack spacing={2}>
            {/* Date of Application Received */}
            <TextField
              type="date"
              label=" Date of Application Received"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            
            {/* Verified By (Officer's Name) */}
            <TextField
              type="text"
              label=" Verified By (Officer's Name)"
              fullWidth
            />
            
            {/* Approval Date */}
            <TextField
              type="date"
              label=" Approval Date"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            
            {/* Membership ID Number */}
            <TextField
              type="number"
              label=" Membership ID Number"
              fullWidth
            />
            
            {/* Remarks */}
            <Typography variant="body1" sx={{ marginBottom: 4 }}>Remarks:</Typography>
            <Stack direction="row" spacing={2} sx={{ marginTop: 0.1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={approved}
                    onChange={handleApprovedChange}
                    color="primary"
                  />
                }
                label="Approved"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={notApproved}
                    onChange={handleNotApprovedChange}
                    color="primary"
                  />
                }
                label="Not Approved"
              />
            </Stack>
            
            {/* Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button onClick={handleBackPage}>Back</Button>
              <Button variant="contained">Submit</Button>
            </Stack>
          </Stack>
        </div>
        </>
      )}
   
  



        </Paper>
      </Container>
    </>
  );
}
