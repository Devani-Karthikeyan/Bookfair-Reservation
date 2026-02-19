import { useState, useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { genreService } from '../../services/genreService';

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentGenre, setCurrentGenre] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ name: '', description: '' });

    const fetchGenres = async () => {
        setLoading(true);
        try {
            const data = await genreService.getAllGenres();
            setGenres(data);
        } catch (error) {
            console.error("Failed to fetch genres", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const handleEdit = (genre) => {
        setCurrentGenre(genre);
        setFormData({ name: genre.name, description: genre.description });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (genre) => {
        setCurrentGenre(genre);
        setIsConfirmOpen(true);
    };

    const handleCreate = () => {
        setCurrentGenre(null);
        setFormData({ name: '', description: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (currentGenre) {
                await genreService.updateGenre(currentGenre.id, formData);
            } else {
                await genreService.createGenre(formData);
            }
            setIsModalOpen(false);
            fetchGenres();
        } catch (error) {
            console.error("Operation failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsSubmitting(true);
        try {
            await genreService.deleteGenre(currentGenre.id);
            setIsConfirmOpen(false);
            fetchGenres();
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns = [
        { header: 'ID', accessor: 'id' },
        { header: 'Name', accessor: 'name', render: (row) => <span className="font-semibold">{row.name}</span> },
        { header: 'Description', accessor: 'description' },
    ];

    return (
        <div>
            <PageHeader
                title="Genre Management"
                description="Create and manage book genres"
                actionLabel="Add Genre"
                onAction={handleCreate}
            />

            <DataTable
                columns={columns}
                data={genres}
                isLoading={loading}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {/* Create / Edit Modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentGenre ? 'Edit Genre' : 'Add New Genre'}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Genre Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. Science Fiction"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Genre description..."
                        />
                    </div>
                </div>
            </FormModal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Genre"
                message={`Are you sure you want to delete "${currentGenre?.name}"? This action cannot be undone.`}
                isProcessing={isSubmitting}
            />
        </div>
    );
};

export default Genres;
