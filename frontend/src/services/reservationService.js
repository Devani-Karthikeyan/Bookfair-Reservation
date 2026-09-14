import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const normalizeReservation = (reservation = {}) => {
    const message = reservation.message || '';
    const statusMatch = message.match(/Status\s*:\s*([A-Z_]+)/i);
    const userMatch = message.match(/User\s*ID\s*:\s*(\d+)/i);

    return {
        id: reservation.id ?? reservation.reservationId ?? null,
        reservationId: reservation.reservationId ?? reservation.id ?? null,
        userName: reservation.userName || (userMatch ? `User ${userMatch[1]}` : 'Unknown User'),
        stallName: reservation.stallName || 'N/A',
        date: reservation.date || reservation.reservationDate || '',
        status: (statusMatch ? statusMatch[1] : reservation.status || 'PENDING').toUpperCase(),
        type: reservation.type || 'N/A',
        message
    };
};

export const reservationService = {
    getAllReservations: async () => {
        const response = await api.get('/reservations/allreservation');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizeReservation) : [];
    },

    getReservationById: async (id) => {
        const response = await api.get('/reservations/allreservation');
        const data = unwrap(response);
        const match = Array.isArray(data) ? data.find((item) => String(item.id ?? item.reservationId) === String(id)) : null;
        return match ? normalizeReservation(match) : null;
    },

    createReservation: async (data) => {
        const payload = {
            userEmail: data.userEmail,
            stallId: data.stallId || []
        };
        const response = await api.post('/reservations/create', payload);
        return normalizeReservation(unwrap(response));
    },

    cancelReservation: async (id) => {
        const payload = {
            reservationId: Number(id),
            userEmail: localStorage.getItem('userEmail') || 'unknown@bookfair.com',
            roles: localStorage.getItem('userRole') || 'PUBLISHER'
        };
        const response = await api.post(`/reservations/delete/reservationid=${id}`, payload);
        return normalizeReservation(unwrap(response));
    },

    deleteReservation: async (id) => {
        return reservationService.cancelReservation(id);
    }
};
