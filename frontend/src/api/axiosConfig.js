import axios from 'axios';

// Create an instance, but since we are mocking APIs directly in the modules, 
// this is mostly a placeholder or for any un-mocked calls (which shouldn't exist).
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // DISABLED for Frontend-Only Mode
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true // Not needed for mock mode
});

export default api;