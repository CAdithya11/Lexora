import axios from 'axios';
import { useNavigate } from 'react-router';

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const API_URL = 'http://localhost:8080/api/v1/auth';

export const authService = {
  register: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    window.location.reload();
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
};
