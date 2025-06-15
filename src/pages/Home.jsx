import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  CardActions,
  InputAdornment,
  Box,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../services/api';
import { Link } from 'react-router-dom';
import"./Home.css";

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom fontWeight={700} color="#1976d2">
        Explore Our Products
      </Typography>

      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{
          mb: 5,
          borderRadius: 3,
          p: 1,
          backgroundColor: '#f9f9f9',
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            borderRadius: 3,
            backgroundColor: 'white',
            '& .MuiFilledInput-root': {
              borderRadius: 3,
            },
          }}
        />
      </Paper>

      {filtered.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filtered.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={product.imageUrl}
                  alt={product.name}
                  sx={{
                    height: 180,
                    width: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="#d32f2f" fontWeight={600}>
                    ₹{product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {product.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Size: {product.size}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => addToCart(product)}
                      sx={{ backgroundColor: '#FFYY0' }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      component={Link}
                      to={`/product/${product._id}`}
                      variant="outlined"
                      fullWidth
                    >
                      View
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
