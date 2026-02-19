import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import { hallService } from '../../services/hallService';

const Halls = () => {
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentHall, setCurrentHall] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ name: '', capacity: '', location: '', status: 'ACTIVE' });

    const fetchHalls = async () => {
        setLoading(true);
        try {
            const data = await hallService.getAllHalls();
            setHalls(data);
        } catch (error) {
            console.error("Failed to fetch halls", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHalls();
    }, []);

    const handleEdit = (hall) => {
        setCurrentHall(hall);
        setFormData({ name: hall.name, capacity: hall.capacity, location: hall.location, status: hall.status });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (hall) => {
        setCurrentHall(hall);
        setIsConfirmOpen(true);
    };

    const handleCreate = () => {
        setCurrentHall(null);
        setFormData({ name: '', capacity: '', location: '', status: 'ACTIVE' });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (currentHall) {
                await hallService.updateHall(currentHall.id, formData);
            } else {
                await hallService.createHall(formData);
            }
            setIsModalOpen(false);
            fetchHalls();
        } catch (error) {
            console.error("Operation failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsSubmitting(true);
        try {
            await hallService.deleteHall(currentHall.id);
            setIsConfirmOpen(false);
            fetchHalls();
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Hall Name', accessor: 'name', render: (row) => <span className="font-semibold">{row.name}</span> },
        { header: 'Capacity', accessor: 'capacity' },
        { header: 'Location', accessor: 'location' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    ];

    return (
        <div>
            <PageHeader
                title="Halls Management"
                description="Manage exhibition halls and venues"
                actionLabel="Add Hall"
                onAction={handleCreate}
            />

            <DataTable
                columns={columns}
                data={halls}
                isLoading={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* Create / Edit Modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentHall ? 'Edit Hall' : 'Add New Hall'}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hall Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. Main Auditorium"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                                placeholder="500"
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
                                <option value="ACTIVE">Active</option>
                                <option value="MAINTENANCE">Maintenance</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Building / Floor"
                            required
                        />
                    </div>
                </div>
            </FormModal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Hall"
                message={`Are you sure you want to delete "${currentHall?.name}"? This action cannot be undone.`}
                isProcessing={isSubmitting}
            />
        </div>
    );
};

export default Halls;
