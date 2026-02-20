import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PaymentModal from '../components/PaymentModal';

const StallBookingMap = () => {
    // State Management
    const [activeHall, setActiveHall] = useState(1);
    const [selectedStalls, setSelectedStalls] = useState([]);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // API States
    const [hallData, setHallData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pricing Constants
    const PRICES = {
        large: 5000,
        medium: 3000,
        small: 1500
    };

    // Fetch real data from backend
    useEffect(() => {
        const fetchStalls = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/stalls/allstalls');
                const stallsArray = response.data.data || [];

                const newHallData = {};

                stallsArray.forEach(stall => {
                    const hallId = stall.hall.id;
                    const typeInfo = stall.size.toLowerCase(); // large, medium, small

                    // Initialize hall if not exists
                    if (!newHallData[hallId]) {
                        newHallData[hallId] = {
                            name: stall.hall.hallName || `Hall ${hallId}`,
                            large: [],
                            medium: [],
                            small: []
                        };
                    }

                    // Extract label like "L1" from "H1-L1", fallback to original if no hyphen
                    const parts = stall.stallName.split('-');
                    const labelRaw = parts.length > 1 ? parts.slice(1).join('-') : stall.stallName;

                    if (newHallData[hallId][typeInfo]) {
                        newHallData[hallId][typeInfo].push({
                            id: stall.id,
                            label: labelRaw,
                            type: typeInfo,
                            price: stall.price,
                            status: stall.status.toLowerCase()
                        });
                    }
                });

                setHallData(newHallData);

                // Ensure activeHall selects an existing backend hall
                const hallKeys = Object.keys(newHallData);
                if (hallKeys.length > 0) {
                    setActiveHall(Number(hallKeys[0]));
                }

                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching stalls:", err);
                setError("Failed to load stalls data. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchStalls();
    }, []);

    // Handle Stall Click
    const handleStallClick = (stall) => {
        if (stall.status === 'booked') return;

        setSelectedStalls(prev => {
            if (prev.includes(stall.id)) {
                return prev.filter(id => id !== stall.id);
            } else {
                if (prev.length >= 3) {
                    alert("Maximum of 3 stalls can be reserved at a time.");
                    return prev;
                }
                return [...prev, stall.id];
            }
        });
    };

    // Derived State for Payment
    const selectedStallsDetails = useMemo(() => {
        const details = [];
        if (!hallData) return details;

        // Search across all halls to find details for selected IDs
        for (const hallId in hallData) {
            const hall = hallData[hallId];
            [...hall.large, ...hall.medium, ...hall.small].forEach(stall => {
                if (selectedStalls.includes(stall.id)) {
                    details.push(stall);
                }
            });
        }
        return details;
    }, [selectedStalls, hallData]);

    const totalAmount = useMemo(() => {
        return selectedStallsDetails.reduce((sum, stall) => sum + stall.price, 0);
    }, [selectedStallsDetails]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><p className="text-xl font-bold text-slate-500">Loading Map Data...</p></div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><p className="text-xl font-bold text-red-500">{error}</p></div>;
    }

    const { large: largeStalls, medium: mediumStalls, small: smallStalls } = hallData[activeHall] || { large: [], medium: [], small: [] };

    const handlePaymentSuccess = async (customerDetails) => {
        try {
            const payload = {
                userEmail: customerDetails.email,
                stallId: selectedStalls
            };

            // Post reservation
            await axios.post('http://localhost:8080/api/reservations/create', payload, {
                withCredentials: true
            });
            alert(`Payment of ₹${totalAmount.toLocaleString()} successful! Stalls booked for ${customerDetails.name}.`);

            setSelectedStalls([]);
            setIsPaymentModalOpen(false);

            // Reload page to reflect new stall statuses
            window.location.reload();
        } catch (err) {
            console.error("Reservation Error:", err);
            alert("Failed to book stalls: " + (err.response?.data?.msg || err.message));
        }
    };

    // Reusable Stall Component
    const Stall = ({ data, type }) => {
        const isSelected = selectedStalls.includes(data.id);

        let baseStyles = 'flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-300 rounded-lg shadow-sm border-2 ';

        if (data.status === 'booked') {
            baseStyles += 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-600';
        } else if (isSelected) {
            baseStyles += 'bg-green-500 border-green-600 text-white shadow-md transform scale-105 dark:bg-green-600 dark:border-green-500 hover:bg-green-600';
        } else {
            if (type === 'large') {
                baseStyles += 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:shadow-md dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400';
            } else {
                baseStyles += 'bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:shadow-md hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800';
            }
        }

        // Distinct sizing for different grid layout items
        let sizingStyles = '';
        if (type === 'large') {
            sizingStyles = 'aspect-square min-w-[3.5rem] sm:min-w-[4rem] text-base';
        } else if (type === 'medium') {
            sizingStyles = 'aspect-square min-w-[3rem] sm:min-w-[3.5rem] text-sm';
        } else { // small
            sizingStyles = 'aspect-square min-w-[2.5rem] sm:min-w-[3rem] text-xs sm:text-sm';
        }

        return (
            <div
                className={`${baseStyles} ${sizingStyles}`}
                onClick={() => handleStallClick(data)}
            >
                {data.label}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header Banner - Main Hall Stage */}
                <div className="flex justify-center flex-col items-center space-y-8">
                    <div className="w-full max-w-4xl bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white rounded-t-[4rem] md:rounded-t-[6rem] py-8 md:py-10 text-center shadow-2xl relative overflow-hidden border-b-8 border-rose-800">
                        {/* Decorative background overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-[0.15em] uppercase relative z-10 mb-2 font-serif text-rose-50 drop-shadow-lg">
                            Main Hall Stage
                        </h1>
                        <p className="text-rose-300 tracking-[0.25em] text-xs md:text-sm uppercase relative z-10 font-medium">
                            Grand Auditorium
                        </p>
                    </div>

                    {/* Hall Selectors */}
                    <div className="flex space-x-4 overflow-x-auto bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        {hallData && Object.keys(hallData).map((hallIdStr) => {
                            const hallNum = Number(hallIdStr);
                            const hallName = hallData[hallIdStr].name || `Hall ${hallNum}`;
                            return (
                                <button
                                    key={hallNum}
                                    onClick={() => setActiveHall(hallNum)}
                                    className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeHall === hallNum
                                        ? 'bg-rose-600 text-white shadow-md'
                                        : 'text-slate-600 hover:bg-rose-50 dark:text-slate-300 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {hallName}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Premium VIP Zone (Large Stalls) */}
                <div className="space-y-6">
                    <h2 className="text-center text-sm md:text-base font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest drop-shadow-sm">
                        Premium VIP Zone
                    </h2>
                    <div className="flex justify-center">
                        <div className="p-4 md:p-6 bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/50 shadow-sm backdrop-blur-sm">
                            {/* Specific CSS Grid for Large Stalls */}
                            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 lg:gap-5">
                                {largeStalls.map((stall) => (
                                    <Stall key={stall.id} data={stall} type="large" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Wings */}
                <div className="flex justify-center mt-12 pb-24">
                    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-6 lg:gap-12 items-start relative">

                        {/* Left Wing (Medium Stalls) */}
                        <div className="space-y-10 w-full flex flex-col items-center">
                            <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-2 w-full max-w-sm text-center">
                                <h3 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                    Left Wing (Section A)
                                </h3>
                            </div>
                            {/* Distinct CSS Grid for Medium Stalls */}
                            <div className="grid grid-cols-4 gap-4 md:gap-5 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                {mediumStalls.map((stall) => (
                                    <Stall key={stall.id} data={stall} type="medium" />
                                ))}
                            </div>
                        </div>

                        {/* Central Aisle Separator */}
                        <div className="hidden md:flex flex-col items-center justify-center opacity-40 self-stretch mt-12 space-y-6">
                            <div className="w-px flex-grow max-h-[100px] border-l-2 border-dashed border-slate-400"></div>
                            <span
                                className="text-slate-500 tracking-[0.4em] uppercase font-bold text-xs"
                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                                Central Aisle
                            </span>
                            <div className="w-px flex-grow max-h-[100px] border-l-2 border-dashed border-slate-400"></div>
                        </div>

                        {/* Right Wing (Small Stalls) */}
                        <div className="space-y-10 w-full flex flex-col items-center">
                            <div className="border-b-2 border-slate-200 dark:border-slate-800 pb-2 w-full max-w-sm text-center">
                                <h3 className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                    Right Wing (Section B)
                                </h3>
                            </div>
                            {/* Distinct CSS Grid for Small Stalls (Tighter gaps and padding implied by stall sizing) */}
                            <div className="grid grid-cols-4 gap-3 md:gap-4 bg-white/50 dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                {smallStalls.map((stall) => (
                                    <Stall key={stall.id} data={stall} type="small" />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Color Legend */}
                <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-24">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center mb-6">
                        Map Legend & Pricing
                    </h4>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
                        {/* Legend Items */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded border-2 border-slate-300 bg-white dark:bg-slate-900 shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Available</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded border-2 border-green-600 bg-green-500 shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Selected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded border-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Booked</span>
                            </div>
                        </div>

                        {/* Pricing Info */}
                        <div className="border-l border-slate-200 dark:border-slate-700 pl-6 sm:pl-12 flex flex-col gap-2 justify-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-bold text-amber-600 dark:text-amber-500">VIP Large:</span> ₹5,000 / stall</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-bold text-blue-600 dark:text-blue-500">Medium:</span> ₹3,000 / stall</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-700 dark:text-slate-300">Small:</span> ₹1,500 / stall</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Checkout Bar */}
            {selectedStalls.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] py-4 px-6 transform transition-all duration-300 animate-in slide-in-from-bottom-full">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Selected {selectedStalls.length} Stall{selectedStalls.length > 1 ? 's' : ''}</p>
                            <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                                Total: <span className="text-rose-600 dark:text-rose-500">₹{totalAmount.toLocaleString()}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (selectedStalls.length > 3) {
                                    alert("You can only reserve a maximum of 3 stalls at a time.");
                                    return;
                                }
                                setIsPaymentModalOpen(true);
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}

            {/* Payment Modal Override */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                selectedStallsDetails={selectedStallsDetails}
                totalAmount={totalAmount}
                onPaymentSuccess={handlePaymentSuccess}
            />

        </div>
    );
};

export default StallBookingMap;
