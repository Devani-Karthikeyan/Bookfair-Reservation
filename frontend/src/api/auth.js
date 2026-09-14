// api/auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth';

const normalizeRole = (value) => {
    if (Array.isArray(value)) return normalizeRole(value[0]);
    const role = String(value ?? '').toUpperCase().replace('ROLE_', '').trim();
    return role || 'USER';
};

const getRoleFromPayload = (payload) => {
    if (!payload) return 'USER';
    if (typeof payload === 'string') return normalizeRole(payload);
    if (payload.role) return normalizeRole(payload.role);
    if (payload.roles) return normalizeRole(payload.roles);
    if (payload.data) return getRoleFromPayload(payload.data);
    return 'USER';
};

const parseRoleFromSetCookie = (headers = {}) => {
    const cookies = headers['set-cookie'] || headers['Set-Cookie'] || [];

    if (typeof cookies === 'string') {
        const cookieHeader = cookies.split(',').find((item) => item.includes('USER_ROLE='));
        if (!cookieHeader) return null;
        const cookieValue = cookieHeader.split(';')[0].split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }

    if (Array.isArray(cookies)) {
        const userRoleCookie = cookies.find((cookie) => String(cookie).includes('USER_ROLE='));
        if (!userRoleCookie) return null;
        const cookieValue = userRoleCookie.split(';')[0].split('=')[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }

    return null;
};

export const login = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, loginData, {
            withCredentials: true,
        });

        const payload = response.data ?? {};
        const role = parseRoleFromSetCookie(response.headers) || getRoleFromPayload(payload);
        const normalizedRole = normalizeRole(role);

        if (normalizedRole !== 'USER') {
            localStorage.setItem('userRole', normalizedRole);
        }

        return {
            ...payload,
            role: normalizedRole
        };
    } catch (err) {
        if (err.response) {
            const payload = err.response.data ?? {};
            const role = parseRoleFromSetCookie(err.response.headers) || getRoleFromPayload(payload);
            const normalizedRole = normalizeRole(role);
            return {
                ...payload,
                role: normalizedRole
            };
        }
        return { statusCode: 500, msg: 'Server error', role: 'USER' };
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
