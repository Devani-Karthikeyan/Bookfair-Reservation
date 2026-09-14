import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const normalizeUser = (user = {}) => ({
    id: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'Unknown User',
    email: user.email || '',
    role: user.roles || user.role || 'PUBLISHER',
    status: user.active === false ? 'DISABLED' : 'ACTIVE',
    joinedDate: user.createdAt || user.joinedDate || ''
});

export const userService = {
    getAllUsers: async () => {
        const response = await api.get('/admin/users/allusers');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeUser) : [];
    },

    getUserById: async (id) => {
        const response = await api.get(`/admin/users/user=${id}`);
        return normalizeUser(unwrap(response));
    },

    updateUserStatus: async (id, status) => {
        const endpoint = status === 'DISABLED' ? `/admin/users/disable/user=${id}` : `/admin/users/enable/user=${id}`;
        const response = await api.put(endpoint);
        return normalizeUser(unwrap(response));
    },

    filterUsers: async (role) => {
        const users = await userService.getAllUsers();
        if (!role || role === 'ALL') return users;
        return users.filter((user) => user.role === role);
    }
};
