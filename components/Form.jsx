'use client'
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Stack, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function LoanApplicationForm() {
 
  const [currentPage, setCurrentPage] = useState("personalInfo");

  const handleNextPage = () => {
    if (currentPage === "personalInfo") setCurrentPage("loanDetails");
    else if (currentPage === "loanDetails") setCurrentPage("loanSecurity");
    else if (currentPage === "loanSecurity") setCurrentPage("references");
    else if (currentPage === "references") setCurrentPage("declaration");
    else if (currentPage === "declaration") setCurrentPage("cooperative");
  };

  const handleBackPage = () => {
    if (currentPage === "loanDetails") setCurrentPage("personalInfo");
    else if (currentPage === "loanSecurity") setCurrentPage("loanDetails");
    else if (currentPage === "references") setCurrentPage("loanSecurity");
    else if (currentPage === "declaration") setCurrentPage("references");
    else if (currentPage === "cooperative") setCurrentPage("declaration");
  };
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [otherPeriod, setOtherPeriod] = useState('');
  const [paymentMode, setPaymentMode] = useState(''); 
  const [otherPaymentMode, setOtherPaymentMode] = useState(''); 
  const [selectedCollateral, setSelectedCollateral] = useState(''); 
  const [otherCollateral, setOtherCollateral] = useState(''); 
  const [loanApproved, setLoanApproved] = useState('');   

    const handleStatusChange = (event) => {
      const value = event.target.value;
      setSelectedStatus(value); 
    };
    const handleTypeChange = (event) => {
      const value = event.target.value;
      setSelectedType(value); 
    };
  
  const handleRepaymentPeriodChange = (event) => {
    setRepaymentPeriod(event.target.value);
  };

  const handleOtherPeriodChange = (event) => {
    setOtherPeriod(event.target.value);
  };

  const handlePaymentModeChange = (event) => {
    const value = event.target.value;
    
    if (value === 'Other') {
      setPaymentMode(value); 
    } else {
      setPaymentMode(value); 
    }
  };
  const handleOtherPaymentModeChange = (event) => {
    setOtherPaymentMode(event.target.value); 
  };
  
  const handleCollateralChange = (event) => {
    const value = event.target.value;

    if (value === 'Others') {
      setSelectedCollateral(value); 
    } else {
      setSelectedCollateral(value); 
    }
  };

  const handleOtherCollateralChange = (event) => {
    setOtherCollateral(event.target.value); 
  };
  
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    
    if (loanApproved === value) {
      setLoanApproved(''); 
    } else {
      setLoanApproved(value); 
    }
  };


  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <center><Typography variant="h5" gutterBottom>Loan Application Form</Typography></center>

        {currentPage === 'personalInfo' && (
          <>
            <Typography variant="h6">I. Personal Information</Typography>
            <Stack spacing={2}>
              <TextField label="Name of Borrower" fullWidth />
              <TextField label="Membership ID Number" fullWidth />
              <Stack direction="row" spacing={2}>
                <TextField label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                <TextField label="Age" type="number" fullWidth />
              </Stack>
              <FormGroup>
      <Typography variant="subtitle1">Civil Status</Typography>
      {['Single', 'Married', 'Widow/er', 'Others'].map((status) => (
        <FormControlLabel
          key={status}
          control={
            <Checkbox
              value={status}
              checked={selectedStatus === status}  
              onChange={handleStatusChange}
              color="primary"
            />
          }
          label={status}
        />
      ))}
      {selectedStatus === 'Others' && (
        <TextField label="If others, specify"  size="small" />
        
      )}
    </FormGroup>
              <TextField label="Address" fullWidth />
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

{currentPage === 'loanDetails' && (
  <>
    <Typography variant="h6">II. Loan Details</Typography>
    
    <FormGroup>
      <Typography>Type of Loan</Typography>
     

{['Emergency Loan', 'Personal Loan', 'Business Loan', 'Educational Loan', 'Housing Loan', 'Others'].map((status) => (
        <FormControlLabel
          key={status}
          control={
            <Checkbox
              value={status}
              checked={selectedType === status}  
              onChange={handleTypeChange}
              color="primary"
            />
          }
          label={status}
        />
      ))}
      {selectedType === 'Others' && (
        <TextField label="If other, specify"  size="small" sx={{mb:2}}/>
        
      )}

      <TextField label="Loan Amount Requested (₱)" type="number" fullWidth sx={{ mb: 2 }} />
      <TextField label="Purpose of Loan" fullWidth sx={{ mb: 2 }} />
     
      <FormGroup>
      <Typography variant="subtitle1">Repayment Period</Typography>

      {/* Checkboxes for repayment periods */}
      {['3 months', '6 months', '1 year', 'Other'].map((period) => (
        <FormControlLabel
          key={period}
          control={
            <Checkbox
              checked={repaymentPeriod === period} // Only the selected checkbox will be checked
              onChange={handleRepaymentPeriodChange}
              value={period}
            />
          }
          label={period}
        />
      ))}

      {/* Show text field only if 'Other' is selected */}
      {repaymentPeriod === 'Other' && (
        <TextField
          label="If other, specify"
          fullWidth
          value={otherPeriod}
          onChange={handleOtherPeriodChange}
          sx={{ mb: 2 }}
          size="small"
        />
      )}

      <Stack direction="row" spacing={2} justifyContent="space-between">
      </Stack>
    </FormGroup>
    <FormGroup>
      <Typography variant="subtitle1">Preferred Payment Mode</Typography>

      {/* Checkboxes for payment modes */}
      {['Monthly', 'Bi-weekly', 'Lump Sum', 'Other'].map((mode) => (
        <FormControlLabel
          key={mode}
          control={
            <Checkbox
              checked={paymentMode === mode} // Only the selected checkbox will be checked
              onChange={handlePaymentModeChange}
              value={mode}
            />
          }
          label={mode}
        />
      ))}

      {/* Show text field only if 'Other' is selected */}
      {paymentMode === 'Other' && (
        <TextField
          label="If other, specify"
          fullWidth
          value={otherPaymentMode}
          onChange={handleOtherPaymentModeChange}
          sx={{ mb: 2 }}
          size="small"
        />
      )}
     
    </FormGroup>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
      </Stack>
    </FormGroup>
  </>
)}

{currentPage === 'loanSecurity' && (
  <>
    <Typography variant="h6">III. Loan Security</Typography>
    <FormGroup>
      <Typography>Type of Collateral</Typography>
      {/* Checkboxes for collateral types */}
      {['Real Property', 'Vehicle', 'Appliances', 'Others'].map((collateral) => (
        <FormControlLabel
          key={collateral}
          control={
            <Checkbox
              checked={selectedCollateral === collateral} // Only the selected checkbox will be checked
              onChange={handleCollateralChange}
              value={collateral}
            />
          }
          label={collateral}
        />
      ))}

      {/* Show text field only if 'Others' is selected */}
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
      <TextField label="Estimated Value of Collateral (₱)" type="number" fullWidth sx={{ mb: 2 }} />
      <TextField label="Guarantor Name (if applicable)" fullWidth sx={{ mb: 2 }} />
      <TextField label="Guarantor Contact Number" fullWidth sx={{ mb: 2 }} />
      <TextField label="Guarantor Relationship to Borrower" fullWidth sx={{ mb: 2 }} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
      </Stack>
    </FormGroup>
  </>
)}

{currentPage === 'references' && (
  <>
    <Typography variant="h6" sx={{mb:2}}>IV. References</Typography>
    <FormGroup>
      <Typography>Reference 1</Typography>
      <TextField label="Name" fullWidth sx={{ mb: 2, mt:2 }} />
      <TextField label="Address" fullWidth sx={{ mb: 2 }} />
      <TextField label="Contact Number" fullWidth sx={{ mb: 2 }} />
      <TextField label="Relationship" fullWidth sx={{ mb: 2 }} />
      <Typography sx={{mt:2}}>Reference 2</Typography>
      <TextField label="Name" fullWidth sx={{ mb: 2, mt:2 }} />
      <TextField label="Address" fullWidth sx={{ mb: 2 }} />
      <TextField label="Contact Number" fullWidth sx={{ mb: 2 }} />
      <TextField label="Relationship" fullWidth sx={{ mb: 2 }} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={handleBackPage}>Back</Button>
        <Button variant="contained" onClick={handleNextPage}>Next</Button>
      </Stack>
    </FormGroup>
  </>
)}

{currentPage === 'declaration' && (
  <>
  <Stack spacing={2}>
    <Typography variant="h6">V. Declaration of Borrower</Typography>
    <Typography>
      I, the undersigned, hereby apply for a loan from the Biliran Province Life Care Ministry Cooperative. I certify that the information provided in this application is true and correct to the best of my knowledge. I agree to abide by the cooperative's loan policies and to repay the loan as per the agreed terms.
    </Typography>
    <TextField
    
        type="file"
        label="Borrower's Signature"
        fullWidth
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        sx={{ mb: 2 }} 
      />
    <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 2 }} />
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button onClick={handleBackPage}>Back</Button>
      <Button variant="contained" onClick={handleNextPage}>Next</Button>
    </Stack>
    </Stack>
  </>
)}

