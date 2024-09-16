import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Seller Dashboard',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Manage Your Products',
  },
  {
    segment: 'My Products',
    title: 'My Products',
    icon: <InventoryIcon />,
  },
  {
    segment: 'Add Product',
    title: 'Add Product',
    icon: <AddIcon />,
  },
];

const SellerDashboardContent = ({ pathname, onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: '',
    stock: '',
    category: '', // Use category name instead of ID
  });

  // Fetch seller's products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/seller/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('umia')}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/seller/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('umia')}` },
      });
      console.log('Categories fetched:', response.data); // Debug: Check categories data
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories on mount
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      // Convert category name to ID on the server-side
      await axios.post('http://localhost:3100/api/seller/products', newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('umia')}` },
      });
      fetchProducts(); // Refresh products list after adding
      onNavigate('/My Products'); // Navigate to 'My Products' after adding a product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/api/seller/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('umia')}` },
      });
      fetchProducts(); // Refresh products list after deleting
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      {pathname === '/My Products' && (
        <>
          <Typography variant="h5">Your Products</Typography>
          <List>
            {products.length > 0 ? products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText 
                  primary={product.name} 
                  secondary={
                    <>
                      <Typography>Price: ${product.price}</Typography>
                      <Typography>Stock: {product.stock}</Typography>
                      <Typography>Category: {categories.find(c => c.id === product.category_id)?.name || 'Unknown'}</Typography>
                    </>
                  } 
                />
                <Button variant="contained" color="error" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </ListItem>
            )) : <Typography>No products found.</Typography>}
          </List>
        </>
      )}

      {pathname === '/Add Product' && (
        <>
          <Typography variant="h5">Add a Product</Typography>
          <TextField label="Product Name" name="name" onChange={handleChange} fullWidth sx={{ my: 1 }} />
          <TextField label="Image URL" name="imageUrl" onChange={handleChange} fullWidth sx={{ my: 1 }} />
          <TextField label="Description" name="description" onChange={handleChange} fullWidth sx={{ my: 1 }} />
          <TextField label="Price" name="price" type="number" onChange={handleChange} fullWidth sx={{ my: 1 }} />
          <TextField label="Stock" name="stock" type="number" onChange={handleChange} fullWidth sx={{ my: 1 }} />
          
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleAddProduct}>Add Product</Button>
        </>
      )}

      {pathname === '/dashboard' && (
        <Typography>Welcome to your Seller Dashboard!</Typography>
      )}

      {/* Buttons for manual navigation */}
      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={() => onNavigate('/My Products')}>View My Products</Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => onNavigate('/Add Product')}>Add a New Product</Button>
      </Box>
    </Box>
  );
};

const SellerDashboard = () => {
  const [pathname, setPathname] = useState('/dashboard');

  const router = {
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router}>
      <DashboardLayout>
        <SellerDashboardContent pathname={pathname} onNavigate={router.navigate} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default SellerDashboard;
