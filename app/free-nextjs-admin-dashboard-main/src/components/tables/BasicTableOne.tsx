'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Modal, Box, Typography, TextField, MenuItem, Select,
  InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, SelectChangeEvent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface User {
  name: string;
  dob: string;
  age: string;
  address: string;
  gender: string;
  civilStatus: string;
  contact: string;
  email: string;
  occupation: string;
  employer: string;
  status: string;

  isResident: string;
  membershipStatus: string;
  membershipPeriod: string; // empty string if not applicable
  purposeOfJoining: string;
}


const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#1e1e1e',
  color: '#fff',
  border: '2px solid #444',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  width: 400,
};

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const civilStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];

function formatDateToMDY(dateString: string): string {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default function TablePage() {
  const [data, setData] = useState<User[]>([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewPage, setViewPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editPage, setEditPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
const [editForm, setEditForm] = useState<User>({
  name: '',
  dob: '',
  age: '',
  address: '',
  gender: '',
  civilStatus: '',
  contact: '',
  email: '',
  occupation: '',
  employer: '',
  status: 'Pending',

  isResident: '',
  membershipStatus: '',
  membershipPeriod: '',
  purposeOfJoining: '',
});

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDeleteIdx, setUserToDeleteIdx] = useState<number | null>(null);

  useEffect(() => {
  const stored = localStorage.getItem('formData');
  if (stored) setData(JSON.parse(stored));
}, []);





  const handleReset = () => {
    localStorage.removeItem('formData');
    setData([]);
  };

  // === View More Modal Handlers ===
  const handleOpenViewModal = (user: User) => {
    setSelectedUser(user);
    setViewPage(1);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = (_event: unknown, reason?: string) => {
    if (reason === 'backdropClick') return;
    setOpenViewModal(false);
    setSelectedUser(null);
    setViewPage(1);
  };

  // === Approve / Delete handlers ===
 const handleApprove = (idx: number) => {
  if (window.confirm("Are you sure you want to approve this user?")) {
    const updated = [...data];
    updated[idx].status = 'Approved';
    updateLocalStorage(updated);
  }
};


  const handleOpenDeleteDialog = (idx: number) => {
    setUserToDeleteIdx(idx);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    if (userToDeleteIdx !== null) {
      const updated = [...data];
      updated.splice(userToDeleteIdx, 1);
      updateLocalStorage(updated);
      setUserToDeleteIdx(null);
      setOpenDeleteDialog(false);
    }
  };

  // === Edit Modal Handlers ===
  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setEditForm({ ...user });
    setEditPage(1);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = (_event: unknown, reason?: string) => {
    if (reason === 'backdropClick') return;
    setOpenEditModal(false);
    setSelectedUser(null);
    setEditPage(1);
  };

const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
) => {
  const { name, value } = e.target;
  const updatedForm = { ...editForm, [name]: value };
  setEditForm(updatedForm);
};


const handleUpdate = () => {
  if (!selectedUser) return;
  const updatedData = data.map(entry => (entry === selectedUser ? { ...editForm } : entry));
  updateLocalStorage(updatedData);
  setOpenEditModal(false);
  setSelectedUser(null);
  setEditPage(1);
};

  
const updateLocalStorage = (updatedData: User[]) => {
  setData(updatedData);
  localStorage.setItem('formData', JSON.stringify(updatedData));
};




  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      {data.length > 0 ? (
        <>
          <TableContainer component={Paper} style={{ margin: '0 auto', maxWidth: '1000px' }}>
            <Table aria-label="submitted data table">
              <TableHead style={{ backgroundColor: '#007BFF' }}>
                <TableRow>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Full Name</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Date of Birth</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>View</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, idx) => (
                  <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{formatDateToMDY(entry.dob)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleOpenViewModal(entry)}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        sx={{
                          borderRadius: '50px',
                          py: 0.3,
                          fontSize: '0.75rem',
                          minWidth: 'auto',
                          width: 'fit-content',
                          textTransform: 'none',
                        }}
                      >
                        View More
                      </Button>
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold', color: entry.status === 'Approved' ? 'green' : '#d9534f' }}>
                      {entry.status}
                    </TableCell>
                    <TableCell sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        onClick={() => handleApprove(idx)}
                        variant={entry.status === 'Approved' ? 'contained' : 'outlined'}
                        color="success"
                        size="small"
                        disabled={entry.status === 'Approved'}
                        sx={{ borderRadius: '50px', px: 1, py: 0.5, fontSize: '0.75rem' }}
                      >
                        {entry.status === 'Approved' ? 'Approved' : 'Approve'}
                      </Button>

                      <Button
                        onClick={() => handleOpenEditModal(entry)}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: '50px',
                          py: 0.3,
                          fontSize: '0.7rem',
                          minWidth: 'auto',
                          width: 'fit-content',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          textTransform: 'none',
                        }}
                      >
                        <EditIcon fontSize="small" /> EDIT
                      </Button>

                      <Button
                        onClick={() => handleOpenDeleteDialog(idx)}
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          borderRadius: '50px',
                          px: 1.5,
                          py: 0.3,
                          fontSize: '0.7rem',
                          minWidth: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <DeleteIcon fontSize="small" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReset}
              sx={{
                textTransform: 'none',
                borderRadius: '40px',
                fontSize: '0.7rem',
                padding: '6px 20px',
                width: 'fit-content',
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              Reset All Data
            </Button>
          </div>

          {/* ==================== VIEW MORE MODAL (2 PAGES) ==================== */}
         <Modal open={openViewModal} onClose={handleCloseViewModal}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      overflow: 'auto',
      p: 2,
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: '#2c2c2c',
        boxShadow: 24,
        padding: '24px',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#fff',
      }}
    >
      <IconButton
        onClick={handleCloseViewModal}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: '#fff',
          backgroundColor: 'transparent',
          padding: '6px',
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        User Details (Page {viewPage} of 2)
      </Typography>

      {selectedUser && (
        <>
          {viewPage === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>Name: {selectedUser.name}</Typography>
              <Typography>DOB: {formatDateToMDY(selectedUser.dob)}</Typography>
              <Typography>Age: {selectedUser.age}</Typography>
              <Typography>Address: {selectedUser.address}</Typography>
              <Typography>Contact: {selectedUser.contact}</Typography>
              <Typography>Gender: {selectedUser.gender}</Typography>
              <Typography>Civil Status: {selectedUser.civilStatus}</Typography>
            </Box>
          )}

          {viewPage === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Occupation: {selectedUser.occupation}</Typography>
              <Typography>Employer: {selectedUser.employer}</Typography>
              <Typography>Resident of Biliran Province: {selectedUser.isResident}</Typography>
              <Typography>Previously a member: {selectedUser.membershipStatus}</Typography>
              {selectedUser.membershipStatus === 'Yes' && (
                <Typography>Membership Period: {selectedUser.membershipPeriod}</Typography>
              )}
              <Typography>Purpose of Joining: {selectedUser.purposeOfJoining}</Typography>
               <Typography>Status: {selectedUser.status}</Typography>

            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        {viewPage === 2 && (
          <Button
            onClick={() => setViewPage(1)}
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: '4px', boxShadow: 'none' }}
          >
            Back
          </Button>
        )}
        {viewPage === 1 && (
          <Button
            onClick={() => setViewPage(2)}
            variant="contained"
            color="primary"
            sx={{ borderRadius: '4px', boxShadow: 'none', marginLeft: 'auto' }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  </Box>
</Modal>


          {/* ==================== EDIT MODAL (2 PAGES) ==================== */}
   <Modal open={openEditModal} onClose={handleCloseEditModal}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: '8px',
            backgroundColor: '#2c2c2c',
            boxShadow: 24,
            padding: '24px',
            color: '#fff',
            overflowY: 'visible',
          }}
        >
          <IconButton
            onClick={handleCloseEditModal}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#fff',
              backgroundColor: 'transparent',
              padding: '6px',
            }}
            aria-label="close modal"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
            Edit User Details (Page {editPage} of 2)
          </Typography>

          {editPage === 1 && (
            <>
              <TextField
                label="Full Name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={editForm.dob}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
                InputProps={{ style: { color: '#fff' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={editForm.age}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Address"
                name="address"
                value={editForm.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                multiline
                rows={2}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Contact Number"
                name="contact"
                value={editForm.contact}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />

              <FormControl
                fullWidth
                margin="normal"
                variant="filled"
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: '#ccc' }}>Gender</InputLabel>
                <Select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleInputChange}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="filled"
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: '#ccc' }}>Civil Status</InputLabel>
                <Select
                  name="civilStatus"
                  value={editForm.civilStatus}
                  onChange={handleInputChange}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {editPage === 2 && (
            <>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={editForm.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Occupation"
                name="occupation"
                value={editForm.occupation}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
              <TextField
                label="Employer"
                name="employer"
                value={editForm.employer}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />

              <FormControl
                fullWidth
                margin="normal"
                variant="filled"
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: '#ccc' }}>Status</InputLabel>
                <Select
                  name="status"
                  value={editForm.status}
                  onChange={handleInputChange}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="filled"
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: '#ccc' }}>Is Resident</InputLabel>
                <Select
                  name="isResident"
                  value={editForm.isResident}
                  onChange={handleInputChange}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                variant="filled"
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              >
                <InputLabel sx={{ color: '#ccc' }}>Membership Status</InputLabel>
                <Select
                  name="membershipStatus"
                  value={editForm.membershipStatus}
                  onChange={handleInputChange}
                  sx={{ color: '#fff' }}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>

              {editForm.membershipStatus === 'Yes' && (
                <TextField
                  label="Membership Period"
                  name="membershipPeriod"
                  value={editForm.membershipPeriod}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="filled"
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
                />
              )}

              <TextField
                label="Purpose of Joining"
                name="purposeOfJoining"
                value={editForm.purposeOfJoining}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
                sx={{ bgcolor: '#3a3a3a', borderRadius: '4px' }}
              />
            </>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            {editPage === 2 && (
              <Button
                onClick={() => setEditPage(1)}
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: '4px', boxShadow: 'none' }}
              >
                Back
              </Button>
            )}
            {editPage === 1 && (
              <Button
                onClick={() => setEditPage(2)}
                variant="contained"
                color="primary"
                sx={{ borderRadius: '4px', boxShadow: 'none', marginLeft: 'auto' }}
              >
                Next
              </Button>
            )}

            {editPage === 2 && (
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="success"
                sx={{ borderRadius: '4px', boxShadow: 'none', marginLeft: 1 }}
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>

          {/* ==================== DELETE CONFIRMATION DIALOG ==================== */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this entry? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 10, color: '#666' }}>
          No submitted data found.
        </Typography>
      )}
    </div>
  );
}
