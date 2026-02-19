import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import { stallService } from '../../services/stallService';
import { hallService } from '../../services/hallService';

const Stalls = () => {
    const [stalls, setStalls] = useState([]);
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentStall, setCurrentStall] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hallFilter, setHallFilter] = useState('ALL');

    // Form State
    const [formData, setFormData] = useState({ name: '', hallId: '', size: '', price: '', status: 'AVAILABLE' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [stallsData, hallsData] = await Promise.all([
                stallService.getAllStalls(),
                hallService.getAllHalls()
            ]);

            if (hallFilter !== 'ALL') {
                setStalls(stallsData.filter(s => s.hallId === parseInt(hallFilter)));
            } else {
                setStalls(stallsData);
            }

            setHalls(hallsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [hallFilter]);

    const handleEdit = (stall) => {
        setCurrentStall(stall);
        setFormData({
            name: stall.name,
            hallId: stall.hallId,
            size: stall.size,
            price: stall.price,
            status: stall.status
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (stall) => {
        setCurrentStall(stall);
        setIsConfirmOpen(true);
    };

    const handleCreate = () => {
        setCurrentStall(null);
        setFormData({ name: '', hallId: halls.length > 0 ? halls[0].id : '', size: '', price: '', status: 'AVAILABLE' });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const hall = halls.find(h => h.id === parseInt(formData.hallId));
            const submissionData = { ...formData, hallName: hall?.name || '' };

            if (currentStall) {
                await stallService.updateStall(currentStall.id, submissionData);
            } else {
                await stallService.createStall(submissionData);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Operation failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsSubmitting(true);
        try {
            await stallService.deleteStall(currentStall.id);
            setIsConfirmOpen(false);
            fetchData();
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Stall Name', accessor: 'name', render: (row) => <span className="font-semibold">{row.name}</span> },
        { header: 'Hall', accessor: 'hallName' },
        { header: 'Size', accessor: 'size' },
        { header: 'Price ($)', accessor: 'price' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <div>
            <PageHeader
                title="Stalls Management"
                description="Manage individual stalls within halls"
                actionLabel="Add Stall"
                onAction={handleCreate}
            />

            <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Hall:</span>
                <select
                    value={hallFilter}
                    onChange={(e) => setHallFilter(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm dark:bg-gray-800 dark:text-white"
                >
                    <option value="ALL">All Halls</option>
                    {halls.map(hall => (
                        <option key={hall.id} value={hall.id}>{hall.name}</option>
                    ))}
                </select>
            </div>

            <DataTable
                columns={columns}
                data={stalls}
                isLoading={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* Create / Edit Modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentStall ? 'Edit Stall' : 'Add New Stall'}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stall Number</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                                placeholder="e.g. A-01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="AVAILABLE">Available</option>
                                <option value="BOOKED">Booked</option>
                                <option value="MAINTENANCE">Maintenance</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hall</label>
                        <select
                            value={formData.hallId}
                            onChange={(e) => setFormData({ ...formData, hallId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="" disabled>Select a Hall</option>
                            {halls.map(hall => (
                                <option key={hall.id} value={hall.id}>{hall.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size (ft)</label>
                            <input
                                type="text"
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                                placeholder="10x10"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>
                </div>
            </FormModal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Stall"
                message={`Are you sure you want to delete "${currentStall?.name}"? This action cannot be undone.`}
                isProcessing={isSubmitting}
            />
        </div>
    );
};

export default Stalls;
