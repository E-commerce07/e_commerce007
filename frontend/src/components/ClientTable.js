import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function ClientTable({ onDelete, onSwitchRole }) {
  const [clients, setClients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/admin/clients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('umia')}`,
          },
        });
        console.log('Fetched clients:', response.data); // Log the fetched data
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = (id) => {
    onDelete('delete', id);
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
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
          onClick={() => handleSwitchRole(params.id, 'seller')}
        >
          Switch to Seller
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
        rows={clients}
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
