import React from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoanApplications from "./components/LoanApplications";
import MembershipApplications from "./components/MembershipApplications";

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          <ListItem button>
            <ListItemText primary="Loan Applications" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Membership Applications" />
          </ListItem>
        </List>
      </Drawer>

      <main style={{ marginLeft: 240, marginTop: 64 }}>
        <Container>
          <Routes>
            <Route path="/loan-applications" element={<LoanApplications />} />
            <Route path="/membership-applications" element={<MembershipApplications />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
