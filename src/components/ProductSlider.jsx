// src/components/ProductSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../services/api'; // adjust path if needed

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product._id} className="product-slide">
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;