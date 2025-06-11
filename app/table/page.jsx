'use client';

import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const modalStyle = {
  position: 'absolute',
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

function formatDateToMDY(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return dateString; // return as is if invalid
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default function TablePage() {
  const [data, setData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
const [editForm, setEditForm] = useState({
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
});


  // Delete dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDeleteIdx, setUserToDeleteIdx] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const updated = parsed.map(entry => ({
        ...entry,
        status: entry.status || 'Pending',
        dob: formatDateToMDY(entry.dob),
      }));
      setData(updated);
    }
  }, []);

  const updateLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleReset = () => {
    localStorage.removeItem('formData');
    setData([]);
  };

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = (event, reason) => {
    if (reason === 'backdropClick') return;
    setOpenViewModal(false);
    setSelectedUser(null);
  };

  const handleApprove = (idx) => {
    const updatedData = [...data];
    updatedData[idx].status = 'Approved';
    updateLocalStorage(updatedData);
  };

  // Open delete dialog and set user index to delete
  const handleOpenDeleteDialog = (idx) => {
    setUserToDeleteIdx(idx);
    setOpenDeleteDialog(true);
  };

  // Confirm deletion handler
  const handleDelete = () => {
    if (userToDeleteIdx !== null) {
      const updatedData = [...data];
      updatedData.splice(userToDeleteIdx, 1);
      updateLocalStorage(updatedData);
      setOpenDeleteDialog(false);
      setUserToDeleteIdx(null);
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
  setEditForm({
  name: user.name || '',
  dob: user.dob || '',
  age: user.age || '',
  address: user.address || '',
  gender: user.gender || '',
  civilStatus: user.civilStatus || '',
  contact: user.contact || '',
  email: user.email || '',
  occupation: user.occupation || '',
  employer: user.employer || '',
  status: user.status || 'Pending',
});

    setOpenEditModal(true);
  };

  const handleCloseEditModal = (event, reason) => {
    if (reason === 'backdropClick') return;
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedData = data.map(entry => {
      if (entry === selectedUser) {
        return { ...editForm };
      }
      return entry;
    });
    updateLocalStorage(updatedData);
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    const parsed = JSON.parse(savedData);
    setData(parsed); // No conversion to MM/DD/YYYY here
  }
}, []);

