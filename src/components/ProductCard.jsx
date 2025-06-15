import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
         <img
                  src={product.imageUrl}
                  alt={product.description}
                  style={{width:"100%",height:"180px",objectFit:"cover",borderRadius:"8px"}}/>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {product.description}
        </Typography>
         <Typography variant="body2" sx={{ mb: 1.5 }}>
          {product.size}
        </Typography>
        
      </CardContent>

      <CardActions>
        <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Button size="small" variant="contained" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Button
            size="small"
            component={Link}
            to={`/product/${product._size}`}
            variant="outlined"
          >
            View Details
          </Button>
        </Stack>
      </CardActions>
    </Card>

    <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Item added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;
