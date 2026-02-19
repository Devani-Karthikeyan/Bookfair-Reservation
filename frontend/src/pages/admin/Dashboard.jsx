import { useState, useEffect } from 'react';
import { Users, CreditCard, CalendarCheck, Store } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

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
    // In a real app, these would come from an API
    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { title: 'Total Revenue', value: '$45,230', icon: CreditCard, color: 'bg-green-500' },
        { title: 'Active Reservations', value: '85', icon: CalendarCheck, color: 'bg-purple-500' },
        { title: 'Available Stalls', value: '12', icon: Store, color: 'bg-amber-500' },
    ];

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Overview of your admin panel"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="text-gray-500 dark:text-gray-400 text-center py-10">
                        Chart placeholder
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h3>
                    <div className="text-gray-500 dark:text-gray-400 text-center py-10">
                        List placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
