'use client'
import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Stack, Button, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

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

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
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
                  <FormControlLabel key={status} control={<Checkbox />} label={status} />
                ))}
                <TextField label="If others, specify" fullWidth />
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
              {['Emergency Loan', 'Personal Loan', 'Business Loan', 'Educational Loan', 'Housing Loan', 'Others'].map((loan) => (
                <FormControlLabel key={loan} control={<Checkbox />} label={loan} />
              ))}
              <TextField label="Loan Amount Requested (₱)" type="number" fullWidth />
              <TextField label="Purpose of Loan" fullWidth />
              <FormGroup>
                <Typography variant="subtitle1">Repayment Period</Typography>
                {['3 months', '6 months', '1 year', 'Other'].map((period) => (
                  <FormControlLabel key={period} control={<Checkbox />} label={period} />
                ))}
                <TextField label="If other, specify" fullWidth />
              </FormGroup>
              <FormGroup>
                <Typography variant="subtitle1">Preferred Payment Mode</Typography>
                {['Monthly', 'Bi-weekly', 'Lump Sum', 'Other'].map((mode) => (
                  <FormControlLabel key={mode} control={<Checkbox />} label={mode} />
                ))}
                <TextField label="If other, specify" fullWidth />
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
              {['Real Property', 'Vehicle', 'Appliances', 'Others'].map((collateral) => (
                <FormControlLabel key={collateral} control={<Checkbox />} label={collateral} />
              ))}
              <TextField label="Estimated Value of Collateral (₱)" type="number" fullWidth />
              <TextField label="Guarantor Name (if applicable)" fullWidth />
              <TextField label="Guarantor Contact Number" fullWidth />
              <TextField label="Guarantor Relationship to Borrower" fullWidth />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button onClick={handleBackPage}>Back</Button>
                <Button variant="contained" onClick={handleNextPage}>Next</Button>
              </Stack>
            </FormGroup>
          </>
        )}

        {currentPage === 'references' && (
          <>
            <Typography variant="h6">IV. References</Typography>
            <FormGroup>
              <Typography>Reference 1</Typography>
              <TextField label="Name" fullWidth />
              <TextField label="Address" fullWidth />
              <TextField label="Contact Number" fullWidth />
              <TextField label="Relationship" fullWidth />
              <Typography>Reference 2</Typography>
              <TextField label="Name" fullWidth />
              <TextField label="Address" fullWidth />
              <TextField label="Contact Number" fullWidth />
              <TextField label="Relationship" fullWidth />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button onClick={handleBackPage}>Back</Button>
                <Button variant="contained" onClick={handleNextPage}>Next</Button>
              </Stack>
            </FormGroup>
          </>
        )}

        {currentPage === 'declaration' && (
          <>
            <Typography variant="h6">V. Declaration of Borrower</Typography>
            <Typography>
              I, the undersigned, hereby apply for a loan from the Biliran Province Life Care Ministry Cooperative. I certify that the information provided in this application is true and correct to the best of my knowledge. I agree to abide by the cooperative's loan policies and to repay the loan as per the agreed terms.
            </Typography>
            <TextField label="Borrower's Signature" type="file" fullWidth />
            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button onClick={handleBackPage}>Back</Button>
              <Button variant="contained" onClick={handleNextPage}>Next</Button>
            </Stack>
          </>
        )}

        {currentPage === 'cooperative' && (
          <>
            <Typography variant="h6">VI. For Cooperative Use Only</Typography>
            <TextField label="Date of Application Received" type="date" fullWidth />
            <Typography variant="subtitle1">Loan Evaluation Report</Typography>
            <FormGroup>
              <TextField label="Credit Standing" fullWidth />
              <TextField label="Repayment Capacity" fullWidth />
            </FormGroup>
            <FormGroup>
              <Typography variant="subtitle1">Loan Approved</Typography>
              <FormControlLabel control={<Checkbox />} label="Yes" />
              <FormControlLabel control={<Checkbox />} label="No" />
            </FormGroup>
            <TextField label="Amount Approved (₱)" type="number" fullWidth />
            <TextField label="Repayment Terms" fullWidth />
            <TextField label="Interest Rate" fullWidth />
            <TextField label="Remarks" fullWidth />
            <TextField label="Loan Officer's Name" fullWidth />
            <TextField label="Loan Officer's Signature" type="file" fullWidth />
            <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
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


