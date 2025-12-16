import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Add a request interceptor to attach the Token
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
