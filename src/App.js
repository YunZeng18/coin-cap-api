import React, { useState, useEffect } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://api.coincap.io/v2/assets`);
      setData(response.data.data)
    }
    fetchData();
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGridPro
        columns={[
          { field: 'id' },
          { field: 'symbol' },
          { field: 'rank' },
          { field: 'priceUsd', width: 130 },
        ]}
        rows={data}
      />
    </div>
  );
}
