import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Login from '../auth/Login';
import Register from '../auth/Register';
import './Navbar.css';
import logo from '../../assets/images/logo_seovuma.jpeg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="SEOVUMA Logo" />
            <span>SEOVUMA</span>
          </Link>

          <button
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-links">
              <li>
                <Link to="/" className={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/members" className={isActive('/members')} onClick={() => setIsMenuOpen(false)}>
                  Membres
                </Link>
              </li>
              <li>
                <Link to="/activities" className={isActive('/activities')} onClick={() => setIsMenuOpen(false)}>
                  Activités
                </Link>
              </li>
              <li>
                <Link to="/documents" className={isActive('/documents')} onClick={() => setIsMenuOpen(false)}>
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={isActive('/gallery')} onClick={() => setIsMenuOpen(false)}>
                  Galerie
                </Link>
              </li>
              <li>
                <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className="navbar-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="small">
                      {user?.role === 'ADMIN' ? 'Espace Admin' : 'Espace Membre'}
                    </Button>
                  </Link>
                  <Button variant="primary" size="small" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="small" onClick={handleLoginClick}>
                    Connexion
                  </Button>
                  <Button variant="primary" size="small" onClick={handleRegisterClick}>
                    Inscription
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={switchToRegister}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  );
};

export default Navbar;

// Made with Bob
