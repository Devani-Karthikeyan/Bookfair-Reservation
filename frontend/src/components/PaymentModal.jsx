import React, { useEffect } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, selectedStallsDetails, totalAmount, onPaymentSuccess }) => {
    // Prevent scrolling behind modal when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <CreditCard className="text-rose-500" size={24} />
                            Complete Payment
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review your selected stalls</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content - Order Details */}
                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                        Order Summary
                    </h3>

                    <div className="space-y-3">
                        {selectedStallsDetails.length > 0 ? (
                            selectedStallsDetails.map(stall => (
                                <div key={stall.id} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${stall.type === 'large' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                                                stall.type === 'medium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                                                    'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                            }`}>
                                            {stall.label}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                                                {stall.type === 'large' ? 'Premium VIP Stall' : stall.type === 'medium' ? 'Standard Plus Stall' : 'Standard Stall'}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                ID: {stall.id}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                        ₹{stall.price.toLocaleString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 py-4">No stalls selected.</p>
                        )}
                    </div>

                    {/* Total Calculation */}
                    <div className="mt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Amount to Pay</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <ShieldCheck size={14} className="text-green-500" />
                                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Secure Checkout</span>
                                </div>
                            </div>
                            <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-500">
                                ₹{totalAmount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onPaymentSuccess}
                        className="flex-[2] px-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 shadow-md transform transition-all hover:-translate-y-0.5"
                    >
                        Pay ₹{totalAmount.toLocaleString()}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentModal;