const formatDateToMDY = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
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
                  <TableCell align="center" style={{ verticalAlign: 'middle', color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
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
                        sx={{ fontSize: '0.75rem', borderRadius: '15px' }}
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
                        sx={{
                          fontSize: '0.75rem',
                          borderRadius: '15px',
                          width: 80,
                          minWidth: 80,
                          padding: '4px 0',
                        }}
                      >
                        {entry.status === 'Approved' ? 'Approved' : 'Approve'}
                      </Button>
                      <Button
                        onClick={() => handleOpenEditModal(entry)}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          borderRadius: '15px',
                          width: 80,
                          minWidth: 80,
                          padding: '4px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleOpenDeleteDialog(idx)}
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          fontSize: '0.75rem',
                          borderRadius: '15px',
                          width: 80,
                          minWidth: 80,
                          padding: '4px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              onClick={handleReset}
              variant="contained"
              color="error"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                textTransform: 'none',
              }}
            >
              Reset Table
            </Button>
          </div>

          {/* View Modal */}
          <Modal open={openViewModal} onClose={handleCloseViewModal}>
            <Box sx={{ ...modalStyle, position: 'relative' }}>
              <IconButton
                onClick={handleCloseViewModal}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 40,
                  height: 40,
                  color: '#fff',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" component="h2" gutterBottom>
                User Details
              </Typography>
    {selectedUser && (
  <>
    <Typography><strong>Full Name:</strong> {selectedUser.name}</Typography>
    <Typography><strong>Date of Birth:</strong> {formatDateToMDY(selectedUser.dob)}</Typography>
    <Typography><strong>Age:</strong> {selectedUser.age}</Typography>
    <Typography><strong>Address:</strong> {selectedUser.address}</Typography>
    <Typography><strong>Gender:</strong> {selectedUser.gender || 'N/A'}</Typography>
    <Typography><strong>Civil Status:</strong> {selectedUser.civilStatus || 'N/A'}</Typography>
    <Typography><strong>Contact Number:</strong> {selectedUser.contact || 'N/A'}</Typography>
    <Typography><strong>Email Address:</strong> {selectedUser.email || 'N/A'}</Typography>
    <Typography><strong>Occupation:</strong> {selectedUser.occupation || 'N/A'}</Typography>
    <Typography><strong>Employer/Business Name:</strong> {selectedUser.employer || 'N/A'}</Typography>
  </>
)}
      </Box>
          </Modal>

          {/* Edit Modal */}
          <Modal open={openEditModal} onClose={handleCloseEditModal}>
            <Box sx={{ ...modalStyle, position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <IconButton
                onClick={handleCloseEditModal}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 40,
                  height: 40,
                  color: '#fff',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" component="h2" gutterBottom>
                Edit User Details
              </Typography>

              <TextField
                label="Full Name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                fullWidth
                size="small"
              />

              <TextField
                label="Date of Birth (MM/DD/YYYY)"
                name="dob"
                value={editForm.dob}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                fullWidth
                size="small"
                placeholder="MM/DD/YYYY"
              />

              <TextField
                label="Age"
                name="age"
                value={editForm.age}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                fullWidth
                size="small"
              />

              <TextField
                label="Address"
                name="address"
                value={editForm.address}
                onChange={handleInputChange}
                variant="filled"
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                fullWidth
                size="small"
              />

              {/* Gender Select */}
              <FormControl fullWidth variant="filled" size="small" sx={{ color: '#fff' }}>
                <InputLabel sx={{ color: '#aaa' }}>Gender</InputLabel>
                <Select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleInputChange}
                  sx={{
                    color: '#fff',
                    '.MuiSvgIcon-root': { color: '#fff' },
                    '& .MuiFilledInput-input': { color: '#fff' },
                    '& .MuiInputLabel-root': { color: '#aaa' },
                  }}
                  label="Gender"
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Civil Status Select */}
              <FormControl fullWidth variant="filled" size="small" sx={{ color: '#fff' }}>
                <InputLabel sx={{ color: '#aaa' }}>Civil Status</InputLabel>
                <Select
                  name="civilStatus"
                  value={editForm.civilStatus}
                  onChange={handleInputChange}
                  sx={{
                    color: '#fff',
                    '.MuiSvgIcon-root': { color: '#fff' },
                    '& .MuiFilledInput-input': { color: '#fff' },
                    '& .MuiInputLabel-root': { color: '#aaa' },
                  }}
                  label="Civil Status"
                >
                  {civilStatusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
<TextField
  label="Contact Number"
  name="contact"
  value={editForm.contact}
  onChange={handleInputChange}
  variant="filled"
  InputProps={{ style: { color: '#fff' } }}
  InputLabelProps={{ style: { color: '#aaa' } }}
  fullWidth
  size="small"
/>

<TextField
  label="Email Address"
  name="email"
  value={editForm.email}
  onChange={handleInputChange}
  variant="filled"
  InputProps={{ style: { color: '#fff' } }}
  InputLabelProps={{ style: { color: '#aaa' } }}
  fullWidth
  size="small"
/>

<TextField
  label="Occupation"
  name="occupation"
  value={editForm.occupation}
  onChange={handleInputChange}
  variant="filled"
  InputProps={{ style: { color: '#fff' } }}
  InputLabelProps={{ style: { color: '#aaa' } }}
  fullWidth
  size="small"
/>

<TextField
  label="Employer/Business Name"
  name="employer"
  value={editForm.employer}
  onChange={handleInputChange}
  variant="filled"
  InputProps={{ style: { color: '#fff' } }}
  InputLabelProps={{ style: { color: '#aaa' } }}
  fullWidth
  size="small"
/>


              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
                sx={{ alignSelf: 'flex-end', borderRadius: '15px' }}
              >
                Update
              </Button>
            </Box>
          </Modal>

          {/* Delete Confirmation Dialog */}
        <Dialog
  open={openDeleteDialog}
  onClose={(event, reason) => {
    if (reason === 'backdropClick') return;
    setOpenDeleteDialog(false);
    setUserToDeleteIdx(null);
  }}
  aria-labelledby="delete-confirmation-dialog"
  BackdropProps={{
    onClick: (event) => event.stopPropagation(),
  }}
  PaperProps={{
    sx: {
      bgcolor: '#1e1e1e',
      color: '#fff',
      border: '2px solid #444',
      borderRadius: '10px',
      minWidth: 360,
    },
  }}
>
  <DialogTitle sx={{ color: '#fff', m: 0, p: 2 }}>
    Confirm Deletion
 
  </DialogTitle>
  <DialogContent>
    <Typography sx={{ color: '#fff' }}>
      Are you sure you want to delete this user? This action cannot be undone.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button
      onClick={() => {
        setOpenDeleteDialog(false);
        setUserToDeleteIdx(null);
      }}
      sx={{ color: '#2196f3' }} // blue color for Cancel
    >
      Cancel
    </Button>
    <Button onClick={handleDelete} color="error" autoFocus>
      Delete
    </Button>
  </DialogActions>
</Dialog>

        </>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No data submitted yet.
        </p>
      )}
    </div>
  );
}
