'use client';

import { useState, useEffect } from 'react';

export default function FormPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = { name, age };

    const existing = JSON.parse(localStorage.getItem('formData') || '[]');

    const updated = [...existing, newEntry];

    localStorage.setItem('formData', JSON.stringify(updated));

    setName('');
    setAge('');
  };

  return (
    <div>
      <h1>Submit Data</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <p style={{ marginTop: '20px' }}>
        ✅ Data saved locally. Go to <a href="/table">Table Page</a> to view.
      </p>
    </div>
  );
}
