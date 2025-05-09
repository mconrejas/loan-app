'use client';
import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
  createTheme, ThemeProvider, InputAdornment, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Approved' },
    { id: 3, name: 'Sam Brown', email: 'sam@example.com', status: 'Pending' },
    { id: 4, name: 'Emily White', email: 'emily@example.com', status: 'Approved' },
    { id: 5, name: 'David Black', email: 'david@example.com', status: 'Pending' },
    { id: 6, name: 'Olivia Green', email: 'olivia@example.com', status: 'Pending' },
    { id: 7, name: 'Lucas Blue', email: 'lucas@example.com', status: 'Approved' },
    { id: 8, name: 'Ava Gray', email: 'ava@example.com', status: 'Pending' },
    { id: 9, name: 'Ethan Yellow', email: 'ethan@example.com', status: 'Approved' },
    { id: 10, name: 'Sophia Red', email: 'sophia@example.com', status: 'Pending' }
  ]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleSearchChange = (event) => setSearch(event.target.value);
  
  const handleApprove = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: 'Approved' } : user
    ));
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
    }
    setOpenDeleteDialog(false);
  };

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveChanges = () => {
    if (selectedUser) {
      setUsers(users.map(user =>
        user.id === selectedUser.id ? selectedUser : user
      ));
    }
    handleCloseModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUserInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      status: 'Pending',
    };
    setUsers([...users, newUserWithId]);
    setOpenAddUserModal(false);
    setNewUser({ name: '', email: '' });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#fff',
        secondary: '#ddd',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px', margin: 'auto', padding: 2 }}>
        <TableContainer component={Paper} sx={{ backgroundColor: '#333', boxShadow: 3, borderRadius: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 0 }}>
            <Toolbar>
              <IconButton color="inherit" edge="start">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                User Management
              </Typography>
            </Toolbar>
          </AppBar>

          <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <TextField
                label="Search Users"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                size="small"
                sx={{
                  width: '50%',
                  input: { color: '#fff' },
                  label: { color: '#bbb' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: '#bbb' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Table>
              <TableHead sx={{ backgroundColor: '#444' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}>Email</TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}></TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}>Status</TableCell>
                  <TableCell align="center" sx={{ color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#fff' }}>
                      No user found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#555' } }}>
                      <TableCell sx={{ color: '#fff' }}>{user.name}</TableCell>
                      <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{user.email}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          onClick={() => handleOpenViewModal(user)}
                          variant="outlined"
                          color="secondary"
                          size="small"
                          sx={{
                            padding: '3px 8px',
                            fontSize: '0.75rem',
                            borderRadius: '15px',
                          }}
                        >
                          View More
                        </Button>
                      </TableCell>
                      <TableCell sx={{ color: '#fff', fontWeight: user.status === 'Approved' ? 'bold' : 'normal', textAlign: 'center' }}>
                        {user.status}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          {user.status === 'Pending' ? (
                            <Button onClick={() => handleApprove(user.id)} variant="contained" color="primary" size="small" sx={{ padding: '3px 10px' }}>
                              Approve
                            </Button>
                          ) : (
                            <Button disabled variant="contained" color="success" size="small" sx={{ padding: '3px 10px' }}>
                              Approved
                            </Button>
                          )}
                          <Button
                            onClick={() => handleOpenEditModal(user)}
                            variant="outlined"
                            color="secondary"
                            size="small"
                            sx={{ padding: '3px 10px' }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenDeleteDialog(true);
                            }}
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ boxShadow: 3, padding: '3px 10px' }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Footer with Add User and Rows per page */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0.1 }}>
  {/* Add User Button */}
  <Typography
    variant="body2"
    sx={{
      cursor: 'pointer',
      color: 'white', // Lighter gray color
      fontFamily: "'Autobus', sans-serif",
      fontSize: '1rem', // Increase font size
      textDecoration: 'none', // Remove underline
      '&:hover': { color: '#d3d3d3' },
      marginLeft: 2,
    }}
    onClick={() => setOpenAddUserModal(true)}
  >
    Add User
  </Typography>

  {/* Rows per Page Pagination */}
  <TablePagination
    component="div"
    count={filteredUsers.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    sx={{ color: '#fff' }}
  />
</Box>


          </Box>
        </TableContainer>

        {/* Add User Modal */}
  <Dialog
  open={openAddUserModal}
  onClose={() => {} }  // Prevent closing when clicking outside (empty function)
  BackdropProps={{
    style: {
      backdropFilter: 'blur(1px)', // Apply blur effect to the background
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darken the background with some opacity
    },
  }}
  disableEscapeKeyDown // Prevent closing the modal with the ESC key
  onBackdropClick={(e) => e.stopPropagation()} // Prevent closing when clicking outside
>
  <DialogTitle>
    Add New User
  </DialogTitle>

  <DialogContent>
    <TextField
      label="Name"
      variant="outlined"
      name="name"
      value={newUser.name}
      onChange={handleAddUserInputChange}
      fullWidth
      sx={{ marginBottom: 2 }}
    />
    <TextField
      label="Email"
      variant="outlined"
      name="email"
      value={newUser.email}
      onChange={handleAddUserInputChange}
      fullWidth
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenAddUserModal(false)} color="primary">Cancel</Button>
    <Button onClick={handleAddUser} color="primary">Add</Button>
  </DialogActions>
</Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={(event, reason) => {
            if (reason === 'backdropClick') return;
          }}
          aria-labelledby="delete-confirmation-dialog"
          BackdropProps={{
            onClick: (event) => event.stopPropagation(),
          }}
        >
          <DialogTitle sx={{ color: '#fff' }}>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: '#fff' }}>
              Are you sure you want to delete this user? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* View/Edit User Modal */}
        <Dialog
          open={openModal}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') handleCloseModal();
          }}
          slotProps={{
            backdrop: {
              onClick: (event) => event.stopPropagation(),
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {isEditing ? 'Edit User' : 'View User'}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              sx={{
                padding: 0,
                backgroundColor: '#444',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                '&:hover': { backgroundColor: '#555' },
              }}
            >
              <CloseIcon sx={{ color: '#fff' }} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ paddingBottom: '40px' }}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={selectedUser?.name || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{
                marginBottom: 2,
                mt: 2,
                input: { color: '#fff' },
                label: { color: '#bbb' }
              }}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={selectedUser?.email || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{
                marginBottom: 2,
                input: { color: '#fff' },
                label: { color: '#bbb' }
              }}
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </DialogContent>

          <Box sx={{
            position: 'absolute',
            bottom: '14px',
            right: '16px',
            width: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            {isEditing && (
              <Button onClick={handleSaveChanges} color="primary" sx={{ padding: '5px 15px', fontSize: '0.8rem' }}>
                Update
              </Button>
            )}
          </Box>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default App;
