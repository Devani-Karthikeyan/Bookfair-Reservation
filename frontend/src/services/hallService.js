import api from '../api/axiosConfig';

const unwrap = response => response.data.data || [];
const mapHall = hall => ({ ...hall, name: hall.name || hall.hallName, description: hall.description || '' });

export const hallService = {
    getAllHalls: async () => {
        const response = await api.get('/halls/get/allhall');
        return unwrap(response).map(mapHall);
    },

    getHallById: async (id) => {
        const response = await api.get(`/halls/get/hall=${id}`);
        return mapHall(response.data.data);
    },

    createHall: async (hallData) => {
        const response = await api.post('/halls/create', { hallName: hallData.name, description: hallData.description });
        return mapHall(response.data.data);
    },

    updateHall: async (id, hallData) => {
        const response = await api.put(`/halls/update/hall=${id}`, { id, hallName: hallData.name, description: hallData.description });
        return mapHall(response.data.data);
    },

    deleteHall: async (id) => {
        await api.delete(`/halls/delete/hall=${id}`);
        return true;
    }
};
