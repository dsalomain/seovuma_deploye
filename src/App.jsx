import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

// Private Pages
import Dashboard from './pages/private/Dashboard';
import Members from './pages/private/Members';
import Activities from './pages/private/Activities';
import Documents from './pages/private/Documents';

import './App.css';

// ============================================
// LOADING COMPONENT
// ============================================

const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.2rem',
    color: '#2c3e50'
  }}>
    <p>Chargement...</p>
  </div>
);

// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================

/**
 * ProtectedRoute - Protects routes that require authentication
 * Redirects to home if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ============================================
// BUREAU ROUTE COMPONENT
// ============================================

/**
 * BureauRoute - Protects routes that require Bureau or Admin role
 * Redirects to dashboard if user doesn't have required role
 * Redirects to home if user is not authenticated
 *
 * ⚠️ TEMPORARY DEMO MODE - AUTHENTICATION DISABLED ⚠️
 * TODO: Re-enable authentication checks after demo presentation
 */
const BureauRoute = ({ children }) => {
  // DEMO MODE: Authentication checks temporarily disabled for presentation
  // Original code commented out below - restore after demo:
  /*
  const { isAuthenticated, isBureau, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isBureau) {
    return <Navigate to="/dashboard" replace />;
  }
  */

  return children;
};

BureauRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ============================================
// ADMIN ROUTE COMPONENT (Optional - for future use)
// ============================================

/**
 * AdminRoute - Protects routes that require Admin role only
 * Currently not used but available for admin-only features
 * 
 * Usage example:
 * <Route path="/admin-panel" element={
 *   <AdminRoute>
 *     <AdminPanel />
 *   </AdminRoute>
 * } />
 */
/*
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
*/

// ============================================
// APP CONTENT COMPONENT
// ============================================

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ========== PROTECTED ROUTES (Authenticated Users) ========== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* ========== BUREAU ROUTES (Bureau & Admin Only) ========== */}
          <Route
            path="/members"
            element={
              <BureauRoute>
                <Members />
              </BureauRoute>
            }
          />
          <Route
            path="/activities"
            element={
              <BureauRoute>
                <Activities />
              </BureauRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <BureauRoute>
                <Documents />
              </BureauRoute>
            }
          />
          
          {/* ========== FALLBACK ROUTE ========== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

// Made with Bob
