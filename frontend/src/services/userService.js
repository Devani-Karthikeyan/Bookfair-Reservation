// Mock Data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'VENDOR', status: 'ACTIVE', joinedDate: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'PUBLISHER', status: 'ACTIVE', joinedDate: '2025-01-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'VENDOR', status: 'DISABLED', joinedDate: '2025-02-01' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'PUBLISHER', status: 'ACTIVE', joinedDate: '2025-02-10' },
    { id: 5, name: 'Admin User', email: 'admin@bookfair.com', role: 'EMPLOYEE', status: 'ACTIVE', joinedDate: '2024-12-01' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
    getAllUsers: async () => {
        await delay(500);
        return [...users];
    },

    getUserById: async (id) => {
        await delay(300);
        return users.find(u => u.id === parseInt(id));
    },

    updateUserStatus: async (id, status) => {
        await delay(500);
        users = users.map(user =>
            user.id === parseInt(id) ? { ...user, status } : user
        );
        return users.find(u => u.id === parseInt(id));
    },

    // Used for filtering on frontend for now, or could simulate backend filter
    filterUsers: async (role) => {
        await delay(300);
        if (!role || role === 'ALL') return [...users];
        return users.filter(u => u.role === role);
    }
};
