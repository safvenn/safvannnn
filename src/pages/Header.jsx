import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import ProductSlider from "../components/ProductSlider";
// In App.js or Home.jsx
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Header() {
  
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 5,
        px: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Sneaker wala
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      
      </Typography>


      <Stack justifyContent="center" direction="row" spacing={2}>
        <Button
          component={Link}
          to="/home"
          variant="contained"
          color="primary"
        >
          Shop Now
        </Button>
      </Stack>
      

    </Box>
  );

}

export default Header;