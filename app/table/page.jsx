'use client';

import { useSearchParams } from 'next/navigation';

export default function TablePage() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const age = searchParams.get('age');

  return (
    <div>
      <h1>Table Page</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
