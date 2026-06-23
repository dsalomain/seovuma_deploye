import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import './Login.css';

const Login = ({ onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData);
      onClose();
      // Redirect will be handled by App.jsx based on user role
    } catch (error) {
      setGeneralError(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="auth-modal-content">
          <h2>Connexion</h2>
          <p className="auth-modal-subtitle">
            Connectez-vous à votre compte SEOVUMA
          </p>

          {generalError && (
            <div className="auth-error-message">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="votre.email@example.com"
                disabled={loading}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="auth-modal-footer">
            <p>
              Pas encore de compte ?{' '}
              <button
                type="button"
                className="auth-link"
                onClick={onSwitchToRegister}
              >
                S'inscrire
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Made with Bob