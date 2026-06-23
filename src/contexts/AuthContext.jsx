/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { authAPI } from '../services/api';

// ============================================
// CONTEXT CREATION
// ============================================

const AuthContext = createContext(null);

// ============================================
// CUSTOM HOOK
// ============================================

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ============================================
// PROVIDER COMPONENT
// ============================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authAPI.getStoredUser();
        const isAuth = authAPI.isAuthenticated();
        
        if (isAuth && storedUser) {
          // Verify token is still valid with backend
          try {
            const currentUser = await authAPI.getCurrentUser();
            setUser(currentUser);
          } catch (err) {
            // Token invalid - clear everything
            console.error('Token validation failed:', err);
            await authAPI.logout();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Erreur d\'initialisation de l\'authentification');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []); // Empty dependency array - runs once on mount

  // ============================================
  // AUTH METHODS
  // ============================================

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
                          err.response?.data?.detail ||
                          'Erreur de connexion';
      setError(errorMessage);
      throw new Error(errorMessage, { cause: err });
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      setUser(response.user);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.error ||
                          err.response?.data?.email?.[0] ||
                          err.response?.data?.password?.[0] ||
                          'Erreur lors de l\'inscription';
      setError(errorMessage);
      throw new Error(errorMessage, { cause: err });
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // ============================================
  // COMPUTED VALUES
  // ============================================

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';
  const isBureau = user?.role === 'ADMIN' || user?.role === 'BUREAU';

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    isBureau,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

// Made with Bob
