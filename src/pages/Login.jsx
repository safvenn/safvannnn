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
  Link,
} from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      login({ token, role: payload.role || 'user' });
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{ style: { color: '#ccc' } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: '#1e88e5',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: '#ccc' }}>
            Don’t have an account?{' '}
            <Link href="/register" underline="hover" sx={{ color: '#90caf9' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;