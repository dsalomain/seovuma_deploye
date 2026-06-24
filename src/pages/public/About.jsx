import './About.css';

const About = () => {
  const bureauMembers = [
    { role: "Secrétaire Général", count: 1, description: "Chargé de la coordination générale et du suivi des activités" },
    { role: "Conseillers", count: 6, description: "Appuyant la prise de décisions stratégiques et l'orientation des actions" },
    { role: "Chef de volet par université", count: 2, description: "Assurant la coordination locale et la mise en œuvre des activités sur le terrain" },
    { role: "Chef de volet communication", count: 1, description: "Responsable de la gestion de l'information et de la visibilité des activités" },
    { role: "Trésorier(e)", count: 1, description: "Chargé(e) de la gestion financière et de la transparence des ressources" },
    { role: "Commissaires aux comptes", count: 7, description: "Responsables du contrôle et de la vérification des finances" }
  ];

  const commissions = [
    {
      name: "Affaires académiques",
      description: "Ce volet est chargé de promouvoir l'excellence académique et la réussite universitaire des membres. Il assure le suivi des questions liées aux études, diffuse les informations relatives aux bourses, aux formations et aux opportunités académiques, accompagne les étudiants dans leur parcours universitaire et organise des activités de soutien pédagogique, de mentorat et de partage d'expériences."
    },
    {
      name: "Communication et médias",
      description: "Ce volet assure la gestion de la communication interne et externe de la SEOVUMA. Il est chargé de la diffusion des informations officielles, de la valorisation des activités de l'association, de l'animation des réseaux sociaux, ainsi que des relations avec les médias et les partenaires."
    },
    {
      name: "Social et entraide",
      description: "Ce volet est chargé de la mise en œuvre des actions de solidarité au sein de la SEOVUMA. Il coordonne les initiatives de soutien aux membres en difficulté, organise des activités d'entraide, et favorise la cohésion sociale et l'esprit de solidarité entre les étudiants."
    },
    {
      name: "Organisation des événements",
      description: "Ce volet est chargé de la planification, de la coordination et de la mise en œuvre des activités de la SEOVUMA. Il assure la préparation logistique des événements, la gestion du calendrier des activités, ainsi que la mobilisation des membres pour garantir le bon déroulement des manifestations."
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
                L'initiative de sa création revient à un groupe de jeunes leaders dynamiques et engagés
                originaires du district de Vavatenina, portés par une vision commune de développement,
                de solidarité et de responsabilité sociale.
              </p>
              <p>
                Cette organisation est née d'une vision simple mais essentielle : rassembler les jeunes
                de Vavatenina afin de renforcer les liens entre étudiants et anciens étudiants, tout en
                développant un esprit de solidarité durable. Elle vise également à encourager une entraide
                réelle entre les membres, notamment en soutenant les étudiants et jeunes en difficulté, et
                en favorisant une culture de partage et de responsabilité collective.
              </p>
              <p>
                Au fil du temps, SEOVUMA s'est structurée en une entité organisée et dynamique, permettant
                la mise en œuvre d'activités académiques, sociales, culturelles et communautaires au service
                de ses membres. Cette évolution a renforcé le sentiment d'appartenance et consolidé un réseau
                solide, basé sur l'entraide, la solidarité et le développement collectif.
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
                <li>Renforcer la solidarité et la cohésion entre les étudiants</li>
                <li>Faciliter l'entraide académique et sociale</li>
                <li>Promouvoir l'excellence et la réussite universitaire</li>
                <li>Encourager l'engagement citoyen et associatif</li>
                <li>Valoriser les initiatives étudiantes locales et nationales</li>
                <li>Développer l'esprit de leadership et de responsabilité chez les étudiants</li>
                <li>Favoriser le partage de connaissances et d'expériences</li>
                <li>Soutenir l'insertion professionnelle des étudiants</li>
                <li>Promouvoir la discipline, l'éthique et les valeurs universitaires</li>
                <li>Créer un réseau dynamique d'étudiants à travers les universités de Madagascar</li>
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
            SEOVUMA est structurée autour d'un bureau exécutif et d'une base de membres répartis
            dans les différentes universités et établissements d'enseignement supérieur à travers Madagascar.
          </p>
          <div className="org-description">
            <ul>
              <li>Le bureau exécutif assure la coordination générale, la prise de décisions et la mise en œuvre des activités</li>
              <li>Les responsables par université servent de relais entre le bureau exécutif et les membres locaux</li>
              <li>Chaque université dispose d'un point focal appuyé par deux chefs de volets</li>
              <li>Des commissions spécialisées sont mises en place pour les différents domaines d'action</li>
              <li>Un système de coordination inter-universitaire assure l'unité et la cohérence des actions</li>
            </ul>
          </div>

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
                      <div className="bureau-header">
                        <span className="bureau-count">({member.count})</span>
                        <span className="bureau-role">{member.role}</span>
                      </div>
                      <p className="bureau-description">{member.description}</p>
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
                <p>
                  Les membres de SEOVUMA sont constitués de tous les étudiants originaires de Vavatenina
                  inscrits dans les universités et établissements d'enseignement supérieur à Madagascar.
                  L'association intègre également les anciens étudiants universitaires originaires de Vavatenina,
                  qui souhaitent continuer à contribuer au développement des activités et au renforcement du réseau.
                </p>
                <p>
                  SEOVUMA est également ouverte aux parrains et partenaires volontaires désireux de soutenir
                  l'association, dans un cadre strictement apolitique et orienté uniquement vers le développement
                  étudiant et communautaire.
                </p>
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
              <div className="value-icon">🎯</div>
              <h4>Mission</h4>
              <p>Renforcer la solidarité et promouvoir l'entraide entre les étudiants originaires de Vavatenina, en favorisant la cohésion, l'accompagnement mutuel et le développement d'un esprit d'unité au sein de la communauté étudiante.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Solidarité</h4>
              <p>Créer et renforcer un réseau d'entraide académique et sociale entre tous les membres, afin de favoriser le soutien mutuel, la coopération et l'accompagnement dans les études et la vie étudiante.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎓</div>
              <h4>Excellence</h4>
              <p>Promouvoir la réussite universitaire des membres ainsi que leur engagement citoyen, en encourageant le mérite, la discipline, l'implication académique et la participation active au développement de la société.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h4>Engagement</h4>
              <p>Promouvoir la participation active des membres au développement de la communauté étudiante et locale, en encourageant l'implication dans des actions solidaires, éducatives et sociales.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔗</div>
              <h4>Unité</h4>
              <p>Renforcer l'unité entre les étudiants originaires de Vavatenina, consolider les liens fraternels et promouvoir un esprit d'appartenance commun, au-delà des différences d'établissements ou de parcours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

// Made with Bob
