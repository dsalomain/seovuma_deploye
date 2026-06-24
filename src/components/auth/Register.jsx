import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import './Register.css';

const COMMUNES = [
  'Vavatenina',
  'Andasibe',
  'Ampasimazava',
  'Ambatoharanana I',
  'Ambohibe',
  'Sahatavy',
  'Anjahambe',
  'Antanamarina',
  'Ambodimangavalo',
  'Miarinarivo',
  'Maromitety',
  'Autres',
];

const Register = ({ onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    nom: '',
    prenom: '',
    telephone: '',
    commune: '',
    lien_facebook: '',
    etablissement_origine: '',
    annee_baccalaureat: '',
    annee_inscription_universitaire: '',
    universite: '',
    filiere: '',
    niveau_etude: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

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

    // Required fields
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.nom) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.prenom) {
      newErrors.prenom = 'Le prénom est requis';
    }

    if (!formData.telephone) {
      newErrors.telephone = 'Le téléphone est requis';
    }

    if (!formData.commune) {
      newErrors.commune = 'La commune est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data - convert empty strings to null for optional fields
      const submitData = {
        ...formData,
        annee_baccalaureat: formData.annee_baccalaureat ? parseInt(formData.annee_baccalaureat) : null,
        annee_inscription_universitaire: formData.annee_inscription_universitaire ? parseInt(formData.annee_inscription_universitaire) : null,
      };

      console.log("📤 Données envoyées au serveur :", submitData); // 👈 DEBUG

      const response = await register(submitData);
      console.log("✅ Réponse du serveur :", response); // 👈 DEBUG
      
      onClose();
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error("❌ Erreur détaillée :", error.response || error); // 👈 DEBUG
      setGeneralError(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal auth-modal-large" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="auth-modal-content">
          <h2>Inscription</h2>
          <p className="auth-modal-subtitle">
            Rejoignez la communauté SEOVUMA
          </p>

          {generalError && (
            <div className="auth-error-message">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Section: Informations de connexion */}
            <div className="form-section">
              <h3>Informations de connexion</h3>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="votre.email@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Mot de passe *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirm">Confirmer le mot de passe *</label>
                  <input
                    type="password"
                    id="password_confirm"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    className={errors.password_confirm ? 'error' : ''}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  {errors.password_confirm && (
                    <span className="error-text">{errors.password_confirm}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Informations personnelles */}
            <div className="form-section">
              <h3>Informations personnelles</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={errors.nom ? 'error' : ''}
                    placeholder="Votre nom"
                    disabled={loading}
                  />
                  {errors.nom && (
                    <span className="error-text">{errors.nom}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={errors.prenom ? 'error' : ''}
                    placeholder="Votre prénom"
                    disabled={loading}
                  />
                  {errors.prenom && (
                    <span className="error-text">{errors.prenom}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone *</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className={errors.telephone ? 'error' : ''}
                    placeholder="+261 XX XX XXX XX"
                    disabled={loading}
                  />
                  {errors.telephone && (
                    <span className="error-text">{errors.telephone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="commune">Commune *</label>
                  <select
                    id="commune"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    className={errors.commune ? 'error' : ''}
                    disabled={loading}
                  >
                    <option value="">Sélectionnez une commune</option>
                    {COMMUNES.map(commune => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                  {errors.commune && (
                    <span className="error-text">{errors.commune}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lien_facebook">Lien Facebook (optionnel)</label>
                <input
                  type="url"
                  id="lien_facebook"
                  name="lien_facebook"
                  value={formData.lien_facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/votre-profil"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Section: Informations académiques */}
            <div className="form-section">
              <h3>Informations académiques (optionnel)</h3>
              
              <div className="form-group">
                <label htmlFor="etablissement_origine">Établissement d'origine</label>
                <input
                  type="text"
                  id="etablissement_origine"
                  name="etablissement_origine"
                  value={formData.etablissement_origine}
                  onChange={handleChange}
                  placeholder="Lycée/Collège d'origine"
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
                    placeholder="2020"
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
                    placeholder="2020"
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
                  placeholder="Nom de votre université"
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
                    placeholder="Votre filière d'étude"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="niveau_etude">Niveau d'étude</label>
                  <input
                    type="text"
                    id="niveau_etude"
                    name="niveau_etude"
                    value={formData.niveau_etude}
                    onChange={handleChange}
                    placeholder="L1, L2, L3, M1, M2..."
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
          </form>

          <div className="auth-modal-footer">
            <p>
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                className="auth-link"
                onClick={onSwitchToLogin}
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// Made with Bob