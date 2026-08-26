import api from '../api/axiosConfig';
const unwrap = response => response.data.data || [];
const mapUser = user => ({ ...user, name: user.name || [user.firstName, user.lastName].filter(Boolean).join(' '), role: user.role || user.roles });

export const userService = {
    getAllUsers: async () => {
        return unwrap(await api.get('/admin/users/allusers')).map(mapUser);
    },

    getUserById: async (id) => {
        return mapUser((await api.get(`/admin/users/user=${id}`)).data.data);
    },

    updateUserStatus: async (id, status) => {
        const endpoint = status === 'ACTIVE' ? 'enable' : 'disable';
        await api.put(`/admin/users/${endpoint}/user=${id}`);
        return userService.getUserById(id);
    },

    // Used for filtering on frontend for now, or could simulate backend filter
    filterUsers: async (role) => {
        const users = await userService.getAllUsers();
        if (!role || role === 'ALL') return users;
        return users.filter(user => user.role === role);
    }
};
