'use client';

import { useState } from 'react';
import FormComponent from '../components/FormComponent';
import TableComponent from '../components/TableComponent';

export default function HomePage() {
  const [tableData, setTableData] = useState([]);

  const handleFormSubmit = (formData) => {
    setTableData((prevData) => [...prevData, formData]);
  };

  return (
    <div>
      <h1>Form to Table Example</h1>
      <FormComponent onSubmit={handleFormSubmit} />
      <TableComponent data={tableData} />
    </div>
  );
}
