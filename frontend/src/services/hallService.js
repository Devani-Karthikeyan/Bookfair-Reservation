import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const parseDescription = (description = '') => {
    const match = { location: '', capacity: '', status: '' };
    if (!description) return match;

    const locationMatch = description.match(/Location\s*:\s*([^|]+)/i);
    const capacityMatch = description.match(/Capacity\s*:\s*(\d+)/i);
    const statusMatch = description.match(/Status\s*:\s*([^|]+)/i);

    if (locationMatch) match.location = locationMatch[1].trim();
    if (capacityMatch) match.capacity = capacityMatch[1].trim();
    if (statusMatch) match.status = statusMatch[1].trim().toUpperCase();

    return match;
};

const normalizeHall = (hall = {}) => {
    const descriptionMeta = parseDescription(hall.description);

    return {
        id: hall.id,
        name: hall.hallName || hall.name || 'Unnamed Hall',
        hallName: hall.hallName || hall.name || 'Unnamed Hall',
        capacity: hall.capacity ?? Number(descriptionMeta.capacity || 0),
        location: hall.location || descriptionMeta.location || '',
        status: hall.status || descriptionMeta.status || 'ACTIVE',
        description: hall.description || ''
    };
};

const toPayload = (hallData = {}) => {
    const descriptionParts = [];
    if (hallData.location) descriptionParts.push(`Location: ${hallData.location}`);
    if (hallData.capacity !== undefined && hallData.capacity !== '') descriptionParts.push(`Capacity: ${hallData.capacity}`);
    if (hallData.status) descriptionParts.push(`Status: ${hallData.status}`);

    return {
        hallName: hallData.name || hallData.hallName || '',
        description: hallData.description || descriptionParts.join(' | ')
    };
};

export const hallService = {
    getAllHalls: async () => {
        const response = await api.get('/halls/get/allhall');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeHall) : [];
    },

    getHallById: async (id) => {
        const response = await api.get(`/halls/get/hall=${id}`);
        return normalizeHall(unwrap(response));
    },

    createHall: async (hallData) => {
        const response = await api.post('/halls/create', toPayload(hallData));
        return normalizeHall(unwrap(response));
    },

    updateHall: async (id, hallData) => {
        const response = await api.put(`/halls/update/hall=${id}`, toPayload(hallData));
        return normalizeHall(unwrap(response));
    },

    deleteHall: async (id) => {
        await api.delete(`/halls/delete/hall=${id}`);
        return true;
    }
};