{currentPage === 'cooperative' && (
  <>
    <Typography variant="h6">VI. For Cooperative Use Only</Typography>
    <TextField 
  label="Date of Application Received" 
  type="date" 
  fullWidth 
  sx={{ mb: 2, mt:2 }} 
  InputLabelProps={{ shrink: true }}  
/>

    <Typography variant="subtitle1">Loan Evaluation Report</Typography>
    <FormGroup>
      <TextField label="Credit Standing" fullWidth sx={{ mb: 2, mt:1 }} />
      <TextField label="Repayment Capacity" fullWidth sx={{ mb: 2 }} />
    </FormGroup>
    <FormGroup>
    <Typography variant="subtitle1">Loan Approved</Typography>

{/* Checkboxes for Loan Approved (Yes or No) */}
<FormControlLabel
  control={
    <Checkbox
      checked={loanApproved === 'Yes'}
      onChange={handleCheckboxChange}
      value="Yes"
    />
  }
  label="Yes"
/>
<FormControlLabel
  control={
    <Checkbox
      checked={loanApproved === 'No'}
      onChange={handleCheckboxChange}
      value="No"
    />
  }
  label="No"
/>

    </FormGroup>
    <TextField label="Amount Approved (₱)" type="number" fullWidth sx={{ mb: 2 }} />
    <TextField label="Repayment Terms" fullWidth sx={{ mb: 2 }} />
    <TextField label="Interest Rate" fullWidth sx={{ mb: 2 }} />
    <TextField label="Remarks" fullWidth sx={{ mb: 2 }} />
    <TextField label="Loan Officer's Name" fullWidth sx={{ mb: 2 }} />
    <TextField label="Loan Officer's Signature" type="file" fullWidth sx={{ mb: 2 }}   InputLabelProps={{ shrink: true }}  />
    <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth sx={{ mb: 2 }} />
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button onClick={handleBackPage}>Back</Button>
      <Button variant="contained" onClick={() => alert('Form Submitted!')}>Submit</Button>
    </Stack>
  </>
)}

      </Paper>
    </Container>
  );
};


