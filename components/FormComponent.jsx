'use client';

import { useState } from 'react';

export default function FormComponent({ onSubmit }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age });
    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
