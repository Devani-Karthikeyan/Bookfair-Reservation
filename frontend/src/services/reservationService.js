// Mock Data
let reservations = [
    { id: 501, userName: 'John Doe', stallName: 'A-02', date: '2025-02-15', status: 'CONFIRMED', type: 'VENDOR' },
    { id: 502, userName: 'Jane Smith', stallName: 'B-01', date: '2025-02-16', status: 'PENDING', type: 'PUBLISHER' },
    { id: 503, userName: 'Mike Johnson', stallName: 'A-05', date: '2025-02-18', status: 'CANCELLED', type: 'VENDOR' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reservationService = {
    getAllReservations: async () => {
        await delay(600);
        return [...reservations];
    },

    getReservationById: async (id) => {
        await delay(300);
        return reservations.find(r => r.id === parseInt(id));
    },

    createReservation: async (data) => {
        await delay(600);
        const newReservation = {
            id: reservations.length + 500,
            ...data,
            status: 'PENDING'
        };
        reservations.push(newReservation);
        return newReservation;
    },

    cancelReservation: async (id) => {
        await delay(500);
        reservations = reservations.map(r =>
            r.id === parseInt(id) ? { ...r, status: 'CANCELLED' } : r
        );
        return reservations.find(r => r.id === parseInt(id));
    },

    deleteReservation: async (id) => {
        await delay(400);
        reservations = reservations.filter(r => r.id !== parseInt(id));
        return true;
    }
};
