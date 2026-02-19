// Mock Data
let halls = [
    { id: 1, name: 'Main Exhibition Hall', capacity: 500, location: 'Building A, Ground Floor', status: 'ACTIVE' },
    { id: 2, name: 'Conference Hall B', capacity: 200, location: 'Building B, 1st Floor', status: 'ACTIVE' },
    { id: 3, name: 'Open Air Arena', capacity: 1000, location: 'Outdoor Complex', status: 'MAINTENANCE' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const hallService = {
    getAllHalls: async () => {
        await delay(500);
        return [...halls];
    },

    getHallById: async (id) => {
        await delay(300);
        return halls.find(h => h.id === parseInt(id));
    },

    createHall: async (hallData) => {
        await delay(600);
        const newHall = {
            id: halls.length + 1,
            ...hallData,
            status: 'ACTIVE'
        };
        halls.push(newHall);
        return newHall;
    },

    updateHall: async (id, hallData) => {
        await delay(500);
        halls = halls.map(h =>
            h.id === parseInt(id) ? { ...h, ...hallData } : h
        );
        return halls.find(h => h.id === parseInt(id));
    },

    deleteHall: async (id) => {
        await delay(400);
        halls = halls.filter(h => h.id !== parseInt(id));
        return true;
    }
};
