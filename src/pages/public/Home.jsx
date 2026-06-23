import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './Home.css';

const Home = () => {
  // Sample data - will be replaced with API calls
  const recentNews = [
    {
      id: 1,
      title: "Assemblée Générale 2026",
      date: "2026-06-15",
      summary: "La prochaine assemblée générale se tiendra le 30 juin 2026 à l'Université d'Antananarivo.",
      image: "/images/ag.jpg"
    },
    {
      id: 2,
      title: "Nouveau Bureau Exécutif",
      date: "2026-05-20",
      summary: "Élection du nouveau bureau exécutif pour l'année académique 2026-2027.",
      image: "/images/bureau.jpg"
    },
    {
      id: 3,
      title: "Journée Solidarité",
      date: "2026-05-10",
      summary: "Organisation d'une journée de solidarité pour soutenir les étudiants en difficulté.",
      image: "/images/solidarite.jpg"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Assemblée Générale",
      date: "30 Juin 2026",
      location: "Université d'Antananarivo"
    },
    {
      id: 2,
      title: "Formation Leadership",
      date: "15 Juillet 2026",
      location: "Campus Universitaire"
    },
    {
      id: 3,
      title: "Journée Culturelle",
      date: "20 Août 2026",
      location: "Vavatenina"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            SEOVUMA
          </h1>
          <p className="hero-subtitle">
            Solidarité des Étudiants Originaires de Vavatenina aux Universités de Madagascar
          </p>
          <p className="hero-description">
            Plateforme officielle de coordination et d'organisation des étudiants
          </p>
          <div className="hero-actions">
            <Link to="/register">
              <Button variant="primary" size="large">
                Rejoindre l'association
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="large">
                Espace membre
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.11v8.2z"/>
                </svg>
              </div>
              <h3>Mission</h3>
              <p>Renforcer la solidarité et faciliter l'entraide entre les étudiants originaires de Vavatenina</p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h3>Solidarité</h3>
              <p>Créer un réseau d'entraide académique et sociale pour tous les membres</p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                </svg>
              </div>
              <h3>Excellence</h3>
              <p>Promouvoir la réussite universitaire et l'engagement citoyen</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <div className="section-header">
            <h2>Actualités Récentes</h2>
            <Link to="/activities">
              <Button variant="ghost">Voir tout</Button>
            </Link>
          </div>
          <div className="news-grid">
            {recentNews.map(news => (
              <Card
                key={news.id}
                title={news.title}
                subtitle={new Date(news.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                hoverable
              >
                <p>{news.summary}</p>
                <Link to={`/news/${news.id}`} className="read-more">
                  Lire plus →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <div className="section-header">
            <h2>Événements à Venir</h2>
            <Link to="/activities">
              <Button variant="ghost">Calendrier complet</Button>
            </Link>
          </div>
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <span className="event-day">{event.date.split(' ')[0]}</span>
                  <span className="event-month">{event.date.split(' ')[1]}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {event.location}
                  </p>
                </div>
                <Button variant="outline" size="small">Détails</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Rejoignez Notre Communauté</h2>
            <p>Inscrivez-vous dès maintenant et bénéficiez de tous les avantages de l'association</p>
            <div className="cta-actions">
              <Link to="/register">
                <Button variant="secondary" size="large">
                  S'inscrire maintenant
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Made with Bob
