import { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Select,
  MenuItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSnackbar({ open: true, message: 'Status updated!' });
    } catch (error) {
      console.error('Failed to update order:', error);
      setSnackbar({ open: true, message: 'Update failed' });
    }
  };

  const confirmDelete = (orderId) => {
    setOrderToDelete(orderId);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/${orderToDelete}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderToDelete));
      setSnackbar({ open: true, message: 'Order deleted' });
    } catch (error) {
      console.error('Failed to delete order:', error);
      setSnackbar({ open: true, message: 'Delete failed' });
    } finally {
      setDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  const formatCurrency = (amount) =>
    typeof amount === 'number' ? amount.toFixed(2) : '0.00';

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        📦 All Orders
      </Typography>
      <Paper elevation={2}>
        {loading ? (
          <Box textAlign="center" p={3}><CircularProgress /></Box>
        ) : orders.length === 0 ? (
          <Box textAlign="center" p={3}>
            <Typography>No orders found.</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                {isAdmin && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customerName || 'Unknown'}</TableCell>
                  <TableCell>{order.customerEmail || 'N/A'}</TableCell>
                  <TableCell>
  {order.shippingAddress 
    ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}, ${order.shippingAddress.country}`
    : 'N/A'}
</TableCell>
                  <TableCell>${formatCurrency(order.total)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {isAdmin ? (
                      <Select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        size="small"
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      </Select>
                    ) : (
                      order.status
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => confirmDelete(order._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this order? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default OrdersPage;