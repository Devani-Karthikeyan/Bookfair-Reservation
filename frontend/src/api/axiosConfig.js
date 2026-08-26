import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let refreshPromise = null;

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status !== 401 || originalRequest?._retry || originalRequest?.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        refreshPromise ||= api.get('/auth/refresh');
        try {
            await refreshPromise;
            return api(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem('userRole');
            return Promise.reject(refreshError);
        } finally {
            refreshPromise = null;
        }
    }
);

export default api;