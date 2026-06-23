import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './Activities.css';

const Activities = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Données d'exemple - à remplacer par des données réelles de l'API
  const activities = {
    upcoming: [
      {
        id: 1,
        title: 'Assemblée Générale Ordinaire 2026',
        type: 'Assemblée Générale',
        date: '2026-07-15',
        time: '14:00',
        location: 'Université d\'Antananarivo',
        description: 'Assemblée générale annuelle pour discuter des projets et orientations de l\'association.',
        participants: 45,
        status: 'À venir'
      },
      {
        id: 2,
        title: 'Projet de Sensibilisation Environnementale',
        type: 'Projet',
        date: '2026-08-01',
        time: '09:00',
        location: 'Parc de Tsimbazaza',
        description: 'Campagne de sensibilisation sur la protection de l\'environnement auprès des étudiants.',
        participants: 30,
        status: 'À venir'
      }
    ],
    ongoing: [
      {
        id: 3,
        title: 'Formation en Leadership',
        type: 'Formation',
        date: '2026-06-20',
        time: '10:00',
        location: 'En ligne',
        description: 'Programme de formation continue pour développer les compétences en leadership des membres.',
        participants: 25,
        status: 'En cours'
      }
    ],
    past: [
      {
        id: 4,
        title: 'Assemblée Générale Extraordinaire',
        type: 'Assemblée Générale',
        date: '2026-05-10',
        time: '15:00',
        location: 'Université de Fianarantsoa',
        description: 'Assemblée extraordinaire pour voter les nouveaux statuts de l\'association.',
        participants: 52,
        status: 'Terminé'
      },
      {
        id: 5,
        title: 'Journée Portes Ouvertes',
        type: 'Événement',
        date: '2026-04-15',
        time: '08:00',
        location: 'Campus Universitaire',
        description: 'Présentation de SEOVUMA aux nouveaux étudiants et recrutement de membres.',
        participants: 120,
        status: 'Terminé'
      }
    ]
  };

  const getActivityTypeColor = (type) => {
    const colors = {
      'Assemblée Générale': 'type-assembly',
      'Projet': 'type-project',
      'Formation': 'type-training',
      'Événement': 'type-event'
    };
    return colors[type] || 'type-default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="activities-page">
      <div className="activities-container">
        <div className="activities-header">
          <h1>Activités & Projets</h1>
          <p>Assemblées générales, projets et événements de SEOVUMA</p>
        </div>

        <div className="activities-tabs">
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            À venir ({activities.upcoming.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            En cours ({activities.ongoing.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Passées ({activities.past.length})
          </button>
        </div>

        <div className="activities-content">
          {activities[activeTab].length > 0 ? (
            <div className="activities-grid">
              {activities[activeTab].map(activity => (
                <Card key={activity.id} className="activity-card">
                  <div className="activity-header">
                    <span className={`activity-type ${getActivityTypeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                    <span className={`activity-status status-${activity.status.toLowerCase().replace(' ', '-')}`}>
                      {activity.status}
                    </span>
                  </div>
                  
                  <h3 className="activity-title">{activity.title}</h3>
                  
                  <div className="activity-details">
                    <div className="detail-item">
                      <span className="icon">📅</span>
                      <span>{formatDate(activity.date)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">🕐</span>
                      <span>{activity.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">📍</span>
                      <span>{activity.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="icon">👥</span>
                      <span>{activity.participants} participants</span>
                    </div>
                  </div>
                  
                  <p className="activity-description">{activity.description}</p>
                  
                  <div className="activity-actions">
                    {activeTab === 'upcoming' && (
                      <>
                        <Button variant="primary" size="small">
                          S'inscrire
                        </Button>
                        <Button variant="outline" size="small">
                          Plus d'infos
                        </Button>
                      </>
                    )}
                    {activeTab === 'ongoing' && (
                      <Button variant="primary" size="small">
                        Participer
                      </Button>
                    )}
                    {activeTab === 'past' && (
                      <Button variant="outline" size="small">
                        Voir le compte-rendu
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="no-activities">
              <p>Aucune activité {activeTab === 'upcoming' ? 'à venir' : activeTab === 'ongoing' ? 'en cours' : 'passée'} pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;

// Made with Bob