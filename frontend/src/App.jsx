import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StallBookingMap from './pages/StallBookingMap';

import { ThemeProvider } from './context/ThemeContext';
import { AuthModalProvider } from './context/AuthModalContext';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import UserDashboard from './pages/UserDashboard';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Payments from './pages/admin/Payments';
import Halls from './pages/admin/Halls';
import Stalls from './pages/admin/Stalls';
import Reservations from './pages/admin/Reservations';
import Genres from './pages/admin/Genres';

function App() {
    return (
        <ThemeProvider>
            <AuthModalProvider>
                <Router>
                    <Routes>
                        {/* Public Routes wrapped in MainLayout */}
                        <Route element={<MainLayout />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<UserDashboard />} />
                            <Route path="/book-stalls" element={<StallBookingMap />} />
                            {/* Add other public routes here */}
                        </Route>

                        {/* Admin Routes wrapped in AdminLayout */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="users" element={<Users />} />
                            <Route path="payments" element={<Payments />} />
                            <Route path="halls" element={<Halls />} />
                            <Route path="stalls" element={<Stalls />} />
                            <Route path="reservations" element={<Reservations />} />
                            <Route path="genres" element={<Genres />} />
                        </Route>
                    </Routes>
                </Router>
            </AuthModalProvider>
        </ThemeProvider>
    );
}

export default App;
