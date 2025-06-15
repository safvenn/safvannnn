// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User is not logged in, redirect to login
    return <Navigate to="/Login" replace />;
  }

  // User is logged in, render children
  return children;
};

export default ProtectedRoute;
