'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function TablePage() {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]); 

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

  const handleViewMore = (idx) => {
    setExpandedRows((prevExpandedRows) => {
      
      if (prevExpandedRows.includes(idx)) {
        return prevExpandedRows.filter((i) => i !== idx); 
      } else {
        return [...prevExpandedRows, idx]; 
      }
    });
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
                  <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, idx) => (
                  <TableRow key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.age}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewMore(idx)}
                        variant="outlined"
                        color="primary"
                        style={{
                          padding: '5px 10px',
                          fontSize: '14px',
                          textTransform: 'none',
                        }}
                      >
                        {expandedRows.includes(idx) ? 'Show Less' : 'View More'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Show additional details when a row is expanded */}
                {expandedRows.map((idx) => (
                  <TableRow key={`expanded-${idx}`}>
                    <TableCell colSpan={3} style={{ backgroundColor: '#f0f0f0', paddingLeft: '40px' }}>
                      <p><strong>Name:</strong> {data[idx].name}</p>
                      <p><strong>Age:</strong> {data[idx].age}</p>
                      <p><strong>Address:</strong> {data[idx].address}</p> {/* Show address */}
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
        </>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No data submitted yet.
        </p>
      )}
    </div>
  );
}
