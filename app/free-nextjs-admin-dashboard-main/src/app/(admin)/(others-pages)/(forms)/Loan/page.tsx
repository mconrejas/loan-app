'use client';

import React, { useState, ChangeEvent } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

type Page =
  | 'personalInfo'
  | 'loanDetails'
  | 'loanSecurity'
  | 'references'
  | 'declaration'
  | 'cooperative';

  const pageNumber = {
  personalInfo: 1,
  loanDetails: 2,
  loanSecurity: 3,
  references: 4,
  declaration: 5,
  cooperative: 6,
};


const LoanApplicationForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('personalInfo');

  const [borrowerName, setBorrowerName] = useState('');
  const [membershipID, setMembershipID] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState(''); 
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [employerName, setEmployerName] = useState('');
const [loanAmount, setLoanAmount] = useState('');
const [loanPurpose, setLoanPurpose] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [otherPeriod, setOtherPeriod] = useState('');
  const [otherPaymentMode, setOtherPaymentMode] = useState('');
  const [selectedCollateral, setSelectedCollateral] = useState('');
  const [otherCollateral, setOtherCollateral] = useState('');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorContact, setGuarantorContact] = useState('');
  const [guarantorRelationship, setGuarantorRelationship] = useState('');
const [ref1Name, setRef1Name] = useState('');
const [ref1Address, setRef1Address] = useState('');
const [ref1Contact, setRef1Contact] = useState('');
const [ref1Relationship, setRef1Relationship] = useState('');
const [ref2Name, setRef2Name] = useState('');
const [ref2Address, setRef2Address] = useState('');
const [ref2Contact, setRef2Contact] = useState('');
const [ref2Relationship, setRef2Relationship] = useState('');
const [signatureFile, setSignatureFile] = useState<File | null>(null);
const [declarationDate, setDeclarationDate] = useState('');

const [applicationReceivedDate, setApplicationReceivedDate] = useState('');
const [creditStanding, setCreditStanding] = useState('');
const [repaymentCapacity, setRepaymentCapacity] = useState('');
const [loanApproved, setLoanApproved] = useState('');
const [amountApproved, setAmountApproved] = useState('');
const [repaymentTerms, setRepaymentTerms] = useState('');
const [interestRate, setInterestRate] = useState('');
const [remarks, setRemarks] = useState('');
const [loanOfficerName, setLoanOfficerName] = useState('');
const [officerSignatureFile, setOfficerSignatureFile] = useState<File | null>(null);
const [officerSignatureDate, setOfficerSignatureDate] = useState('');
const [otherStatusText, setOtherStatusText] = useState('');
const [otherLoanType, setOtherLoanType] = useState('');




  const handleNextPage = () => {
    const pageFlow: Page[] = ['personalInfo', 'loanDetails', 'loanSecurity', 'references', 'declaration', 'cooperative'];
    const currentIndex = pageFlow.indexOf(currentPage);
    if (currentIndex < pageFlow.length - 1) {
      setCurrentPage(pageFlow[currentIndex + 1]);
    }
  };

  const handleBackPage = () => {
    const pageFlow: Page[] = ['personalInfo', 'loanDetails', 'loanSecurity', 'references', 'declaration', 'cooperative'];
    const currentIndex = pageFlow.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pageFlow[currentIndex - 1]);
    }
  };

const handleCheckboxSelection = (
  value: string,
  currentValue: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setValue(currentValue === value ? '' : value);
};


  const handleTypeSelection = (value: string) => {
    setSelectedType(value); 
  };

  const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  };

 const isPersonalInfoValid = () => {
  const requiredFieldsFilled =
    borrowerName &&
    membershipID &&
    dob &&
    age &&
    selectedStatus &&
    address &&
    contactNumber &&
    email &&
    occupation &&
    employerName;

  const othersStatusValid = selectedStatus !== 'Others' || otherStatusText.trim() !== '';

  return requiredFieldsFilled && othersStatusValid;
};

  const handleCollateralChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  setSelectedCollateral(selectedCollateral === value ? '' : value);
};

const handleOtherCollateralChange = (event: ChangeEvent<HTMLInputElement>) => {
  setOtherCollateral(event.target.value);
};


  const isLoanSecurityValid = () => {
    return (
      selectedCollateral &&
      (selectedCollateral !== 'Others' || otherCollateral) && 
      estimatedValue &&
      guarantorName &&
      guarantorContact &&
      guarantorRelationship
    );
  };

  const isReferencesValid = () => {
  return (
    ref1Name && ref1Address && ref1Contact && ref1Relationship &&
    ref2Name && ref2Address && ref2Contact && ref2Relationship
  );
};

const handleSignatureChange = (event: ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    setSignatureFile(event.target.files[0]);
  } else {
    setSignatureFile(null);
  }
};

const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
  setDeclarationDate(event.target.value);
};

