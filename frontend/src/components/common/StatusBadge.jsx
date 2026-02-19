
const StatusBadge = ({ status, type = 'default' }) => {
    const getStatusStyles = (status) => {
        const normalizedStatus = status?.toLowerCase() || '';

        // Payment Statues
        if (['success', 'paid', 'completed', 'active', 'enabled'].includes(normalizedStatus)) {
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
        }
        if (['pending', 'processing', 'waiting'].includes(normalizedStatus)) {
            return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
        }
        if (['failed', 'cancelled', 'rejected', 'inactive', 'disabled'].includes(normalizedStatus)) {
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
        }

        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(status)} capitalize`}>
            {status}
        </span>
    );
};

export default StatusBadge;
