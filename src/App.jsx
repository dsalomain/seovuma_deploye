import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('🔒 [ProtectedRoute] Vérification d\'accès:', {
    loading,
    isAuthenticated,
    user: user ? { id: user.id, email: user.email, role: user.role } : null
  });

  if (loading) {
    console.log('🔒 [ProtectedRoute] En cours de chargement...');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔒 [ProtectedRoute] ❌ Non authentifié - Redirection vers /');
    return <Navigate to="/" replace />;
  }

  console.log('🔒 [ProtectedRoute] ✅ Accès autorisé');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Admin Route Component (Admin uniquement)
// NOTE: Actuellement non utilisé - Décommenter si vous créez une route réservée uniquement à l'admin
// Par exemple: une page /admin-panel pour la gestion système
/*
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
*/

// Bureau Route Component (Bureau et Admin)
const BureauRoute = ({ children }) => {
  const { isAuthenticated, isBureau, loading, user } = useAuth();

  console.log('🛡️ [BureauRoute] Vérification d\'accès:', {
    loading,
    isAuthenticated,
    isBureau,
    userRole: user?.role,
    user: user ? { id: user.id, email: user.email, role: user.role } : null
  });

  if (loading) {
    console.log('🛡️ [BureauRoute] En cours de chargement...');
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🛡️ [BureauRoute] ❌ Non authentifié - Redirection vers /');
    return <Navigate to="/" replace />;
  }

  if (!isBureau) {
    console.log('🛡️ [BureauRoute] ❌ Pas de rôle Bureau/Admin - Redirection vers /dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('🛡️ [BureauRoute] ✅ Accès autorisé');
  return children;
};

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

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