const isDeclarationValid = () => {
  return signatureFile !== null && declarationDate !== '';
};

const isCooperativeSectionValid = () => {
  return (
    applicationReceivedDate &&
    creditStanding &&
    repaymentCapacity &&
    loanApproved &&
    amountApproved &&
    repaymentTerms &&
    interestRate &&
    remarks &&
    loanOfficerName &&
    officerSignatureFile !== null &&
    officerSignatureDate
  );
};





  const renderPage = () => {
    switch (currentPage) {
      case 'personalInfo':
        return (
          <>
            <center><Typography variant="h5" gutterBottom>Loan Application Form</Typography></center>
            <Typography variant="h6" sx={{ mb: 2 }}>
              I. Personal Information
            </Typography>
            <Stack spacing={2}>
              <TextField label="Name of Borrower" fullWidth value={borrowerName} onChange={handleTextChange(setBorrowerName)} />
              <TextField label="Membership ID Number" fullWidth value={membershipID} onChange={handleTextChange(setMembershipID)} />
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={dob}
                  onChange={handleTextChange(setDob)}
                />
                <TextField label="Age" type="number" fullWidth value={age} onChange={handleTextChange(setAge)} />
              </Stack>

         <FormGroup>
  <Typography variant="subtitle1">Civil Status</Typography>
  {['Single', 'Married', 'Widow/er', 'Others'].map((status) => (
    <div
      key={status}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
    >
      <Checkbox
        value={status}
        checked={selectedStatus === status}
        onChange={() =>
          handleCheckboxSelection(status, selectedStatus, setSelectedStatus)
        }
        sx={{ padding: 0, marginRight: 1 }}   
      />
      <Typography variant="body1">{status}</Typography>
    </div>
  ))}
  {selectedStatus === 'Others' && (
    <TextField
      label="If others, specify"
      size="small"
      value={otherStatusText}
      onChange={(e) => setOtherStatusText(e.target.value)}
    />
  )}
</FormGroup>



              <TextField label="Address" fullWidth value={address} onChange={handleTextChange(setAddress)} />
              <TextField label="Contact Number" fullWidth value={contactNumber} onChange={handleTextChange(setContactNumber)} />
              <TextField label="Email Address" type="email" fullWidth value={email} onChange={handleTextChange(setEmail)} />
              <TextField label="Occupation" fullWidth value={occupation} onChange={handleTextChange(setOccupation)} />
              <TextField label="Employer/Business Name" fullWidth value={employerName} onChange={handleTextChange(setEmployerName)} />

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleNextPage}
                  disabled={!isPersonalInfoValid()} 
                >
                  Next
                </Button>
              </Stack>
            </Stack>
             {/* Page number footer */}
      <Typography align="center" sx={{ mt:2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
          </>
        );
  
     case 'loanDetails':
  return (
    <>
      <Typography variant="h6">II. Loan Details</Typography>
     <FormGroup>
  <Typography variant="subtitle1" sx={{  mt: 2, mb:1 }}>
  Type of Loan
</Typography>

{['Emergency Loan', 'Personal Loan', 'Business Loan', 'Educational Loan', 'Housing Loan', 'Others'].map((type) => (
  <div key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
    <Checkbox
      value={type}
      checked={selectedType === type}
      onChange={() => handleCheckboxSelection(type, selectedType, setSelectedType)}
      sx={{ p: 0, mr: 1 }}
    />
    <Typography variant="body1">{type}</Typography>
  </div>
))}

{selectedType === 'Others' && (
  <TextField
    label="If other, specify"
    size="small"
    value={otherLoanType}
    onChange={(e) => setOtherLoanType(e.target.value)}
    sx={{ mb: 2 }}
  />
)}


  <TextField
    label="Loan Amount Requested (₱)"
    type="number"
    fullWidth
    value={loanAmount}
    onChange={handleTextChange(setLoanAmount)}
    sx={{ mb: 2, mt:1 }}
  />

  <TextField
    label="Purpose of Loan"
    fullWidth
    value={loanPurpose}
    onChange={handleTextChange(setLoanPurpose)}
    sx={{ mb: 2 }}
  />

  <Typography variant="subtitle1">Repayment Period</Typography>
  {['3 months', '6 months', '1 year', 'Other'].map((period) => (
    <div key={period} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <Checkbox
        checked={repaymentPeriod === period}
        onChange={() => handleCheckboxSelection(period, repaymentPeriod, setRepaymentPeriod)}
        value={period}
        sx={{ p: 0, mr: 1 }}
      />
      <Typography variant="body1">{period}</Typography>
    </div>
  ))}

  {repaymentPeriod === 'Other' && (
    <TextField
      label="If other, specify"
      fullWidth
      value={otherPeriod}
      onChange={(e) => setOtherPeriod(e.target.value)}
      size="small"
    />
  )}

  <Typography variant="subtitle1">Preferred Payment Mode</Typography>
  {['Monthly', 'Bi-weekly', 'Lump Sum', 'Other'].map((mode) => (
    <div key={mode} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <Checkbox
        checked={paymentMode === mode}
        onChange={() => handleCheckboxSelection(mode, paymentMode, setPaymentMode)}
        value={mode}
        sx={{ p: 0, mr: 1 }}
      />
      <Typography variant="body1">{mode}</Typography>
    </div>
  ))}

  {paymentMode === 'Other' && (
    <TextField
      label="If other, specify"
      fullWidth
      value={otherPaymentMode}
      onChange={(e) => setOtherPaymentMode(e.target.value)}
      size="small"
    />
  )}

  {/* Logic to enable Next button only when all required fields are filled */}
  <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
    <Button onClick={handleBackPage}>Back</Button>
    <Button
      variant="contained"
      onClick={handleNextPage}
      disabled={
        !(
          selectedType &&
          loanAmount &&
          loanPurpose &&
          repaymentPeriod &&
          paymentMode &&
          (selectedType !== 'Others' || otherLoanType.trim() !== '') &&
          (repaymentPeriod !== 'Other' || otherPeriod.trim() !== '') &&
          (paymentMode !== 'Other' || otherPaymentMode.trim() !== '')
        )
      }
    >
      Next
    </Button>
  </Stack>
</FormGroup>

       {/* Page number footer */}
      <Typography align="center" sx={{ mt: 2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
    </>
  );

      case 'loanSecurity':
  return (
    <>
      <Typography variant="h6">III. Loan Security</Typography>
      <FormGroup>
        <Typography sx={{  mt: 2, mb:1 }}>Type of Collateral</Typography>
       {['Real Property', 'Vehicle', 'Appliances', 'Others'].map((collateral) => (
  <div
    key={collateral}
    style={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginTop:1 }}
  >
    <Checkbox
      checked={selectedCollateral === collateral}
      onChange={handleCollateralChange}
      value={collateral}
      sx={{ p: 0, mr: 1 }}
    />
    <Typography variant="body1">{collateral}</Typography>
  </div>
))}

{selectedCollateral === 'Others' && (
  <TextField
    label="If other, specify"
    fullWidth
    value={otherCollateral}
    onChange={handleOtherCollateralChange}
    sx={{ mb: 2 }}
    size="small"
  />
)}


        <TextField
          label="Estimated Value of Collateral (₱)"
          type="number"
          fullWidth
          value={estimatedValue}
          onChange={handleTextChange(setEstimatedValue)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Guarantor Name (if applicable)"
          fullWidth
          value={guarantorName}
          onChange={handleTextChange(setGuarantorName)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Guarantor Contact Number"
          fullWidth
          value={guarantorContact}
          onChange={handleTextChange(setGuarantorContact)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Guarantor Relationship to Borrower"
          fullWidth
          value={guarantorRelationship}
          onChange={handleTextChange(setGuarantorRelationship)}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button onClick={handleBackPage}>Back</Button>
          <Button variant="contained" onClick={handleNextPage} disabled={!isLoanSecurityValid()}>
            Next
          </Button>
        </Stack>
      </FormGroup>
      {/* Page number footer */}
      <Typography align="center" sx={{ mt: 2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
    </>
  );

      case 'references':
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>IV. References</Typography>
      <FormGroup>
        <Typography>Reference 1</Typography>
        <TextField label="Name" value={ref1Name} onChange={handleTextChange(setRef1Name)} fullWidth sx={{ mb: 2, mt: 2 }} />
        <TextField label="Address" value={ref1Address} onChange={handleTextChange(setRef1Address)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Contact Number" value={ref1Contact} onChange={handleTextChange(setRef1Contact)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Relationship" value={ref1Relationship} onChange={handleTextChange(setRef1Relationship)} fullWidth sx={{ mb: 2 }} />

        <Typography sx={{ mt: 2 }}>Reference 2</Typography>
        <TextField label="Name" value={ref2Name} onChange={handleTextChange(setRef2Name)} fullWidth sx={{ mb: 2, mt: 2 }} />
        <TextField label="Address" value={ref2Address} onChange={handleTextChange(setRef2Address)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Contact Number" value={ref2Contact} onChange={handleTextChange(setRef2Contact)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Relationship" value={ref2Relationship} onChange={handleTextChange(setRef2Relationship)} fullWidth sx={{ mb: 2 }} />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button onClick={handleBackPage}>Back</Button>
          <Button variant="contained" onClick={handleNextPage} disabled={!isReferencesValid()}>
            Next
          </Button>
        </Stack>
      </FormGroup>
       {/* Page number footer */}
      <Typography align="center" sx={{ mt: 2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
    
    </>
  );
case 'declaration':
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">V. Declaration of Borrower</Typography>
        <Typography>
          I, the undersigned, hereby apply for a loan from the Biliran Province Life Care Ministry Cooperative.
          I certify that the information provided in this application is true and correct to the best of my knowledge.
          I agree to abide by the cooperative's loan policies and to repay the loan as per the agreed terms.
        </Typography>

        {/* Signature Upload */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <TextField
            label="Borrower's Signature"
            value={signatureFile ? signatureFile.name : ''}
            placeholder="Upload signature file"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            required
            InputLabelProps={{ required: false }} 
          />
          <Button
            variant="outlined"
            component="label"
          >
            Upload
            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={handleSignatureChange}
            />
          </Button>
        </Stack>

        {/* Date Picker */}
        <TextField
          label="Date"
          type="date"
          value={declarationDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
            required: false 
          }}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        {/* Navigation Buttons */}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button onClick={handleBackPage}>Back</Button>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={!isDeclarationValid()}
          >
            Next
          </Button>
        </Stack>
      </Stack>
      
      {/* Page number footer */}
      <Typography align="center" sx={{ mt: 2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
    </>
  );



   case 'cooperative':
  return (
    <>
      <Typography variant="h6">VI. For Cooperative Use Only</Typography>

      <TextField
        label="Date of Application Received"
        type="date"
        value={applicationReceivedDate}
        onChange={(e) => setApplicationReceivedDate(e.target.value)}
        fullWidth
        sx={{ mb: 2, mt: 2 }}
        InputLabelProps={{ shrink: true, required: false }} 
        required
      />

      <Typography variant="subtitle1">Loan Evaluation Report</Typography>
      <FormGroup>
        <TextField
          label="Credit Standing"
          value={creditStanding}
          onChange={(e) => setCreditStanding(e.target.value)}
          fullWidth
          sx={{ mb: 2, mt: 1 }}
          required
          InputLabelProps={{ required: false }} 
        />
        <TextField
          label="Repayment Capacity"
          value={repaymentCapacity}
          onChange={(e) => setRepaymentCapacity(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
          InputLabelProps={{ required: false }} 
        />
      </FormGroup>

    <FormGroup sx={{ mb: 2 }}>
  <Typography variant="subtitle1" sx={{ mb: 1 }}>Loan Approved</Typography>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
    <Checkbox
      checked={loanApproved === 'Yes'}
      onChange={() => setLoanApproved('Yes')}
      value="Yes"
      sx={{ p: 0, mr: 1 }}
    />
    <Typography variant="body1">Yes</Typography>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
    <Checkbox
      checked={loanApproved === 'No'}
      onChange={() => setLoanApproved('No')}
      value="No"
      sx={{ p: 0, mr: 1 }}
    />
    <Typography variant="body1">No</Typography>
  </div>
</FormGroup>

      <TextField
        label="Amount Approved (₱)"
        type="number"
        value={amountApproved}
        onChange={(e) => setAmountApproved(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputLabelProps={{ required: false }} 
      />
      <TextField
        label="Repayment Terms"
        value={repaymentTerms}
        onChange={(e) => setRepaymentTerms(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputLabelProps={{ required: false }} 
      />
      <TextField
        label="Interest Rate"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputLabelProps={{ required: false }} 
      />
      <TextField
        label="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputLabelProps={{ required: false }}
      />
      <TextField
        label="Loan Officer's Name"
        value={loanOfficerName}
        onChange={(e) => setLoanOfficerName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
        InputLabelProps={{ required: false }} 
      />

      {/* Signature Upload as TextField + Upload Button */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          label="Loan Officer's Signature"
          value={officerSignatureFile ? officerSignatureFile.name : ''}
          placeholder="Upload signature file"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          required
          InputLabelProps={{ required: false }} 
        />
        <Button
          variant="outlined"
          component="label"
        >
          Upload
          <input
            type="file"
            hidden
            accept="image/*,.pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setOfficerSignatureFile(e.target.files[0]);
              } else {
                setOfficerSignatureFile(null);
              }
            }}
          />
        </Button>
      </Stack>

      <TextField
        label="Date"
        type="date"
        value={officerSignatureDate}
        onChange={(e) => setOfficerSignatureDate(e.target.value)}
        InputLabelProps={{ shrink: true, required: false }} 
        fullWidth
        sx={{ mb: 2 }}
        required
      />

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button
          variant="contained"
          onClick={() => alert('Form Submitted!')}
          disabled={!isCooperativeSectionValid()}
        >
          Submit
        </Button>
      </Stack>

      {/* Page number footer */}
      <Typography align="center" sx={{ mt: 2, fontWeight: 'light' }}>
        Page {pageNumber[currentPage]} of 6
      </Typography>
    </>
  );


      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {renderPage()}
      </Paper>
    </Container>
  );
};

export default LoanApplicationForm;
