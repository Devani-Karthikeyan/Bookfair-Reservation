import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.msg || error?.response?.data?.message || error?.message || 'Request failed';
        return Promise.reject(new Error(message));
    }
);

export default api;