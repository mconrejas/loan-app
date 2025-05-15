'use client';

import { useState } from 'react';

export default function FormPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');  // New state for Address

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = { name, age, address };  // Include address in the new entry
    const existing = JSON.parse(localStorage.getItem('formData') || '[]');
    const updated = [...existing, newEntry];
    localStorage.setItem('formData', JSON.stringify(updated));

    setName('');
    setAge('');
    setAddress('');  // Reset address field after submission
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Submit Data</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}>
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <input 
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <input 
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button type="submit" style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Submit
        </button>
      </form>

      <p style={{ marginTop: '20px', color: '#333' }}>
        ✅ Data saved locally. Go to <a href="/table" style={{ color: '#007BFF', textDecoration: 'none' }}>Table Page</a> to view.
      </p>
    </div>
  );
}
