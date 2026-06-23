import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ============================================
// INTERCEPTORS
// ============================================

// Request interceptor - Add auth token to all requests
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

// Response interceptor - Handle token refresh and errors
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
          const response = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
            refresh: refreshToken
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to home
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    // For other 401 errors or if refresh failed
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/';
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
      if (refreshToken) {
        await api.post('/users/logout/', { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
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
   */
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile/', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  /**
   * Change password
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
// MEMBERS API
// ============================================

export const membersAPI = {
  /**
   * Get all users/members (Admin/Bureau only)
   */
  getAll: async (params = {}) => {
    const response = await api.get('/users/', { params });
    return response.data;
  },

  /**
   * Get user/member by ID
   */
  getById: async (id) => {
    const response = await api.get(`/users/${id}/`);
    return response.data;
  },

  /**
   * Search members
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
  getAll: async (params = {}) => {
    const response = await api.get('/activities/', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/activities/${id}/`);
    return response.data;
  },

  create: async (activityData) => {
    const response = await api.post('/activities/', activityData);
    return response.data;
  },

  update: async (id, activityData) => {
    const response = await api.put(`/activities/${id}/`, activityData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/activities/${id}/`);
    return response.data;
  },
};

// ============================================
// DOCUMENTS API
// ============================================

export const documentsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/documents/', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/documents/${id}/`);
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/documents/${id}/`);
    return response.data;
  },

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
  getAll: async (params = {}) => {
    const response = await api.get('/gallery/', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/gallery/${id}/`);
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/gallery/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}/`);
    return response.data;
  },
};

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {
  send: async (messageData) => {
    const response = await api.post('/contact/', messageData);
    return response.data;
  },
};

// ============================================
// NOTIFICATIONS API
// ============================================

export const notificationsAPI = {
  getAll: async () => {
    const response = await api.get('/notifications/');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read/`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all/');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/notifications/${id}/`);
    return response.data;
  },
};

export default api;

// Made with Bob
