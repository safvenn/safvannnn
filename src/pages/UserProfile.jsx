import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import api from '../services/api';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/orders',{
          headers: {
            'Authorization': `Bearer ${user.token}`,},
        });
        setOrders(res.data);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
      }
      setLoading(false);
    };

    if (user) fetchOrders();
  }, [user]);

  if (!user)
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h6">Please log in to view your profile.</Typography>
      </Box>
    );

  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name} 👋
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle1">
          <strong>Email:</strong> {user.email}
        </Typography>
        {/* Add more user info if needed */}
      </Paper>

      <Typography variant="h5" gutterBottom>
        🧾 Your Orders
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && orders.length === 0 && (
        <Typography fontStyle="italic" color="text.secondary">
          You haven't placed any orders yet.
        </Typography>
      )}

      <List>
        {orders.map((order) => (
          <Paper key={order._id} sx={{ mb: 3, p: 2 }} elevation={3}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Order ID:</strong> {order._id}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Items:
            </Typography>
            <List dense>
              {order.items.map((item) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemText primary={`${item.name} × ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default UserProfile;
