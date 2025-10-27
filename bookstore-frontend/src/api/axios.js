import axios from 'axios';
import { API_URLS } from "../config";

const api = axios.create({
  baseURL: API_URLS.gateway,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
