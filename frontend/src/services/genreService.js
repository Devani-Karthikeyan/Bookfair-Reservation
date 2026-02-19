// Mock Data
let genres = [
    { id: 1, name: 'Fiction', description: 'Novels and short stories' },
    { id: 2, name: 'Non-Fiction', description: 'Educational and factual books' },
    { id: 3, name: 'Science & Tech', description: 'Technical and scientific publications' },
    { id: 4, name: 'Children', description: 'Books for kids' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const genreService = {
    getAllGenres: async () => {
        await delay(400);
        return [...genres];
    },

    getGenreById: async (id) => {
        await delay(200);
        return genres.find(g => g.id === parseInt(id));
    },

    createGenre: async (genreData) => {
        await delay(500);
        const newGenre = {
            id: genres.length + 1,
            ...genreData
        };
        genres.push(newGenre);
        return newGenre;
    },

    updateGenre: async (id, genreData) => {
        await delay(400);
        genres = genres.map(g =>
            g.id === parseInt(id) ? { ...g, ...genreData } : g
        );
        return genres.find(g => g.id === parseInt(id));
    },

    deleteGenre: async (id) => {
        await delay(300);
        genres = genres.filter(g => g.id !== parseInt(id));
        return true;
    }
};
