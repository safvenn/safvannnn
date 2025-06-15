import { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ name: 
    "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      login({ token, role: payload.role || 'user' });
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
