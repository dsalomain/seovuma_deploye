import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './Members.css';

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterUniversity, setFilterUniversity] = useState('all');

  // Données d'exemple - à remplacer par des données réelles de l'API
  const members = [
    {
      id: 1,
      name: 'Jean Dupont',
      university: 'Université d\'Antananarivo',
      region: 'Analamanga',
      email: 'jean.dupont@example.com',
      phone: '+261 34 12 345 67',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Marie Rakoto',
      university: 'Université de Fianarantsoa',
      region: 'Haute Matsiatra',
      email: 'marie.rakoto@example.com',
      phone: '+261 34 23 456 78',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Paul Rasolofo',
      university: 'Université de Toamasina',
      region: 'Atsinanana',
      email: 'paul.rasolofo@example.com',
      phone: '+261 34 34 567 89',
      photo: 'https://via.placeholder.com/150'
    }
  ];

  // Les 23 régions officielles de Madagascar (triées par ordre alphabétique)
  const regions = [
    'Alaotra-Mangoro',
    'Amoron\'i Mania',
    'Analamanga',
    'Analanjirofo',
    'Androy',
    'Anosy',
    'Atsimo-Andrefana',
    'Atsimo-Atsinanana',
    'Atsinanana',
    'Betsiboka',
    'Boeny',
    'Bongolava',
    'Diana',
    'Fitovinany',
    'Haute Matsiatra',
    'Ihorombe',
    'Itasy',
    'Melaky',
    'Menabe',
    'Sava',
    'Sofia',
    'Vakinankaratra',
    'Vatovavy'
  ];

  // Universités publiques et privées de Madagascar (triées par ordre alphabétique)
  const universities = [
    'ACEEM',
    'CNTEMAD',
    'ENI Fianarantsoa',
    'EMIT',
    'ESSCA',
    'ESGM',
    'ESTI',
    'HEI',
    'IES-AV',
    'INSCAE',
    'ISPM',
    'IST',
    'IT University',
    'ORION University Madagascar',
    'Université d\'Antananarivo',
    'Université d\'Antsiranana',
    'Université de Fianarantsoa',
    'Université de Mahajanga',
    'Université de Toamasina',
    'Université de Toliara'
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'all' || member.region === filterRegion;
    const matchesUniversity = filterUniversity === 'all' || member.university === filterUniversity;
    
    return matchesSearch && matchesRegion && matchesUniversity;
  });

  return (
    <div className="members-page">
      <div className="members-container">
        <div className="members-header">
          <h1>Annuaire des Membres</h1>
          <p>Trouvez et connectez-vous avec les membres de SEOVUMA</p>
        </div>

        <div className="members-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="filter-select"
            >
              <option value="all">Toutes les régions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={filterUniversity}
              onChange={(e) => setFilterUniversity(e.target.value)}
              className="filter-select"
            >
              <option value="all">Toutes les universités</option>
              {universities.map(university => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="members-count">
          <p>{filteredMembers.length} membre(s) trouvé(s)</p>
        </div>

        <div className="members-grid">
          {filteredMembers.map(member => (
            <Card key={member.id} className="member-card">
              <div className="member-photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-university">{member.university}</p>
                <p className="member-region">📍 {member.region}</p>
                <p className="member-email">✉️ {member.email}</p>
                <p className="member-phone">📱 {member.phone}</p>
              </div>
              <div className="member-actions">
                <Button variant="primary" size="small">
                  Contacter
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="no-results">
            <p>Aucun membre trouvé avec ces critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;

// Made with Bob