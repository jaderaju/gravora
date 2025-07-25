// src/App.jsx
import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Dashboard from './components/dashboard/Dashboard';
import LoginPage from './components/auth/LoginPage';
import './App.css';

const AppContent = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <LoginPage />;
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
