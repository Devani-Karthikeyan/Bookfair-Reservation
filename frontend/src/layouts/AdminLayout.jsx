import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import DashboardHeader from '../components/admin/DashboardHeader';

const isAdminRole = (role) => {
    const normalized = (role || '').toUpperCase().replace('ROLE_', '');
    return ['EMPLOYEE', 'ADMIN'].includes(normalized);
};

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (!isAdminRole(userRole)) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300">
                <DashboardHeader onSidebarOpen={() => setIsSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
