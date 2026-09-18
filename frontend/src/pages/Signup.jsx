import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        role: 'PUBLISHER'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signup({
                ...formData,
                roles: formData.role
            });
            if (result.statusCode === 200) {
                navigate('/login');
            } else {
                setError(result.msg || 'Signup failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during signup.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-rose-950 to-black p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-rose-600/20 blur-[100px] animate-pulse"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-rose-400/10 blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 relative z-10 transition-all duration-300 hover:shadow-rose-900/30">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-rose-200">Join the Bookfair reservation platform</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg relative mb-6 text-sm flex items-center gap-2" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-rose-100 mb-2 font-medium text-sm">First Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder-rose-300/30"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-rose-100 mb-2 font-medium text-sm">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder-rose-300/30"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-rose-100 mb-2 font-medium text-sm">Mobile Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder-rose-300/30"
                            placeholder="+1 234 567 890"
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-rose-100 mb-2 font-medium text-sm">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder-rose-300/30"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-rose-100 mb-2 font-medium text-sm">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder-rose-300/30"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-rose-100 mb-2 font-medium text-sm">Role</label>
                        <select
                            className="w-full px-4 py-3 bg-white/5 border border-rose-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="PUBLISHER" className="text-black">Publisher</option>
                            <option value="VENDOR" className="text-black">Vendor</option>
                            <option value="EMPLOYEE" className="text-black">Employee</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-rose-600 text-white py-3.5 rounded-xl font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/30 hover:shadow-rose-500/50 transform hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-white/10">
                    <p className="text-rose-200">
                        Already have an account? <Link to="/login" className="text-white hover:text-rose-300 font-bold transition-colors ml-1 underline decoration-rose-500/50 hover:decoration-white">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
