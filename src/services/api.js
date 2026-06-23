import axios from 'axios';

// Base API URL - will be configured based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';
//const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://jdjqy-102-18-48-23.run.pinggy-free.link/ ';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          // Try to refresh the token
          const response = await api.post('/users/token/refresh/', {
            refresh: refreshToken
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // For other errors or if refresh failed
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email (required)
   * @param {string} userData.password - User password (required)
   * @param {string} userData.password_confirm - Password confirmation (required)
   * @param {string} userData.nom - Last name (required)
   * @param {string} userData.prenom - First name (required)
   * @param {string} userData.telephone - Phone number (required)
   * @param {string} userData.lien_facebook - Facebook link (optional)
   * @param {string} userData.etablissement_origine - Origin school (optional)
   * @param {number} userData.annee_baccalaureat - Baccalaureate year (optional)
   * @param {number} userData.annee_inscription_universitaire - University enrollment year (optional)
   * @param {string} userData.universite - University (optional)
   * @param {string} userData.filiere - Field of study (optional)
   * @param {string} userData.niveau_etude - Study level (optional)
   * @param {string} userData.commune - Commune (optional)
   */
  register: async (userData) => {
    const response = await api.post('/users/register/', userData);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   */
  login: async (credentials) => {
    const response = await api.post('/users/login/', credentials);
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      await api.post('/users/logout/', { refresh_token: refreshToken });
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    const response = await api.get('/users/profile/');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Update user profile
   * @param {Object} userData - Updated user data
   */
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile/', userData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.old_password - Current password
   * @param {string} passwordData.new_password - New password
   * @param {string} passwordData.new_password_confirm - New password confirmation
   */
  changePassword: async (passwordData) => {
    const response = await api.post('/users/change-password/', passwordData);
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post('/users/token/refresh/', {
      refresh: refreshToken
    });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      if (response.data.refresh) {
        localStorage.setItem('refresh_token', response.data.refresh);
      }
    }
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Get stored user data
   */
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ============================================
// USERS/MEMBERS API
// ============================================

export const membersAPI = {
  /**
   * Get all users/members (Admin/Bureau only)
   * @param {Object} params - Query parameters
   * @param {string} params.role - Filter by role (ADMIN, BUREAU, MEMBRE)
   * @param {string} params.commune - Filter by commune
   * @param {string} params.search - Search by name or email
   */
  getAll: async (params = {}) => {
    const response = await api.get('/users/', { params });
    return response.data;
  },

  /**
   * Get user/member by ID
   * @param {number} id - User ID
   */
  getById: async (id) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },

  /**
   * Get members by role
   * @param {string} role - Role to filter (ADMIN, BUREAU, MEMBRE)
   */
  getByRole: async (role) => {
    const response = await api.get('/users/', {
      params: { role }
    });
    return response.data;
  },

  /**
   * Get members by commune
   * @param {string} commune - Commune name
   */
  getByCommune: async (commune) => {
    const response = await api.get('/users/', {
      params: { commune }
    });
    return response.data;
  },

  /**
   * Search members
   * @param {string} searchTerm - Search term (name or email)
   */
  search: async (searchTerm) => {
    const response = await api.get('/users/', {
      params: { search: searchTerm }
    });
    return response.data;
  },
};

// ============================================
// ACTIVITIES API
// ============================================

export const activitiesAPI = {
  // Get all activities
  getAll: async (params = {}) => {
    const response = await api.get('/activities/', { params });
    return response.data;
  },

  // Get activity by ID
  getById: async (id) => {
    const response = await api.get(`/activities/${id}/`);
    return response.data;
  },

  // Create activity
  create: async (activityData) => {
    const response = await api.post('/activities/', activityData);
    return response.data;
  },

  // Update activity
  update: async (id, activityData) => {
    const response = await api.put(`/activities/${id}/`, activityData);
    return response.data;
  },

  // Delete activity
  delete: async (id) => {
    const response = await api.delete(`/activities/${id}/`);
    return response.data;
  },

  // Get upcoming events
  getUpcoming: async () => {
    const response = await api.get('/activities/upcoming/');
    return response.data;
  },

  // Get past events
  getPast: async () => {
    const response = await api.get('/activities/past/');
    return response.data;
  },
};

// ============================================
// DOCUMENTS API
// ============================================

export const documentsAPI = {
  // Get all documents
  getAll: async (params = {}) => {
    const response = await api.get('/documents/', { params });
    return response.data;
  },

  // Get document by ID
  getById: async (id) => {
    const response = await api.get(`/documents/${id}/`);
    return response.data;
  },

  // Upload document
  upload: async (formData) => {
    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete document
  delete: async (id) => {
    const response = await api.delete(`/documents/${id}/`);
    return response.data;
  },

  // Download document
  download: async (id) => {
    const response = await api.get(`/documents/${id}/download/`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// ============================================
// GALLERY API
// ============================================

export const galleryAPI = {
  // Get all images
  getAll: async (params = {}) => {
    const response = await api.get('/gallery/', { params });
    return response.data;
  },

  // Get image by ID
  getById: async (id) => {
    const response = await api.get(`/gallery/${id}/`);
    return response.data;
  },

  // Upload image
  upload: async (formData) => {
    const response = await api.post('/gallery/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete image
  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}/`);
    return response.data;
  },

  // Get images by category
  getByCategory: async (category) => {
    const response = await api.get('/gallery/', {
      params: { category }
    });
    return response.data;
  },
};

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {
  // Send contact message
  send: async (messageData) => {
    const response = await api.post('/contact/', messageData);
    return response.data;
  },
};

// ============================================
// NOTIFICATIONS API
// ============================================

export const notificationsAPI = {
  // Get all notifications
  getAll: async () => {
    const response = await api.get('/notifications/');
    return response.data;
  },

  // Mark as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read/`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all/');
    return response.data;
  },

  // Delete notification
  delete: async (id) => {
    const response = await api.delete(`/notifications/${id}/`);
    return response.data;
  },
};

export default api;

// Made with Bob
