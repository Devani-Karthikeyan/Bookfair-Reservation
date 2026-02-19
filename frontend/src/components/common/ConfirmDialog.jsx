import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, isProcessing = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all">
                    <div className="p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                            <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                            {title}
                        </h3>
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            {message}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isProcessing}
                            className="w-full sm:w-auto inline-flex justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 transition-colors"
                        >
                            {isProcessing ? 'Processing...' : 'Confirm'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="w-full sm:w-auto inline-flex justify-center rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
