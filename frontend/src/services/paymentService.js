import api from '../api/axiosConfig';
const unwrap = response => response.data.data || [];

export const paymentService = {
    getAllPayments: async () => {
        return unwrap(await api.get('/admin/payments/allpayments'));
    },

    getPaymentById: async (id) => {
        return (await api.get(`/admin/payments/payemntid=${id}`)).data.data;
    },

    updatePaymentStatus: async (id, status) => {
        const endpoint = status === 'SUCCESS' ? 'success' : 'fail';
        const payment = await paymentService.getPaymentById(id);
        return (await api.post(`/payments/${endpoint}/paymentid=${payment.transactionId}`)).data.data;
    },

    refundPayment: async (id) => {
        return (await api.post(`/payments/refund/reservationid=${id}`)).data.data;
    }
};
