// api/auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your backend URL

export const login = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData, {
            withCredentials: true, // This allows cookies (ACCESS_TOKEN etc.) to be stored
        });
        return response.data; // GeneralResponseDto from backend
    } catch (err) {
        if (err.response) return err.response.data;
        return { statusCode: 500, msg: 'Server error' };
    }
};

export const signup = async (signupData) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, signupData, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        if (err.response) return err.response.data;
        return { statusCode: 500, msg: 'Server error' };
    }
};
