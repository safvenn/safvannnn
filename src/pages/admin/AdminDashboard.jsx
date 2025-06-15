import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Paper,
  Input,
  Drawer,
  Tooltip,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Edit as EditIcon,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext';
import { ThemeContext } from '@emotion/react';

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent={sidebarOpen ? 'space-between' : 'center'} alignItems="center" mb={2}>
        {sidebarOpen && <Typography variant="h6">Admin</Typography>}
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {[
          { text: '🛍️ Products', path: '/admin/productsList' },
          { text: '👥 Users', path: '/admin/userspage' },
          { text: '📦 Orders', path: '/admin/orderspage' },
          { text: '⚙️ Settings', path: '/admin/settings' },
          { text: '🔓 Logout', action: handleLogout },
        ].map(({ text, path, action }, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={sidebarOpen ? '' : text} placement="right">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => (action ? action() : navigate(path))}
              >
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: sidebarOpen ? 1 : 0,
                    whiteSpace: 'nowrap',
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* AppBar */}
      <AppBar position="fixed" color="primary" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Collapsible Sidebar */}
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          mt: 8,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4 }}>
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
              <Typography variant="body1">WELCOME TO ADMIN DASHBOARD</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1">
              Hello, <strong>{user?.name}</strong>!
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Your email: {user?.email}
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;