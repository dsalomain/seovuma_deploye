import { useState } from 'react';
import './Gallery.css';

// Import images from assets folder
import img1 from '../../assets/images/seovum_im1.jpeg';
import img2 from '../../assets/images/seovum_im2.jpeg';
import img3 from '../../assets/images/seovum_im3.jpeg';
import img4 from '../../assets/images/seovum_im4.jpeg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // Gallery data with imported images
  const galleryItems = [
    {
      id: 1,
      title: "Carnaval des Étudiants",
      category: "carnaval",
      image: img1,
      date: "2025-11-20"
    },
    {
      id: 2,
      title: "Vue aérienne de Vavatenina",
      category: "region",
      image: img2,
      date: "2025-10-15"
    },
    {
      id: 3,
      title: "Assemblée Générale 2026",
      category: "assemblee",
      image: img3,
      date: "2026-01-15"
    },
    {
      id: 4,
      title: "Action Sociale & Entraide",
      category: "social",
      image: img4,
      date: "2025-09-05"
    }
  ];

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'carnaval', label: 'Carnavals' },
    { value: 'assemblee', label: 'Assemblées' },
    { value: 'social', label: 'Actions Sociales' },
    { value: 'region', label: 'Région' }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className="gallery">
      {/* Header Section */}
      <section className="gallery-header">
        <div className="container">
          <h1>Galerie Photos</h1>
          <p>Découvrez les moments forts de SEOVUMA en images</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="container">
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
              >
                <div className="gallery-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Non+Disponible';
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h3>{item.title}</h3>
                      <p>{new Date(item.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div className="gallery-zoom">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-results">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <p>Aucune image trouvée pour cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="gallery-modal"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={closeModal}
              aria-label="Fermer"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Non+Disponible';
              }}
            />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{new Date(selectedImage.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

// Made with Bob
