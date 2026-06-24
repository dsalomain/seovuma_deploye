import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const SANCTUM_BASE_URL = import.meta.env.VITE_SANCTUM_URL || 'http://localhost:8000';

// Create axios instance with default config for Laravel Sanctum
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Important for Sanctum - sends cookies
  withXSRFToken: true, // Important for CSRF protection
});

// Set global defaults
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// ============================================
// INTERCEPTORS
// ============================================

// Request interceptor - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// CSRF TOKEN HELPER
// ============================================

const getCsrfToken = async () => {
  try {
    await axios.get(`${SANCTUM_BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
  }
};

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    await getCsrfToken();
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    await getCsrfToken();
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/user');
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    }
    throw new Error('User not found');
  },

  /**
   * Refresh token
   */
  refresh: async () => {
    const response = await api.post('/auth/refresh');
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
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
// USERS API
// ============================================

export const usersAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  assignRole: async (id, role) => {
    const response = await api.post(`/users/${id}/assign-role`, { role });
    return response.data;
  },

  removeRole: async (id, role) => {
    const response = await api.post(`/users/${id}/remove-role`, { role });
    return response.data;
  },
};

// ============================================
// MEMBERS API
// ============================================

export const membersAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/members', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  create: async (memberData) => {
    const response = await api.post('/members', memberData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, memberData) => {
    const response = await api.post(`/members/${id}`, memberData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  },

  attachProjects: async (id, projectIds) => {
    const response = await api.post(`/members/${id}/attach-projects`, {
      project_ids: projectIds,
    });
    return response.data;
  },

  detachProjects: async (id, projectIds) => {
    const response = await api.post(`/members/${id}/detach-projects`, {
      project_ids: projectIds,
    });
    return response.data;
  },
};

// ============================================
// UNIVERSITIES API
// ============================================

export const universitiesAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/universities', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/universities/${id}`);
    return response.data;
  },

  create: async (universityData) => {
    const response = await api.post('/universities', universityData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, universityData) => {
    const response = await api.post(`/universities/${id}`, universityData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/universities/${id}`);
    return response.data;
  },

  getMembers: async (id) => {
    const response = await api.get(`/universities/${id}/members`);
    return response.data;
  },

  getProjects: async (id) => {
    const response = await api.get(`/universities/${id}/projects`);
    return response.data;
  },
};

// ============================================
// PROJECTS API
// ============================================

export const projectsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (projectData) => {
    const response = await api.post('/projects', projectData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, projectData) => {
    const response = await api.post(`/projects/${id}`, projectData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  attachMembers: async (id, memberIds) => {
    const response = await api.post(`/projects/${id}/attach-members`, {
      member_ids: memberIds,
    });
    return response.data;
  },

  detachMembers: async (id, memberIds) => {
    const response = await api.post(`/projects/${id}/detach-members`, {
      member_ids: memberIds,
    });
    return response.data;
  },

  attachUniversities: async (id, universityIds) => {
    const response = await api.post(`/projects/${id}/attach-universities`, {
      university_ids: universityIds,
    });
    return response.data;
  },

  detachUniversities: async (id, universityIds) => {
    const response = await api.post(`/projects/${id}/detach-universities`, {
      university_ids: universityIds,
    });
    return response.data;
  },
};

// ============================================
// NEWS API
// ============================================

export const newsAPI = {
  // Public endpoints
  getPublished: async (params = {}) => {
    const response = await api.get('/news/published', { params });
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await api.get(`/news/${slug}`);
    return response.data;
  },

  // Protected endpoints
  getAll: async (params = {}) => {
    const response = await api.get('/news', { params });
    return response.data;
  },

  create: async (newsData) => {
    const response = await api.post('/news', newsData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, newsData) => {
    const response = await api.post(`/news/${id}`, newsData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },

  publish: async (id) => {
    const response = await api.post(`/news/${id}/publish`);
    return response.data;
  },

  archive: async (id) => {
    const response = await api.post(`/news/${id}/archive`);
    return response.data;
  },
};

// ============================================
// CONTACT API
// ============================================

export const contactAPI = {
  // Public endpoint
  send: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  // Protected endpoints
  getAll: async (params = {}) => {
    const response = await api.get('/contacts', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },

  markAsReplied: async (id) => {
    const response = await api.post(`/contacts/${id}/mark-replied`);
    return response.data;
  },

  archive: async (id) => {
    const response = await api.post(`/contacts/${id}/archive`);
    return response.data;
  },

  getPendingCount: async () => {
    const response = await api.get('/contacts/pending-count');
    return response.data;
  },

  getRecent: async (limit = 5) => {
    const response = await api.get('/contacts/recent', { params: { limit } });
    return response.data;
  },
};

export default api;
