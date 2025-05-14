'use client';

import { useEffect, useState } from 'react';

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
    <div>
      <h1>Submitted Data</h1>

      {data.length > 0 ? (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.name}</td>
                  <td>{entry.age}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button 
            onClick={handleReset} 
            style={{ marginTop: '16px', backgroundColor: 'red', color: 'white' }}
          >
            Reset Table
          </button>
        </>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
}
