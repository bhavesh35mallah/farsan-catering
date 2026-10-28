import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach admin JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('farsan_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.message || error.message || 'An unexpected error occurred. Please try again.';
    return Promise.reject(new Error(customMessage));
  }
);

export default api;
