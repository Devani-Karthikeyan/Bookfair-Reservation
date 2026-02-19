import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuthModal } from '../context/AuthModalContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { openAuthModal } = useAuthModal();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for auth state

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Simple check for login status (replace with real auth context later)
        const checkLogin = () => {
            const role = localStorage.getItem('userRole');
            setIsLoggedIn(!!role);
        };

        checkLogin();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('storage', checkLogin); // Listen for storage changes

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', checkLogin);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-rose-500/95 dark:bg-rose-950/95 shadow-lg py-2' : 'bg-transparent py-4'} `}>
            <div className="container mx-auto px-6 flex justify-between items-center text-white">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight hover:text-rose-200 transition-colors">
                    <div className="bg-white text-rose-700 p-1.5 rounded-lg">
                        <BookOpen size={24} />
                    </div>
                    <span>Bookfair<span className="text-rose-300">Reserve</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link to="/" className="hover:text-rose-300 transition-colors font-medium text-sm uppercase tracking-wide">Home</Link>

                    

                    <Link to="/contact" className="hover:text-rose-300 transition-colors font-medium text-sm uppercase tracking-wide">Contact</Link>

                    <Link to="/dashboard" className="bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 px-5 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105 font-bold text-sm">
                        Book a Stall
                    </Link>

                    <div className="w-px h-6 bg-rose-400/30"></div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                            <Link to="/my-reservations" className="hover:text-rose-300 transition-colors font-medium text-sm">My Bookings</Link>
                            <button onClick={handleLogout} className="text-pink-300 hover:text-white transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button onClick={() => openAuthModal('login')} className="hover:text-white transition-colors font-semibold">Login</button>
                            <button onClick={() => openAuthModal('signup')} className="text-white hover:text-rose-200 transition-colors font-semibold">Sign Up</button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} `}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                {/* Drawer */}
                <div className={`absolute right-0 top-0 h-full w-[280px] bg-rose-500/95 dark:bg-rose-950/95 backdrop-blur-xl shadow-2xl border-l border-white/10 transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} `}>
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-xl font-bold text-white">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 flex-grow overflow-y-auto">
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-rose-100 hover:text-white flex items-center gap-3">
                                Home
                            </Link>

                            <div className="border-t border-white/10 my-2"></div>

                            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-rose-100 hover:text-white flex items-center gap-3">
                                Book a Stall
                            </Link>

                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-rose-100 hover:text-white flex items-center gap-3">
                                Contact
                            </Link>

                            <div className="border-t border-white/10 my-2"></div>

                            {isLoggedIn ? (
                                <>
                                    <Link to="/my-reservations" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-rose-100 hover:text-white flex items-center gap-3">
                                        My Bookings
                                    </Link>
                                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-pink-400 hover:text-pink-300 flex items-center gap-3 mt-auto">
                                        <LogOut size={20} /> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4 mt-4">
                                    <button onClick={() => { setIsMobileMenuOpen(false); openAuthModal('login'); }} className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-center transition-colors">
                                        Login
                                    </button>
                                    <button onClick={() => { setIsMobileMenuOpen(false); openAuthModal('signup'); }} className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-center shadow-lg transition-colors">
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                            <span className="text-sm text-rose-300">Theme</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
