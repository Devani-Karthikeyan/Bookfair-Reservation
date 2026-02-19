import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-rose-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <Navbar />
            <AuthModal />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
