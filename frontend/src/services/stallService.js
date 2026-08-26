import api from '../api/axiosConfig';
const unwrap = response => response.data.data || [];
const mapStall = stall => ({ ...stall, name: stall.name || stall.stallName, hallId: stall.hallId || stall.hall?.id, hallName: stall.hallName || stall.hall?.hallName });
const toPayload = stall => ({ stallName: stall.name || stall.stallName, size: String(stall.size).toUpperCase(), price: Number(stall.price), status: String(stall.status).toUpperCase(), description: stall.description, hall: { id: Number(stall.hallId) } });

export const stallService = {
    getAllStalls: async () => {
        return unwrap(await api.get('/stalls/allstalls')).map(mapStall);
    },

    getStallsByHall: async (hallId) => {
        return unwrap(await api.get(`/stalls/available/hall/hallid=${hallId}`)).map(mapStall);
    },

    createStall: async (stallData) => {
        return mapStall((await api.post('/stalls/create', toPayload(stallData))).data.data);
    },

    updateStall: async (id, stallData) => {
        return mapStall((await api.put(`/stalls/update/stallid=${id}`, toPayload(stallData))).data.data);
    },

    deleteStall: async (id) => {
        await api.delete(`/stalls/delete/stallid=${id}`);
        return true;
    },

    getAvailableStalls: async () => {
        return unwrap(await api.get('/stalls/allstalls')).map(mapStall).filter(stall => stall.status === 'AVAILABLE');
    }
};
