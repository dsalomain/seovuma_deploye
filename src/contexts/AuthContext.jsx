/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérification de la session au démarrage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authAPI.getStoredUser();
        const isAuth = authAPI.isAuthenticated();
        
        if (isAuth && storedUser) {
          // On vérifie si le token est toujours valide auprès de Django
          try {
            const currentUser = await authAPI.getCurrentUser();
            setUser(currentUser);
          } catch {
            // Si le token est invalide, on nettoie tout via le service (sans variable err inutilisée)
            await authAPI.logout();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Erreur d’initialisation de l’authentification:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Erreur de connexion';
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
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      // Quoi qu'il arrive, on remet l'état de l'application à zéro
      setUser(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    if (authAPI.setStoredUser) {
      authAPI.setStoredUser(updatedUser);
    } else {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Export direct sous forme de variables booléennes pour le JSX
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';
  const isBureau = user?.role === 'ADMIN' || user?.role === 'BUREAU';

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

export default AuthContext;