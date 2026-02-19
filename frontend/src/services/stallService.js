// Mock Data
let stalls = [
    { id: 1, name: 'A-01', hallId: 1, hallName: 'Main Exhibition Hall', size: '10x10', price: 5000, status: 'AVAILABLE' },
    { id: 2, name: 'A-02', hallId: 1, hallName: 'Main Exhibition Hall', size: '10x10', price: 5000, status: 'BOOKED' },
    { id: 3, name: 'B-01', hallId: 2, hallName: 'Conference Hall B', size: '15x15', price: 8000, status: 'AVAILABLE' },
    { id: 4, name: 'B-02', hallId: 2, hallName: 'Conference Hall B', size: '15x15', price: 8000, status: 'MAINTENANCE' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const stallService = {
    getAllStalls: async () => {
        await delay(500);
        return [...stalls];
    },

    getStallsByHall: async (hallId) => {
        await delay(300);
        return stalls.filter(s => s.hallId === parseInt(hallId));
    },

    createStall: async (stallData) => {
        await delay(600);
        const newStall = {
            id: stalls.length + 1,
            ...stallData,
            status: 'AVAILABLE'
        };
        stalls.push(newStall);
        return newStall;
    },

    updateStall: async (id, stallData) => {
        await delay(500);
        stalls = stalls.map(s =>
            s.id === parseInt(id) ? { ...s, ...stallData } : s
        );
        return stalls.find(s => s.id === parseInt(id));
    },

    deleteStall: async (id) => {
        await delay(400);
        stalls = stalls.filter(s => s.id !== parseInt(id));
        return true;
    },

    getAvailableStalls: async () => {
        await delay(300);
        return stalls.filter(s => s.status === 'AVAILABLE');
    }
};
