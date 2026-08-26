import api from '../api/axiosConfig';
const unwrap = response => response.data.data || [];

export const genreService = {
    getAllGenres: async () => {
        return unwrap(await api.get('/genres/allgenres'));
    },

    getGenreById: async (id) => {
        return (await api.get(`/genres/get/genre=${id}`)).data.data;
    },

    createGenre: async (genreData) => {
        return (await api.post('/genres/add/genre', genreData)).data.data;
    },

    updateGenre: async (id, genreData) => {
        return (await api.put(`/genres/update=${id}`, genreData)).data.data;
    },

    deleteGenre: async (id) => {
        await api.delete(`/genres/delete/genre=${id}`);
        return true;
    }
};
