import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import './Documents.css';

const Documents = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Données d'exemple - à remplacer par des données réelles de l'API
  const documents = [
    {
      id: 1,
      title: 'Statuts de SEOVUMA',
      category: 'Statuts',
      description: 'Statuts officiels de l\'association SEOVUMA, version 2026',
      date: '2026-01-15',
      size: '2.5 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 45
    },
    {
      id: 2,
      title: 'Règlement Intérieur',
      category: 'Statuts',
      description: 'Règlement intérieur définissant les règles de fonctionnement',
      date: '2026-01-15',
      size: '1.8 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 38
    },
    {
      id: 3,
      title: 'PV Assemblée Générale - Mai 2026',
      category: 'PV',
      description: 'Procès-verbal de l\'assemblée générale extraordinaire du 10 mai 2026',
      date: '2026-05-12',
      size: '1.2 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 52
    },
    {
      id: 4,
      title: 'PV Assemblée Générale - Janvier 2026',
      category: 'PV',
      description: 'Procès-verbal de l\'assemblée générale ordinaire du 20 janvier 2026',
      date: '2026-01-22',
      size: '1.5 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 41
    },
    {
      id: 5,
      title: 'Rapport Financier 2025',
      category: 'Rapports',
      description: 'Rapport financier annuel de l\'exercice 2025',
      date: '2026-01-10',
      size: '3.2 MB',
      format: 'PDF',
      access: 'Bureau exécutif',
      downloads: 15
    },
    {
      id: 6,
      title: 'Rapport d\'Activités 2025',
      category: 'Rapports',
      description: 'Bilan des activités et projets réalisés en 2025',
      date: '2026-01-10',
      size: '4.5 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 48
    },
    {
      id: 7,
      title: 'Guide du Nouveau Membre',
      category: 'Autres',
      description: 'Guide d\'accueil et d\'intégration pour les nouveaux membres',
      date: '2026-02-01',
      size: '2.1 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 67
    },
    {
      id: 8,
      title: 'Charte Graphique SEOVUMA',
      category: 'Autres',
      description: 'Charte graphique et identité visuelle de l\'association',
      date: '2026-03-15',
      size: '5.8 MB',
      format: 'PDF',
      access: 'Tous les membres',
      downloads: 32
    }
  ];

  const categories = ['all', 'Statuts', 'PV', 'Rapports', 'Autres'];

  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getAccessBadgeClass = (access) => {
    return access === 'Bureau exécutif' ? 'access-restricted' : 'access-public';
  };

  return (
    <div className="documents-page">
      <div className="documents-container">
        <div className="documents-header">
          <h1>Documents</h1>
          <p>Statuts, procès-verbaux et documents officiels de SEOVUMA</p>
        </div>

        <div className="documents-filters">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'Tous les documents' : category}
                {category === 'all' 
                  ? ` (${documents.length})` 
                  : ` (${documents.filter(d => d.category === category).length})`
                }
              </button>
            ))}
          </div>
        </div>

        <div className="documents-grid">
          {filteredDocuments.map(document => (
            <Card key={document.id} className="document-card">
              <div className="document-icon">
                <span className="file-icon">📄</span>
                <span className="file-format">{document.format}</span>
              </div>
              
              <div className="document-info">
                <h3 className="document-title">{document.title}</h3>
                <p className="document-description">{document.description}</p>
                
                <div className="document-meta">
                  <div className="meta-item">
                    <span className="icon">📅</span>
                    <span>{formatDate(document.date)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="icon">💾</span>
                    <span>{document.size}</span>
                  </div>
                  <div className="meta-item">
                    <span className="icon">⬇️</span>
                    <span>{document.downloads} téléchargements</span>
                  </div>
                </div>

                <div className="document-access">
                  <span className={`access-badge ${getAccessBadgeClass(document.access)}`}>
                    {document.access === 'Bureau exécutif' ? '🔒' : '🔓'} {document.access}
                  </span>
                </div>
              </div>

              <div className="document-actions">
                <Button variant="primary" size="small">
                  Télécharger
                </Button>
                <Button variant="outline" size="small">
                  Aperçu
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="no-documents">
            <p>Aucun document trouvé dans cette catégorie.</p>
          </div>
        )}

        <div className="documents-info">
          <Card className="info-card">
            <h3>ℹ️ Information</h3>
            <p>
              Les documents marqués avec 🔒 sont réservés aux membres du bureau exécutif.
              Pour toute question concernant l'accès aux documents, veuillez contacter le secrétariat.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documents;

// Made with Bob