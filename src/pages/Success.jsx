import { Container, Typography, Paper, Button, Box } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const Success = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 4,
            backgroundColor: '#ffffff',
          }}
        >
          <CelebrationIcon
            sx={{
              fontSize: 80,
              color: '#ab47bc',
              mb: 2,
              animation: 'popIn 0.6s ease-in-out',
            }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Order Confirmed 🎊
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You’re all set! Your sneakers are on their way.  
            Keep an eye on your inbox for tracking info.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              backgroundColor: '#ab47bc',
              color: '#fff',
              borderRadius: 8,
              px: 4,
              '&:hover': {
                backgroundColor: '#9c27b0',
              },
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Success;
