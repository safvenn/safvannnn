import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/Authcontext';
import { CartProvider } from './context/CartContext';
import './styles.css';
import ThemeContextProvider from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </CartProvider>
  </AuthProvider>
);
