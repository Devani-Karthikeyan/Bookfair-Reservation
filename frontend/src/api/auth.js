// api/auth.js
import api from './axiosConfig';

export const login = async (loginData) => {
    try {
        const response = await api.post('/auth/login', loginData);
        return response.data;
    } catch (err) {
        if (err.response) return err.response.data;
        return { statusCode: 500, msg: 'Server error' };
    }
};

export const signup = async (signupData) => {
    try {
        const response = await api.post('/auth/signup', signupData);
        return response.data;
    } catch (err) {
        if (err.response) return err.response.data;
        return { statusCode: 500, msg: 'Server error' };
    }
};
