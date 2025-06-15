import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Stack spacing={2}>
          {cart.map((item) => (
            <Card key={item._id}>
              <CardContent>
                  <img
                  src={item.imageUrl}
                  alt={item.description}
                  style={{width:"30%",height:"200px",objectFit:"cover",borderRadius:"8px"}}/>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Price: ₹{item.price} × {item.quantity}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    type="number"
                    label="Quantity"
                    size="small"
                    variant="outlined"
                    inputProps={{ min: 1 }}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value, 10))
                    }
                    sx={{ width: '100px' }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

      {cart.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
};

export default Cart;
