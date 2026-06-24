import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import './ProfileEditForm.css';

const ProfileEditForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    commune: user?.commune || '',
    lien_facebook: user?.lien_facebook || '',
    etablissement_origine: user?.etablissement_origine || '',
    annee_baccalaureat: user?.annee_baccalaureat || '',
    annee_inscription_universitaire: user?.annee_inscription_universitaire || '',
    universite: user?.universite || '',
    filiere: user?.filiere || '',
    niveau_etude: user?.niveau_etude || '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Erreur lors de la mise à jour du profil' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Modifier le profil</h2>
        <p>Mettez à jour vos informations personnelles</p>
      </div>

      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}

      <div className="form-sections">
        {/* Section Informations personnelles */}
        <div className="form-section">
          <h3>Informations personnelles</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={errors.prenom ? 'error' : ''}
                disabled={loading}
              />
              {errors.prenom && <span className="field-error">{errors.prenom}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={errors.nom ? 'error' : ''}
                disabled={loading}
              />
              {errors.nom && <span className="field-error">{errors.nom}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={loading}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="commune">Commune</label>
              <input
                type="text"
                id="commune"
                name="commune"
                value={formData.commune}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lien_facebook">Lien Facebook</label>
            <input
              type="url"
              id="lien_facebook"
              name="lien_facebook"
              value={formData.lien_facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              disabled={loading}
            />
          </div>
        </div>

        {/* Section Parcours académique */}
        <div className="form-section">
          <h3>Parcours académique</h3>

          <div className="form-group">
            <label htmlFor="etablissement_origine">Établissement d'origine</label>
            <input
              type="text"
              id="etablissement_origine"
              name="etablissement_origine"
              value={formData.etablissement_origine}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="annee_baccalaureat">Année du Baccalauréat</label>
              <input
                type="number"
                id="annee_baccalaureat"
                name="annee_baccalaureat"
                value={formData.annee_baccalaureat}
                onChange={handleChange}
                min="1990"
                max="2030"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="annee_inscription_universitaire">Année d'inscription universitaire</label>
              <input
                type="number"
                id="annee_inscription_universitaire"
                name="annee_inscription_universitaire"
                value={formData.annee_inscription_universitaire}
                onChange={handleChange}
                min="1990"
                max="2030"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="universite">Université</label>
            <input
              type="text"
              id="universite"
              name="universite"
              value={formData.universite}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="filiere">Filière</label>
              <input
                type="text"
                id="filiere"
                name="filiere"
                value={formData.filiere}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="niveau_etude">Niveau d'étude</label>
              <select
                id="niveau_etude"
                name="niveau_etude"
                value={formData.niveau_etude}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Sélectionner...</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
                <option value="Doctorat">Doctorat</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  );
};

ProfileEditForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProfileEditForm;

// Made with Bob