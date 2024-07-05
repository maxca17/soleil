import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute'; 
import { AuthProvider } from './AuthProvider'; 
// Max Test
const RoutesComponent = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </AuthProvider>
  );
};

export default RoutesComponent;

