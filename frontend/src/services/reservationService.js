import api from '../api/axiosConfig';
const unwrap = response => response.data.data || [];
const mapReservation = reservation => ({ ...reservation, userName: reservation.userName || reservation.user?.email, stallName: reservation.stallName || reservation.stall?.stallName, type: reservation.type || reservation.user?.roles });

export const reservationService = {
    getAllReservations: async () => {
        return unwrap(await api.get('/reservations/allreservation')).map(mapReservation);
    },

    getReservationById: async (id) => {
        throw new Error('Reservation lookup by id is not provided by the backend.');
    },

    createReservation: async (data) => {
        return mapReservation((await api.post('/reservations/create', data)).data.data);
    },

    cancelReservation: async (id) => {
        const response = await api.post(`/reservations/delete/reservationid=${id}`, { reservationId: id });
        return mapReservation(response.data.data);
    },

    deleteReservation: async (id) => {
        return reservationService.cancelReservation(id);
    }
};
