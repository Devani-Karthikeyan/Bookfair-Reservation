// Mock Data
let payments = [
    { id: 101, user: 'John Doe', amount: 1500, date: '2025-02-15', status: 'SUCCESS', transactionId: 'TXN_123456', reservationId: 501 },
    { id: 102, user: 'Jane Smith', amount: 3000, date: '2025-02-16', status: 'PENDING', transactionId: 'TXN_789012', reservationId: 502 },
    { id: 103, user: 'Mike Johnson', amount: 2000, date: '2025-02-17', status: 'FAILED', transactionId: 'TXN_345678', reservationId: 503 },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentService = {
    getAllPayments: async () => {
        await delay(600);
        return [...payments];
    },

    getPaymentById: async (id) => {
        await delay(300);
        return payments.find(p => p.id === parseInt(id));
    },

    updatePaymentStatus: async (id, status) => {
        await delay(500);
        payments = payments.map(p =>
            p.id === parseInt(id) ? { ...p, status } : p
        );
        return payments.find(p => p.id === parseInt(id));
    },

    refundPayment: async (id) => {
        await delay(800);
        payments = payments.map(p =>
            p.id === parseInt(id) ? { ...p, status: 'REFUNDED' } : p
        );
        return payments.find(p => p.id === parseInt(id));
    }
};
