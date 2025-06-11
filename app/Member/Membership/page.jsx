'use client';

import React, { useState, ChangeEvent } from 'react';
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
  SelectChangeEvent,
} from '@mui/material';

type FormDataType = {
  fullName: string;
  dateOfBirth: string;
  age: string;
  homeAddress: string;
  contactNumber: string;
  emailAddress: string;
  occupation: string;
  employerBusiness: string;
  initialShareCapital: string;
  minimumRequired: string;
  beneficiaryName: string;
  relationship: string;
  beneficiaryContact: string;
  signature: File | null;
  date: string;
  selectedInfo: string;
  othersTextPersonal: string;
};

type CooperativeDataType = {
  applicationReceivedDate: string;
  verifiedBy: string;
  approvalDate: string;
  membershipId: string;
};

export default function Membership() {
  const [currentPage, setCurrentPage] = useState<string>('personalInfo');
  const [gender, setGender] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(false);
  const [notApproved, setNotApproved] = useState<boolean>(false);
  const [membershipStatus, setMembershipStatus] = useState<string>('');
  const [membershipPeriod, setMembershipPeriod] = useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isResident, setIsResident] = useState<string>('');
  const [selectedInfo, setSelectedInfo] = useState<string[]>([]);
  const [othersTextPersonal, setOthersTextPersonal] = useState<string>('');
  const [othersTextMembership, setOthersTextMembership] = useState<string>('');
  const [othersTextShareCapital, setOthersTextShareCapital] = useState<string>('');
  const [cooperativeData, setCooperativeData] = useState<CooperativeDataType>({
    applicationReceivedDate: '',
    verifiedBy: '',
    approvalDate: '',
    membershipId: '',
  });

  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    dateOfBirth: '',
    age: '',
    homeAddress: '',
    contactNumber: '',
    emailAddress: '',
    occupation: '',
    employerBusiness: '',
    initialShareCapital: '',
    minimumRequired: '',
    beneficiaryName: '',
    relationship: '',
    beneficiaryContact: '',
    signature: null,
    date: '',
    selectedInfo: '',
    othersTextPersonal: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    setGender(e.target.value);
  };

  const handleNextPage = () => {
    const pages = ['personalInfo', 'membershipDetails', 'shareCapitalContribution', 'beneficiaryInfo', 'declaration', 'Cooperative'];
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) setCurrentPage(pages[currentIndex + 1]);
  };

  const handleBackPage = () => {
    const pages = ['personalInfo', 'membershipDetails', 'shareCapitalContribution', 'beneficiaryInfo', 'declaration', 'Cooperative'];
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) setCurrentPage(pages[currentIndex - 1]);
  };

  const isPersonalInfoValid = () => {
    return (
      formData.fullName &&
      formData.dateOfBirth &&
      formData.age &&
      gender &&
      formData.homeAddress &&
      formData.contactNumber &&
      formData.emailAddress &&
      formData.occupation &&
      formData.employerBusiness &&
      selectedInfo.length === 1 &&
      (selectedInfo[0] !== 'Others' || othersTextPersonal.trim() !== '')
    );
  };

  const isMembershipDetailsValid = () => {
    return (
      isResident &&
      selectedPurpose &&
      membershipStatus &&
      (membershipStatus !== 'Yes' || membershipPeriod !== '')
    );
  };

  const isShareCapitalValid = () => {
    return (
      formData.initialShareCapital &&
      formData.minimumRequired &&
      paymentMethod &&
      (paymentMethod !== 'Other' || othersTextShareCapital.trim() !== '')
    );
  };

  const isBeneficiaryInfoValid = () => {
    return (
      formData.beneficiaryName &&
      formData.relationship &&
      formData.beneficiaryContact
    );
  };

  const isDeclarationValid = () => {
    return (
      formData.signature instanceof File &&
      formData.signature.size > 0 &&
      formData.date !== ''
    );
  };

  const isCooperativeFormValid = () => {
    return (
      cooperativeData.applicationReceivedDate &&
      cooperativeData.verifiedBy.trim() !== '' &&
      cooperativeData.approvalDate &&
      cooperativeData.membershipId &&
      (approved || notApproved)
    );
  };

  const isNextButtonEnabled = () => {
    switch (currentPage) {
      case 'personalInfo':
        return isPersonalInfoValid();
      case 'membershipDetails':
        return isMembershipDetailsValid() && (selectedPurpose !== 'Others' || othersTextMembership.trim() !== '');
      case 'shareCapitalContribution':
        return isShareCapitalValid();
      case 'beneficiaryInfo':
        return isBeneficiaryInfoValid();
      case 'declaration':
        return isDeclarationValid();
      case 'Cooperative':
        return isCooperativeFormValid();
      default:
        return false;
    }
  };

  const handleOthersChangePersonal = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedInfo([value]);
    if (value !== 'Others') {
      setOthersTextPersonal('');
    }
  };

  const handleOthersTextChangePersonal = (event: ChangeEvent<HTMLInputElement>) => {
    setOthersTextPersonal(event.target.value);
  };

  const handlePurposeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedPurpose(value);
    if (value !== 'Others') {
      setOthersTextMembership('');
    }
  };

  const handleApprovedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApproved(event.target.checked);
    if (event.target.checked) setNotApproved(false);
  };

  const handleNotApprovedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNotApproved(event.target.checked);
    if (event.target.checked) setApproved(false);
  };

  const handleMembershipStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMembershipStatus(event.target.value);
  };

  const handleResidentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsResident(event.target.value);
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    if (formData.signature) {
      formDataToSend.append('signature', formData.signature);
    }
    formDataToSend.append('date', formData.date);
    console.log('Submitting form data', formDataToSend);
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
          onChange={handleOthersChangePersonal}
          color="primary"
        />
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
    />
  )}
