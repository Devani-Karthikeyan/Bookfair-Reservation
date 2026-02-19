import PageHeader from '../components/common/PageHeader';

const UserDashboard = () => {
    return (
        <div className="container mx-auto px-6 py-8 pt-28">
            <PageHeader
                title="User Dashboard"
                description="Manage your stall bookings and profile"
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm">
                <div className="mb-4 text-4xl">👋</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Bookfair Reserve</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                    This is the user dashboard area. You can book stalls and view your reservations here.
                </p>

                <button className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-rose-600/20">
                    Book a New Stall
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
