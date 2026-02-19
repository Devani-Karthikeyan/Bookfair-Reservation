import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Briefcase, Phone } from 'lucide-react';
import { useAuthModal } from '../context/AuthModalContext';
import { login, signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
    const { isOpen, mode, setMode, closeAuthModal } = useAuthModal();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        firstName: '', lastName: '', mobileNumber: '', email: '', password: '', role: 'PUBLISHER' // Default role
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await login(loginData);
            if (result.statusCode === 200) {
                const user = result.data || { role: 'USER' };
                localStorage.setItem('userRole', user.role || 'USER');
                closeAuthModal();
                navigate('/dashboard');
            } else {
                setError(result.msg || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            // Map 'role' to 'roles' as expected by backend if needed, or keep as is.
            // Based on previous Signup.jsx, it used 'roles'
            const payload = { ...signupData, roles: signupData.role };
            const result = await signup(payload);
            if (result.statusCode === 200) {
                setMode('login');
                setError('');
                alert('Account created! Please log in.');
            } else {
                setError(result.msg || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred during signup.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={closeAuthModal}
            ></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border-2 border-rose-200 dark:border-rose-500 rounded-2xl shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(168,95,113,0.6)] overflow-hidden animate-slide-up">

                {/* Header / Tabs */}
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 py-4 text-center font-extrabold text-sm tracking-wide transition-colors ${mode === 'login' ? 'bg-rose-50 text-rose-900 dark:bg-white/10 dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:text-rose-200 dark:hover:bg-white/5'}`}
                    >
                        SIGN IN
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`flex-1 py-4 text-center font-extrabold text-sm tracking-wide transition-colors ${mode === 'signup' ? 'bg-rose-50 text-rose-900 dark:bg-white/10 dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:text-rose-200 dark:hover:bg-white/5'}`}
                    >
                        CREATE ACCOUNT
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={closeAuthModal}
                    className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-rose-300 dark:hover:text-white dark:hover:bg-white/10 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {mode === 'login' ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-extrabold text-gray-700 dark:text-rose-200 uppercase tracking-wider ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="you@example.com"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-extrabold text-gray-700 dark:text-rose-200 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-lg shadow-rose-600/20 transition-all transform active:scale-95 disabled:opacity-70"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-extrabold text-gray-700 dark:text-rose-200 uppercase tracking-wider ml-1">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                            placeholder="John"
                                            value={signupData.firstName}
                                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-extrabold text-gray-700 dark:text-rose-200 uppercase tracking-wider ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="Doe"
                                        value={signupData.lastName}
                                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-rose-200 uppercase tracking-wider ml-1">Mobile</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <input
                                        type="tel"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="+1 234 567 890"
                                        value={signupData.mobileNumber}
                                        onChange={(e) => setSignupData({ ...signupData, mobileNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-rose-200 uppercase tracking-wider ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="you@example.com"
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-rose-200 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-rose-400/50 font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all"
                                        placeholder="••••••••"
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-rose-200 uppercase tracking-wider ml-1">Role</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={18} />
                                    <select
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-rose-500/30 rounded-xl text-gray-900 dark:text-white font-semibold focus:outline-none focus:border-rose-500 focus:bg-white dark:focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                        value={signupData.role}
                                        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                                    >
                                        <option value="PUBLISHER" className="bg-white text-gray-900 dark:bg-rose-900 dark:text-white">Publisher</option>
                                        <option value="VENDOR" className="bg-white text-gray-900 dark:bg-rose-900 dark:text-white">Vendor</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-lg shadow-rose-600/20 transition-all transform active:scale-95 disabled:opacity-70 mt-2"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
