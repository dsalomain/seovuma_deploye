import './About.css';

const About = () => {
  const bureauMembers = [
    { role: "Secrétaire Général", count: 1 },
    { role: "Conseillers", count: 6 },
    { role: "Chef de volet par université", count: 2 },
    { role: "Chef de volet communication", count: 1 },
    { role: "Trésorier(e)", count: 1 },
    { role: "Commissaire aux comptes", count: 1 }
  ];

  const commissions = [
    {
      name: "Organisation des événements",
      description: "Planification et coordination des activités de l'association"
    },
    {
      name: "Affaires académiques",
      description: "Soutien académique et tutorat entre étudiants"
    },
    {
      name: "Communication et médias",
      description: "Gestion de la communication interne et externe"
    },
    {
      name: "Social et entraide",
      description: "Actions de solidarité et soutien aux membres"
    }
  ];

  return (
    <div className="about">
      {/* Header Section */}
      <section className="about-header">
        <div className="container">
          <h1>À Propos de SEOVUMA</h1>
          <p className="about-intro">
            Solidarité des Étudiants Originaires de Vavatenina aux Universités de Madagascar
          </p>
        </div>
      </section>

      {/* Historique Section */}
      <section className="history-section">
        <div className="container">
          <div className="section-content">
            <div className="section-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
            </div>
            <div className="section-text">
              <h2>Historique</h2>
              <p>
                SEOVUMA est une organisation regroupant les étudiants originaires de Vavatenina 
                inscrits dans différentes universités et centres de formation à Madagascar. Elle a 
                été créée dans le but de renforcer la solidarité, la coordination et l'entraide entre 
                les étudiants issus de la même localité.
              </p>
              <p>
                Au fil du temps, elle s'est structurée en une entité organisée, permettant la mise 
                en œuvre d'activités académiques, sociales et culturelles au service de ses membres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vm-grid">
            {/* Vision */}
            <div className="vm-card vision-card">
              <div className="vm-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3>Vision</h3>
              <p>
                Constituer un réseau étudiant dynamique, uni et influent, contribuant au 
                développement des étudiants de Vavatenina et, à terme, à celui de la région.
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card mission-card">
              <div className="vm-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.89l7-3.11v8.2z"/>
                </svg>
              </div>
              <h3>Mission</h3>
              <ul className="mission-list">
                <li>Renforcer la solidarité entre les étudiants</li>
                <li>Faciliter l'entraide académique et sociale</li>
                <li>Promouvoir l'excellence et la réussite universitaire</li>
                <li>Encourager l'engagement citoyen et associatif</li>
                <li>Valoriser les initiatives étudiantes au niveau local et national</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organisation Section */}
      <section className="organization-section">
        <div className="container">
          <h2 className="section-title">Organisation</h2>
          <p className="section-description">
            SEOVUMA est structurée autour d'un bureau exécutif et de membres répartis selon 
            les universités et établissements.
          </p>

          {/* Structure */}
          <div className="org-structure">
            <div className="org-level">
              <div className="org-card primary">
                <h4>Assemblée Générale</h4>
                <p>Organe suprême de décision</p>
              </div>
            </div>

            <div className="org-level">
              <div className="org-card secondary">
                <h4>Bureau Exécutif</h4>
                <div className="bureau-list">
                  {bureauMembers.map((member, index) => (
                    <div key={index} className="bureau-item">
                      <span className="bureau-count">({member.count})</span>
                      <span className="bureau-role">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="org-level">
              <h4 className="level-title">Commissions Spécialisées</h4>
              <div className="commissions-grid">
                {commissions.map((commission, index) => (
                  <div key={index} className="commission-card">
                    <div className="commission-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
                      </svg>
                    </div>
                    <h5>{commission.name}</h5>
                    <p>{commission.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="org-level">
              <div className="org-card tertiary">
                <h4>Membres</h4>
                <p>Tous les étudiants originaires de Vavatenina inscrits dans les universités de Madagascar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Solidarité</h4>
              <p>Entraide et soutien mutuel entre tous les membres</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎓</div>
              <h4>Excellence</h4>
              <p>Promotion de la réussite académique et professionnelle</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h4>Engagement</h4>
              <p>Participation active au développement de la communauté</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔗</div>
              <h4>Unité</h4>
              <p>Renforcement des liens entre étudiants de Vavatenina</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

// Made with Bob
