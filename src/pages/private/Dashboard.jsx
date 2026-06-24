import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import './Dashboard.css';

const Dashboard = () => {
  const { user: authUser, updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
        updateUser(userData); // Update auth context with fresh data
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Erreur lors du chargement du profil');
        // Fallback to stored user data if available
        if (authUser) {
          setUser(authUser);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [stats] = useState({
    totalMembers: 245,
    newMembers: 12,
    upcomingEvents: 3,
    documents: 15
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nouvelle Assemblée Générale',
      message: 'L\'AG se tiendra le 30 juin 2026',
      date: '2026-06-20',
      read: false
    },
    {
      id: 2,
      title: 'Nouveau document disponible',
      message: 'Le PV de la dernière réunion est disponible',
      date: '2026-06-18',
      read: false
    },
    {
      id: 3,
      title: 'Cotisation annuelle',
      message: 'N\'oubliez pas de payer votre cotisation',
      date: '2026-06-15',
      read: true
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'event',
      title: 'Formation Leadership',
      date: '2026-06-15'
    },
    {
      id: 2,
      type: 'document',
      title: 'PV Réunion Mai 2026',
      date: '2026-06-10'
    },
    {
      id: 3,
      type: 'member',
      title: '5 nouveaux membres',
      date: '2026-06-08'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle profile update
  const handleSaveProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      
      // Update local state and context
      setUser(response.user);
      updateUser(response.user);
      
      // Close edit mode
      setIsEditing(false);
      
      // Show success message
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Re-throw to let the form handle it
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Crée une URL temporaire locale pour afficher l'aperçu dans le navigateur
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle photo upload
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    // IMPORTANT : Pour envoyer un fichier, on utilise FormData au lieu d'un objet JSON classique
    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      const response = await api.post('/auth/profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Met à jour l'AuthContext global pour actualiser la photo partout sur le site
      setUser(response.data.user);
      updateUser(response.data.user);
      alert("Photo de profil mise à jour avec succès !");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la photo :", error);
      alert("Impossible de mettre à jour la photo.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !user) {
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </div>
        </div>
      </div>
    );
  }

  // Get user display data
  const userName = user ? `${user.prenom} ${user.nom}` : 'Utilisateur';
  const userEmail = user?.email || '';
  const userUniversity = user?.universite || 'Non renseigné';
  const userFiliere = user?.filiere || 'Non renseigné';
  const userNiveau = user?.niveau_etude || 'Non renseigné';
  const userCommune = user?.commune || 'Non renseigné';
  const userInitials = user ? `${user.prenom[0]}${user.nom[0]}` : 'U';

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Show edit form if in editing mode */}
        {isEditing ? (
          <ProfileEditForm
            user={user}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            {/* Header */}
            <div className="dashboard-header">
              <div>
                <h1>Tableau de Bord</h1>
                <p>Bienvenue, {userName}</p>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Modifier le profil
              </Button>
            </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon members">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>{stats.totalMembers}</h3>
              <p>Membres Total</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>{stats.newMembers}</h3>
              <p>Nouveaux ce mois</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon events">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>{stats.upcomingEvents}</h3>
              <p>Événements à venir</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon documents">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>{stats.documents}</h3>
              <p>Documents</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Profile Card */}
          <Card className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-container">
                {/* Affichage de la photo : soit l'aperçu temporaire, soit la photo de la DB, soit les initiales */}
                {previewUrl || user?.profile_photo ? (
                  <img
                    src={
                      previewUrl ||
                      `http://127.0.0.1:8000/storage/${user.profile_photo}`
                    }
                    alt="Profil"
                    className="profile-avatar-image"
                  />
                ) : (
                  <div className="profile-avatar">
                    {userInitials}
                  </div>
                )}
                
                {/* Formulaire d'upload de photo */}
                <form onSubmit={handleUploadPhoto} className="photo-upload-form">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="photo-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="photo-upload" className="upload-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"/>
                    </svg>
                    Changer
                  </label>
                  
                  {selectedFile && (
                    <button type="submit" className="upload-button">
                      Enregistrer
                    </button>
                  )}
                </form>
              </div>
              <div className="profile-info">
                <h3>{userName}</h3>
                <p>{userEmail}</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Université:</span>
                <span className="detail-value">{userUniversity}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Filière:</span>
                <span className="detail-value">{userFiliere}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Niveau:</span>
                <span className="detail-value">{userNiveau}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Commune:</span>
                <span className="detail-value">{userCommune}</span>
              </div>
            </div>
            <Link to="/profile">
              <Button variant="primary" fullWidth>Voir le profil complet</Button>
            </Link>
          </Card>

          {/* Notifications */}
          <div className="notifications-section">
            <div className="section-header">
              <h2>
                Notifications
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </h2>
              <Link to="/notifications">Voir tout</Link>
            </div>
            <div className="notifications-list">
              {notifications.slice(0, 3).map(notif => (
                <div 
                  key={notif.id} 
                  className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notification-content">
                    <h4>{notif.title}</h4>
                    <p>{notif.message}</p>
                    <span className="notification-date">
                      {new Date(notif.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {!notif.read && <div className="notification-dot"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-section">
            <div className="section-header">
              <h2>Activités Récentes</h2>
              <Link to="/activities">Voir tout</Link>
            </div>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'event' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                      </svg>
                    )}
                    {activity.type === 'document' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                      </svg>
                    )}
                    {activity.type === 'member' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                    )}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <span className="activity-date">
                      {new Date(activity.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Actions Rapides</h2>
          <div className="actions-grid">
            <Link to="/members" className="action-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <span>Annuaire</span>
            </Link>
            <Link to="/activities" className="action-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
              </svg>
              <span>Événements</span>
            </Link>
            <Link to="/documents" className="action-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <span>Documents</span>
            </Link>
            <Link to="/contact" className="action-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Contact</span>
            </Link>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// Made with Bob
