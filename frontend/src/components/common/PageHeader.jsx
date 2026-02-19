import { Plus } from 'lucide-react';

const PageHeader = ({ title, description, actionLabel, onAction }) => {
    return (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 transition-colors"
                >
                    <Plus size={18} />
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default PageHeader;