</FormGroup>


              <TextField
                label="Home Address"
                fullWidth
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                required
              />

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
              value={othersTextMembership}
              onChange={(e) => setOthersTextMembership(e.target.value)}
              sx={{ ml: 1 }}
            />
          </Stack>
        }
      />
    </FormGroup>

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


{currentPage === 'shareCapitalContribution' && (
  <>
    <Typography variant="h6" sx={{ mb: 1 }}>
      III. Share Capital Contribution
    </Typography>
    <Stack spacing={2}>
      <TextField
        label="Initial Share Capital (₱)"
        fullWidth
        value={formData.initialShareCapital}
        onChange={(e) => setFormData({ ...formData, initialShareCapital: e.target.value })}
        required
      />
     
      <TextField
        label="Minimum Required (₱)"
        fullWidth
        value={formData.minimumRequired}
        onChange={(e) => setFormData({ ...formData, minimumRequired: e.target.value })}
        required
      />
      
      <FormGroup>
        <Typography>Payment Method:</Typography>
        {['Cash', 'Check', 'Bank Transfer'].map((method) => (
          <FormControlLabel
            key={method}
            control={
              <Checkbox
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                color="primary"
              />
            }
            label={method}
          />
        ))}

        <FormControlLabel
          control={
            <Checkbox
              value="Other"
              checked={paymentMethod === 'Other'}
              onChange={(e) => setPaymentMethod(e.target.value)}
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
                value={othersTextShareCapital}
                onChange={(e) => setOthersTextShareCapital(e.target.value)}
              />
            </Stack>
          }
        />
      </FormGroup>

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
    </Stack>
  </>
)}



{currentPage === 'beneficiaryInfo' && (
  <>
    <Typography variant="h6" sx={{ mb: 2 }}>
      IV. Beneficiary Information
    </Typography>
    <Stack spacing={2}>
      <TextField
        label="Name of Beneficiary"
        fullWidth
        value={formData.beneficiaryName}
        onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
        required
      />
      
      <TextField
        label="Relationship"
        fullWidth
        value={formData.relationship}
        onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
        required
      />
      
      <TextField
        label="Contact Number of Beneficiary"
        fullWidth
        value={formData.beneficiaryContact}
        onChange={(e) => setFormData({ ...formData, beneficiaryContact: e.target.value })}
        required
      />

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={!isBeneficiaryInfoValid()} 
        >
          Next
        </Button>
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
        required
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          const file = e.target.files[0]; 
          if (file) {
            setFormData({ ...formData, signature: file }); 
          }
        }}
        helperText={formData.signature ? formData.signature.name : ''} 
      />

      <TextField
        type="date"
        label="Date"
        fullWidth
        required
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        value={formData.date || ''} 
      />

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
    </Stack>
  </>
)}

      {currentPage === 'Cooperative' && (
        <>
        <div className="declaration-container">
          <Typography variant="h6" sx={{ marginBottom: 2 }}>VI. For Cooperative Use Only</Typography>
          
          <Stack spacing={2}>
            <TextField
  type="date"
  label="Date of Application Received"
  fullWidth
  required
  InputLabelProps={{ shrink: true }}
  value={cooperativeData.applicationReceivedDate}
  onChange={(e) =>
    setCooperativeData({ ...cooperativeData, applicationReceivedDate: e.target.value })
  }
/>

<TextField
  type="text"
  label="Verified By (Officer's Name)"
  fullWidth
  required
  value={cooperativeData.verifiedBy}
  onChange={(e) =>
    setCooperativeData({ ...cooperativeData, verifiedBy: e.target.value })
  }
/>

<TextField
  type="date"
  label="Approval Date"
  fullWidth
  required
  InputLabelProps={{ shrink: true }}
  value={cooperativeData.approvalDate}
  onChange={(e) =>
    setCooperativeData({ ...cooperativeData, approvalDate: e.target.value })
  }
/>

<TextField
  type="number"
  label="Membership ID Number"
  fullWidth
  required
  value={cooperativeData.membershipId}
  onChange={(e) =>
    setCooperativeData({ ...cooperativeData, membershipId: e.target.value })
  }
/>
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
            
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button onClick={handleBackPage}>Back</Button>
              <Button variant="contained"onClick={() => alert('Form Submitted!')} disabled={!isNextButtonEnabled()}>Submit</Button>
            </Stack>
          </Stack>
        </div>
        </>
      )}
   

        </Paper>
      </Container>
  
  );
 }
       