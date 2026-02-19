import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import { paymentService } from '../../services/paymentService';
import { Eye, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [actionType, setActionType] = useState(null); // 'SUCCESS', 'FAILED', 'REFUND'
    const [isProcessing, setIsProcessing] = useState(false);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const data = await paymentService.getAllPayments();
            if (statusFilter !== 'ALL') {
                setPayments(data.filter(p => p.status === statusFilter));
            } else {
                setPayments(data);
            }
        } catch (error) {
            console.error("Failed to fetch payments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [statusFilter]);

    const handleAction = (payment, type) => {
        setSelectedPayment(payment);
        setActionType(type);
        setIsConfirmOpen(true);
    };

    const handleConfirmAction = async () => {
        setIsProcessing(true);
        try {
            if (actionType === 'REFUND') {
                await paymentService.refundPayment(selectedPayment.id);
            } else {
                await paymentService.updatePaymentStatus(selectedPayment.id, actionType);
            }
            setIsConfirmOpen(false);
            fetchPayments();
        } catch (error) {
            console.error("Action failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'User', accessor: 'user' },
        { header: 'Amount', accessor: 'amount', render: (row) => <span>${row.amount}</span> },
        { header: 'Date', accessor: 'date' },
        { header: 'Transaction ID', accessor: 'transactionId' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Actions',
            accessor: 'id',
            render: (row) => (
                <div className="flex gap-2 justify-end">
                    {row.status === 'PENDING' && (
                        <>
                            <button
                                onClick={() => handleAction(row, 'SUCCESS')}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                title="Mark Success"
                            >
                                <CheckCircle size={18} />
                            </button>
                            <button
                                onClick={() => handleAction(row, 'FAILED')}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Mark Failed"
                            >
                                <XCircle size={18} />
                            </button>
                        </>
                    )}
                    {row.status === 'SUCCESS' && (
                        <button
                            onClick={() => handleAction(row, 'REFUND')}
                            className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                            title="Refund"
                        >
                            <RefreshCcw size={18} />
                        </button>
                    )}
                </div>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="Payments Management"
                description="View and manage transaction history"
            />

            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {['ALL', 'SUCCESS', 'PENDING', 'FAILED', 'REFUNDED'].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-rose-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        {status === 'ALL' ? 'All Payments' : status}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={payments}
                isLoading={loading}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmAction}
                title={`Confirm ${actionType === 'REFUND' ? 'Refund' : 'Status Update'}`}
                message={`Are you sure you want to mark payment #${selectedPayment?.id} as ${actionType}?`}
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default Payments;
