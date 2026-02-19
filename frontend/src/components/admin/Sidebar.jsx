import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    CreditCard, 
    Building2, 
    Store, 
    CalendarCheck, 
    Tags, 
    LogOut,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { title: 'Users', path: '/admin/users', icon: Users },
        { title: 'Payments', path: '/admin/payments', icon: CreditCard },
        { title: 'Halls', path: '/admin/halls', icon: Building2 },
        { title: 'Stalls', path: '/admin/stalls', icon: Store },
        { title: 'Reservations', path: '/admin/reservations', icon: CalendarCheck },
        { title: 'Genres', path: '/admin/genres', icon: Tags },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                            Admin Panel
                        </span>
                        <button 
                            onClick={onClose}
                            className="p-1 md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <X size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {menuItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => onClose && window.innerWidth < 768 && onClose()}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                                        ${active 
                                            ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium' 
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                                        }
                                    `}
                                >
                                    <item.icon size={20} />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
