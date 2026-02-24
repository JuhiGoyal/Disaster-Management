import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ContributionForm from './components/ContributionForm';
import DisasterList from './components/DisasterList';
import DisasterForm from './components/DisasterForm';
import DisasterReport from './components/DisasterReport';
import AdminContributions from './components/AdminContributions';
import RescueTeamAssignment from './components/RescueTeamAssignment';
import { AuthProvider, useAuth } from './contexts/AuthContext';

/* ======================
   Axios Global Config
====================== */

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* ======================
   App Content
====================== */

function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();
  const isAdmin = user?.role === 'admin';

  // 🔥 MOST IMPORTANT FIX
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated && <Header />}

      <div className={isAuthenticated ? 'container' : ''}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/contribute"
            element={
              isAuthenticated ? <ContributionForm /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/disasters"
            element={
              isAuthenticated ? <DisasterList /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/disaster/report"
            element={
              isAuthenticated ? <DisasterReport /> : <Navigate to="/login" />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/disaster/create"
            element={
              isAuthenticated && isAdmin
                ? <DisasterForm />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/admin/contributions"
            element={
              isAuthenticated && isAdmin
                ? <AdminContributions />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/admin/rescue-teams"
            element={
              isAuthenticated && isAdmin
                ? <RescueTeamAssignment />
                : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

/* ======================
   Root App
====================== */

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;