import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function SellersTable({ onDelete, onSwitchRole }) {
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/admin/sellers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('umia')}`,
          },
        });
        console.log('Fetched sellers:', response.data); // Log the fetched data
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleDelete = (id) => {
    onDelete('delete', id);
    setSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
  };

  const handleSwitchRole = (id, newRole) => {
    onSwitchRole('switchRole', id, newRole);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
      field: 'switchRole',
      headerName: 'Switch Role',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleSwitchRole(params.id, 'client')}
        >
          Switch to Client
        </Button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 950, width: 1350 }}>
      <DataGrid
        rows={sellers}
        columns={columns}
        loading={loading}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        autoHeight
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
