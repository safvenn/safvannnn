// src/pages/admin/ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/products/${deleteId}`);
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/admin/add-product')}>
        Add Product
      </Button>
      <Stack spacing={3} mt={3}>
        {products.map((product) => (
          <Paper key={product._id} sx={{ p: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">Price: ${product.price.toFixed(2)}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteId(product._id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>

      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;