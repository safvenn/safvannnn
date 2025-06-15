import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Box,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: '#000',
        padding: { xs: '8px 16px', sm: '12px 32px' },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo / Brand */}
        <Typography
          component={RouterLink}
          to="/"
          variant="h5"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 700,
            fontFamily: `'Segoe UI', sans-serif`,
          }}
        >
          SNEAKER WALAA
        </Typography>

        {/* Right: Navigation Buttons */}
        <Stack direction="row" spacing={2} alignItems="center">
          {!user ? (
            <>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Tooltip title="Home">
                <IconButton
                  component={RouterLink}
                  to="/"
                  sx={{ color: 'white' }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart">
                <IconButton
                  component={RouterLink}
                  to="/cart"
                  sx={{ color: 'white' }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Tooltip>

              {user.role === 'admin' ? (
                <Tooltip title="Admin Dashboard">
                  <Button
                    component={RouterLink}
                    to="/admin/dashboard"
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: '#90caf9',
                      },
                    }}
                  >
                    ⭐
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Profile">
                  <IconButton
                    component={RouterLink}
                    to="/user/dashboard"
                    sx={{ color: 'white' }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
