import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = () => {
  const { user, loading } = useUser();
  console.log("Protected Route - User:", user, "Loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
