import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const normalizeGenre = (genre = {}) => ({
    id: genre.id,
    name: genre.name,
    description: genre.description || ''
});

export const genreService = {
    getAllGenres: async () => {
        const response = await api.get('/genres/allgenres');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeGenre) : [];
    },

    getGenreById: async (id) => {
        const response = await api.get(`/genres/get/genre=${id}`);
        return normalizeGenre(unwrap(response));
    },

    createGenre: async (genreData) => {
        const payload = {
            name: genreData.name,
            description: genreData.description || ''
        };
        const response = await api.post('/genres/add/genre', payload);
        return normalizeGenre(unwrap(response));
    },

    updateGenre: async (id, genreData) => {
        const payload = {
            name: genreData.name,
            description: genreData.description || ''
        };
        const response = await api.put(`/genres/update=${id}`, payload);
        return normalizeGenre(unwrap(response));
    },

    deleteGenre: async (id) => {
        await api.delete(`/genres/delete/genre=${id}`);
        return true;
    }
};
