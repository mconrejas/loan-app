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
  const [membershipStatus, setMembershipStatus] = useState('');
  const [membershipPeriod, setMembershipPeriod] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isResident, setIsResident] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('');
const [othersText, setOthersText] = useState('');

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

  const isFormValid = () => {
    // Ensure all required fields are filled before allowing to move to next page
    return (
      Object.values(formData).every((field) => field !== '') &&
      gender !== '' &&
      selectedStatus !== ''
    );
  };

  const handleApprovedChange = (event) => {
    setApproved(event.target.checked);
    if (event.target.checked) {
      setNotApproved(false);
    }
  };

  const handleNotApprovedChange = (event) => {
    setNotApproved(event.target.checked);
    if (event.target.checked) {
      setApproved(false);
    }
  };

  const handleMembershipStatusChange = (event) => {
    const value = event.target.value;
    setMembershipStatus(value);
  };

  const handlePurposeChange = (event) => {
    const value = event.target.value;
    setSelectedPurpose(value);
  };

  

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  

const handleResidentChange = (event) => {
  setIsResident(event.target.value);
};


// Handle change for Civil Status
const handleOthersChange = (event) => {
  setSelectedInfo(event.target.value);
  if (event.target.value !== 'Others') {
    setOthersText(''); // Clear 'Others' text when a different status is selected
  }
};

// Handle change for "Others" text field
const handleOthersTextChange = (event) => {
  setOthersText(event.target.value);
};

// Form validation
const isInfoValid = () => {
  return (
    selectedInfo !== '' && 
    (selectedInfo !== 'Others' || othersText.trim() !== '')
  );
};

const isNextButtonEnabled = selectedPurpose !== 'Others' || (selectedPurpose === 'Others' && othersText.trim() !== '');
  
  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
 <center><Typography variant="h5" gutterBottom>Membership Application Form</Typography></center>
{currentPage === 'personalInfo' && (
            <>
      
          <Typography variant="h6" sx={{mb:1}}>I. Personal Information</Typography>
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

          {/* Civil Status */}
          <FormGroup>
            <Typography variant="subtitle1">Civil Status</Typography>
            {['Single', 'Married', 'Widow/er', 'Others'].map((status) => (
          <FormControlLabel
            key={status}
            control={
              <Checkbox
                value={status}
                checked={selectedInfo.includes(status)}
                onChange={handleOthersChange}
                color="primary"
              />
            }
            label={status}
          />
        ))}

        {/* TextField for 'Others' status */}
        {selectedInfo.includes('Others') && (
          <TextField
            label="If others, specify"
            size="small"
            value={othersText}
            onChange={handleOthersTextChange}
            fullWidth
            required
          />
        )}
      </FormGroup>

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
              disabled={!isInfoValid()}
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

 {/* Question: Are you a resident of Biliran Province? */}
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

 {/* Question: Previously a member? */}
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


 {/* Question: Purpose of Joining */}
 <FormGroup>
        <Typography sx={{mt:1}}>Purpose of Joining:</Typography>
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
                onChange={handleOthersTextChange}
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
     disabled={!isInfoValid() || !isResident || !selectedPurpose || !membershipStatus || (membershipStatus === 'Yes' && !membershipPeriod)}
   >
     Next
   </Button>
 </Stack>
</>
)}


          {currentPage === 'shareCapitalContribution' && (
            <>
              <Typography variant="h6" sx={{mb:1}}>III. Share Capital Contribution</Typography>
              <Stack spacing={2}>
                <TextField label="Initial Share Capital (₱)" fullWidth />
                <TextField label="Minimum Required (₱)" fullWidth />

                <FormGroup>
      <Typography>Payment Method:</Typography>

      {/* Payment method checkboxes */}
      {['Cash', 'Check', 'Bank Transfer'].map((method) => (
        <FormControlLabel
          key={method}
          control={
            <Checkbox
              value={method}
              checked={paymentMethod === method}
              onChange={handlePaymentMethodChange}
              color="primary"
            />
          }
          label={method}
        />
      ))}

      {/* 'Other' checkbox with a text field */}
      <FormControlLabel
        control={
          <Checkbox
            value="Other"
            checked={paymentMethod === 'Other'}
            onChange={handlePaymentMethodChange}
            color="primary"
          />
        }
        label={
          <Stack direction="row" alignItems="center">
            <span>Other:</span>
            <TextField
              size="small"
              disabled={paymentMethod !== 'Other'}
              sx={{ ml: 1 }}
            />
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
              <Typography variant="h6" sx={{mb:2}}>IV. Beneficiary Information</Typography>
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
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Remarks:
      </Typography>
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
              <Button variant="contained" onClick={() => alert('Form Submitted!')}>Submit</Button>
            </Stack>
          </Stack>
        </div>
        </>
      )}
   

        </Paper>
      </Container>
  
  );
 }
       