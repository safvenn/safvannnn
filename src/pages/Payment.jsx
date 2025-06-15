import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setCartTotal(total);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16 || cvv.length !== 3) {
      alert("Please enter valid card details.");
      return;
    }

    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #f3e5f5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Complete Payment
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            You’re almost there! Enter your card details below.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Total Amount: <strong>₹{cartTotal}</strong>
          </Typography>

          <Box component="form" onSubmit={handlePayment} noValidate>
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              inputProps={{ maxLength: 16 }}
              required
            />
            <TextField
              label="Expiry (MM/YY)"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              inputProps={{ maxLength: 5 }}
              required
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              inputProps={{ maxLength: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                background: "linear-gradient(to right, #8e24aa, #3949ab)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 2,
                '&:hover': {
                  background: "linear-gradient(to right, #7b1fa2, #303f9f)",
                },
              }}
            >
              Pay ₹{cartTotal}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Payment;
