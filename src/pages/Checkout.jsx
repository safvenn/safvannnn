import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/Authcontext';
import api from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (field) => (e) => {
    setShipping({ ...shipping, [field]: e.target.value });
  };

  const handleCheckout = async () => {
    if (Object.values(shipping).some(val => val.trim() === '')) {
      alert('Please fill in all shipping fields.');
      return;
    }

    try {
      const res = await api.post('/payment/process-order', {
        cart,
        email: user?.email,
        shipping,
        paymentMethod
      });

      if (res.data.success) {
        alert('Order placed successfully!');
        navigate('/payment');
      } else {
        alert('Order failed: ' + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Checkout failed. Please try again.');
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>

      {/* 🛒 Cart Items with Images */}
      <Typography variant="h6" gutterBottom>Cart Items</Typography>
      <List dense>
        {cart.map((item, idx) => (
          <ListItem key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </Box>
            <Typography>₹{item.price * item.quantity}</Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>

      {/* 📦 Shipping Info */}
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>Shipping Details</Typography>

        <TextField
          fullWidth label="Address"
          value={shipping.address}
          onChange={handleChange('address')}
          margin="normal"
        />
        <TextField
          fullWidth label="City"
          value={shipping.city}
          onChange={handleChange('city')}
          margin="normal"
        />
        <TextField
          fullWidth label="Postal Code"
          value={shipping.postalCode}
          onChange={handleChange('postalCode')}
          margin="normal"
        />
        <TextField
          fullWidth label="Country"
          value={shipping.country}
          onChange={handleChange('country')}
          margin="normal"
        />

        {/* 💳 Payment Method */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            label="Payment Method"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="card">Card</MenuItem>
            <MenuItem value="cod">COD</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCheckout}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;