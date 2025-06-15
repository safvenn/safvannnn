import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Avatar,
  IconButton,
  Input,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Instant preview
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        {/* Avatar + Edit Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={preview}
              alt={user?.name}
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              component="label"
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'white',
                border: '1px solid #ccc',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <EditIcon fontSize="small" />
              <Input
                type="file"
                onChange={handleImageUpload}
                sx={{ display: 'none' }}
                inputProps={{ accept: 'image/*' }}
              />
            </IconButton>
          
          </Box>
            <Typography variant="body1" sx={{ mz: 6 }}>
          WELCOME TO YOUR DASHBOARD 
        </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1">
          Hello, <strong>{user?.name}</strong>!
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Your email: {user?.email}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            onClick={handleLogout}
            variant="outlined"
            color="error"
            sx={{ mr: 2 }}
          >
            Logout
          </Button>

          <Button component={RouterLink} to="/profile" color="inherit">
            PROFILE
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDashboard;