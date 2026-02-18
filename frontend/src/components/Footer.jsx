import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, BookOpen } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-rose-950 text-rose-200 pt-10 md:pt-16 pb-8 border-t border-rose-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-6 text-white">
                            <div className="bg-rose-600 p-1.5 rounded-lg shadow-lg shadow-rose-600/20">
                                <BookOpen size={20} />
                            </div>
                            <span>Bookfair<span className="text-rose-400">Reserve</span></span>
                        </Link>
                        <p className="text-rose-300 text-sm leading-relaxed mb-6">
                            The premier platform for international book fairs. Connecting authors, publishers, and readers worldwide through seamless reservation and event management.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 hover:bg-rose-600 hover:text-white transition-all transform hover:scale-110 border border-rose-800 hover:border-rose-500">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 border border-rose-800 hover:border-blue-400">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-rose-900/50 flex items-center justify-center text-rose-400 hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110 border border-rose-800 hover:border-pink-500">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3 text-rose-300">
                            <li><Link to="/" className="hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
                            <li><Link to="/dashboard" className="hover:text-white hover:translate-x-1 transition-all inline-block">Book Stalls</Link></li>
                            <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4 text-rose-300">
                            <li className="flex items-center gap-3"><MapPin size={18} className="text-rose-500 flex-shrink-0" /> <span className="text-sm">Bauddhaloka Mawatha, Colombo 07, Sri Lanka.</span></li>
                            <li className="flex items-center gap-3"><Phone size={18} className="text-rose-500 flex-shrink-0" /> <span className="text-sm">+94772272952</span></li>
                            <li className="flex items-center gap-3"><Mail size={18} className="text-rose-500 flex-shrink-0" /> <span className="text-sm">support@bookfair.com</span></li>
                        </ul>
                    </div>

                    {/* Newsletter (New) */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-bold mb-6 text-white">Stay Updated</h4>
                        <p className="text-rose-300 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <div className="flex flex-col gap-3">
                            <input type="email" placeholder="Your email" className="bg-rose-900/30 border border-rose-800 rounded-lg px-4 py-2 text-white placeholder-rose-500 focus:outline-none focus:border-rose-500 transition-colors" />
                            <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-rose-900/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-rose-900 mt-12 pt-8 text-center text-rose-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Bookfair Reserve. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
