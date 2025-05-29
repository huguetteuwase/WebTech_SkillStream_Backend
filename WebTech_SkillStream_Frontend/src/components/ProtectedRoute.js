// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom'; // <--- Make sure Navigate is imported here!

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if user is logged in (e.g., if user object is not empty or has a specific property like 'id' or 'token')
  const isAuthenticated = user && Object.keys(user).length > 0 && user.token; // Assuming 'token' indicates authentication

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Use replace to prevent going back to protected route
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />; // Redirect to homepage or an unauthorized page
  }

  return children;
};

export default ProtectedRoute; // <--- THIS LINE IS CRUCIAL!