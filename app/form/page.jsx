'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to table page with data in query params
    router.push(`/table?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}`);
  };

  return (
    <div>
      <h1>Form Page</h1>
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
    </div>
  );
}
