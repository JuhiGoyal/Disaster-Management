import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =======================
     Verify Token
  ======================= */
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/user/profile');
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     Initial Auth Check
  ======================= */
  useEffect(() => {
    verifyToken();
  }, []);

  /* =======================
     Auth Actions
  ======================= */
  const login = async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const { token, user: userData } = response.data.data;

      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      const { token, user: newUser } = response.data.data;

      localStorage.setItem('token', token);
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        verifyToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};