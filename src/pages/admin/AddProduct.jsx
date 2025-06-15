import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', price: '', description: '',size:'',imageUrl:'' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      navigate('/admin');
    } catch (err) {
      alert('Add failed');
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={5}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          Add Product
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
              Create
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProduct;
