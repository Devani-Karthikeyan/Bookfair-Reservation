import api from '../api/axiosConfig';

const unwrap = (response) => response?.data?.data ?? response?.data ?? [];

const normalizePayment = (payment = {}) => ({
    id: payment.transactionId || payment.reservationId || payment.id,
    user: payment.user || payment.userName || 'Unknown User',
    amount: Number(payment.amount ?? 0),
    date: payment.date || payment.paymentDate || '',
    status: (payment.status || payment.paymentStatus || 'PENDING').toUpperCase(),
    transactionId: payment.transactionId || payment.id || '',
    reservationId: payment.reservationId ?? payment.reservation?.id ?? null,
    message: payment.message || ''
});

export const paymentService = {
    getAllPayments: async () => {
        const response = await api.get('/admin/payments/allpayments');
        const data = unwrap(response);
        return Array.isArray(data) ? data.map(normalizePayment) : [];
    },

    getPaymentById: async (id) => {
        const response = await api.get(`/admin/payments/payemntid=${id}`);
        return normalizePayment(unwrap(response));
    },

    updatePaymentStatus: async (id, status) => {
        const normalizedStatus = String(status).toUpperCase();
        const endpoint = normalizedStatus === 'SUCCESS'
            ? `/payments/success/paymentid=${id}`
            : normalizedStatus === 'FAILED'
                ? `/payments/fail/paymentid=${id}`
                : `/admin/payments/status=${normalizedStatus}`;

        const response = await api.post(endpoint);
        return normalizePayment(unwrap(response));
    },

    refundPayment: async (id) => {
        const reservationId = Number(id);
        const response = await api.post(`/payments/refund/reservationid=${reservationId}`);
        return normalizePayment(unwrap(response));
    }
};
