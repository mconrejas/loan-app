'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem('formData');
    setData([]);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Submitted Data</h1>

      {data.length > 0 ? (
        <>
          <TableContainer component={Paper} style={{ margin: '0 auto', maxWidth: '800px' }}>
            <Table aria-label="submitted data table">
              <TableHead style={{ backgroundColor: '#007BFF' }}>
                <TableRow>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, idx) => (
                  <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.age}</TableCell>
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
        </>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No data submitted yet.
        </p>
      )}
    </div>
  );
}
