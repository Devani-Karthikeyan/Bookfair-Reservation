import { useState, useEffect } from 'react';
import { Users, CreditCard, CalendarCheck, Store } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { userService } from '../../services/userService';
import { reservationService } from '../../services/reservationService';
import { stallService } from '../../services/stallService';
import { paymentService } from '../../services/paymentService';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({ users: [], reservations: [], stalls: [], payments: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [users, reservations, stalls, payments] = await Promise.all([
                    userService.getAllUsers(),
                    reservationService.getAllReservations(),
                    stallService.getAllStalls(),
                    paymentService.getAllPayments(),
                ]);
                setDashboardData({ users, reservations, stalls, payments });
            } catch (loadError) {
                setError(loadError.response?.data?.msg || 'Unable to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    const activeReservations = dashboardData.reservations.filter(reservation => !['CANCELLED', 'EXPIRED'].includes(reservation.status));
    const availableStalls = dashboardData.stalls.filter(stall => stall.status === 'AVAILABLE');
    const revenue = dashboardData.payments
        .filter(payment => payment.status === 'SUCCESS' || payment.status === 'COMPLETED')
        .reduce((total, payment) => total + Number(payment.amount || 0), 0);
    const stats = [
        { title: 'Total Users', value: dashboardData.users.length, icon: Users, color: 'bg-blue-500' },
        { title: 'Total Revenue', value: `$${revenue.toLocaleString()}`, icon: CreditCard, color: 'bg-green-500' },
        { title: 'Active Reservations', value: activeReservations.length, icon: CalendarCheck, color: 'bg-purple-500' },
        { title: 'Available Stalls', value: availableStalls.length, icon: Store, color: 'bg-amber-500' },
    ];

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Overview of your admin panel"
            />

            {error && <p className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} value={loading ? '...' : stat.value} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="text-gray-500 dark:text-gray-400 py-4">
                        {loading ? 'Loading activity...' : `${dashboardData.payments.length} payment records and ${dashboardData.users.length} registered users.`}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                        {loading && <p className="text-gray-500 dark:text-gray-400">Loading bookings...</p>}
                        {!loading && activeReservations.slice(0, 5).map(reservation => (
                            <div key={reservation.id} className="flex justify-between border-b border-gray-100 py-2 dark:border-gray-700">
                                <span className="text-gray-700 dark:text-gray-200">{reservation.stallName || `Reservation #${reservation.id}`}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{reservation.status}</span>
                            </div>
                        ))}
                        {!loading && activeReservations.length === 0 && <p className="text-gray-500 dark:text-gray-400">No active bookings.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
