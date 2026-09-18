import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const normalizeStatus = (status = '') => {
    const value = String(status).toUpperCase();
    if (value === 'MAINTENANCE') return 'BOOKED';
    return value;
};

const normalizeSize = (size = '') => {
    const value = String(size).toUpperCase();
    if (value === '10X10' || value === '15X15') return 'MEDIUM';
    if (value === 'LARGE') return 'LARGE';
    return value || 'SMALL';
};

const normalizeStall = (stall = {}) => ({
    id: stall.id,
    name: stall.stallName || stall.name,
    hallId: stall.hall?.id ?? stall.hallId ?? '',
    hallName: stall.hall?.hallName || stall.hallName || '',
    size: stall.size || 'SMALL',
    price: Number(stall.price ?? 0),
    status: normalizeStatus(stall.status),
    description: stall.description || '',
    reservedBy: stall.reservedBy || null
});

const toPayload = (stallData = {}) => {
    const hallId = stallData.hallId ? Number(stallData.hallId) : null;
    const payload = {
        stallName: stallData.name || stallData.stallName || '',
        size: normalizeSize(stallData.size),
        status: normalizeStatus(stallData.status || 'AVAILABLE'),
        price: Number(stallData.price ?? 0),
        description: stallData.description || '',
    };

    if (hallId) {
        payload.hall = { id: hallId };
    }

    return payload;
};

export const stallService = {
    getAllStalls: async () => {
        const response = await api.get('/stalls/allstalls');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeStall) : [];
    },

    getStallsByHall: async (hallId) => {
        const response = await api.get(`/stalls/available/hall/hallid=${hallId}`);
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeStall) : [];
    },

    createStall: async (stallData) => {
        const response = await api.post('/stalls/create', toPayload(stallData));
        return normalizeStall(unwrap(response));
    },

    updateStall: async (id, stallData) => {
        const response = await api.put(`/stalls/update/stallid=${id}`, toPayload(stallData));
        return normalizeStall(unwrap(response));
    },

    deleteStall: async (id) => {
        await api.delete(`/stalls/delete/stallid=${id}`);
        return true;
    },

    getAvailableStalls: async () => {
        const response = await api.get('/stalls/allstalls');
        const data = unwrap(response);
        return Array.isArray(data) ? data.filter((stall) => normalizeStatus(stall.status) === 'AVAILABLE').map(normalizeStall) : [];
    }
};
