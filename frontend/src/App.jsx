import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Home from './pages/Home';

import { ThemeProvider } from './context/ThemeContext';
import { AuthModalProvider } from './context/AuthModalContext';

function App() {
    return (
        <ThemeProvider>
            <AuthModalProvider>
                <Router>
                    <div className="min-h-screen bg-rose-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
                        <Navbar />
                        
                        <Routes>
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/" element={<Home />} />
                            {/* Add other routes here */}
                        </Routes>
                        <Footer />
                    </div>
                </Router>
            </AuthModalProvider>
        </ThemeProvider>
    );
}

export default App;
