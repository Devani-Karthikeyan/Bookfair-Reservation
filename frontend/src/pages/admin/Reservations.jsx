import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import { reservationService } from '../../services/reservationService';
import { Ban } from 'lucide-react';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusFilter, setStatusFilter] = useState('ALL');

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const data = await reservationService.getAllReservations();
            if (statusFilter !== 'ALL') {
                setReservations(data.filter(r => r.status === statusFilter));
            } else {
                setReservations(data);
            }
        } catch (error) {
            console.error("Failed to fetch reservations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [statusFilter]);

    const handleCancelClick = (reservation) => {
        setSelectedReservation(reservation);
        setIsConfirmOpen(true);
    };

    const handleConfirmCancel = async () => {
        setIsProcessing(true);
        try {
            await reservationService.cancelReservation(selectedReservation.id);
            setIsConfirmOpen(false);
            fetchReservations();
        } catch (error) {
            console.error("Cancellation failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'User', accessor: 'userName' },
        { header: 'Stall', accessor: 'stallName' },
        { header: 'Date', accessor: 'date' },
        { header: 'Type', accessor: 'type' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Actions',
            accessor: 'id',
            render: (row) => (
                <div className="flex gap-2 justify-end">
                    {row.status !== 'CANCELLED' && row.status !== 'COMPLETED' && (
                        <button
                            onClick={() => handleCancelClick(row)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                            title="Cancel Reservation"
                        >
                            <Ban size={18} />
                        </button>
                    )}
                </div>
            )
        }
    ];

    return (
        <div>
            <PageHeader
                title="Reservations"
                description="Manage stall reservations and bookings"
            />

            <div className="mb-6 flex gap-2">
                {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${statusFilter === status
                                ? 'bg-rose-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        {status === 'ALL' ? 'All' : status}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={reservations}
                isLoading={loading}
            />

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmCancel}
                title="Cancel Reservation"
                message={`Are you sure you want to cancel reservation #${selectedReservation?.id}? This will release the stall.`}
                isProcessing={isProcessing}
            />
        </div>
    );
};

export default Reservations;
