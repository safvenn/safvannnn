import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';

const EditProduct = () => {
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setForm(res.data);
      } catch (err) {
        alert('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, form);
      navigate('/admin');
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box maxWidth="500px" mx="auto" mt={5}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          Edit Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0, step: '0.01' }}
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
              fullWidth
            />
             <TextField
              label="Size"
              name="size"
              multiline
              rows={4}
              value={form.size}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="imageUrl"
              name="imageUrl"
              multiline
              rows={4}
              value={form.imageUrl}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProduct;
