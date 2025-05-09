import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const LoanApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications from API or mock data
    const mockData = [
      { id: 1, name: "John Doe", status: "Pending", amount: "$5000", details: "..." },
      { id: 2, name: "Jane Smith", status: "Approved", amount: "$2000", details: "..." },
    ];
    setApplications(mockData);
  }, []);

  const approveApplication = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Approved" } : app
      )
    );
  };

  const rejectApplication = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Loan Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.amount}</TableCell>
              <TableCell>
                <Button onClick={() => approveApplication(app.id)} variant="contained" color="primary">Approve</Button>
                <Button onClick={() => rejectApplication(app.id)} variant="contained" color="secondary">Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoanApplications;
