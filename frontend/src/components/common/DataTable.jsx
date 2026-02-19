import { Edit, Trash2, Eye } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete, onView, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-full p-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView) && (
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((item, rowIdx) => (
                        <tr key={item.id || rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                                    {col.render ? col.render(item) : item[col.accessor]}
                                </td>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        {onView && (
                                            <button
                                                onClick={() => onView(item)}
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                title="View"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        )}
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 p-1 rounded hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
