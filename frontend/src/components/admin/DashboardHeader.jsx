import { Menu, Bell, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const DashboardHeader = ({ onSidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={onSidebarOpen}
                    className="p-2 md:hidden text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
                >
                    <Menu size={24} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
                    Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <User size={18} />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
