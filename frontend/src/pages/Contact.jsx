import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
            {/* Header */}
            <div className="bg-rose-900 dark:bg-rose-950 text-white py-16 mb-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-rose-200 text-lg max-w-2xl mx-auto">
                        Have questions about the Bookfair? Need help with reservation? We're here to assist you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Contact Info & Map */}
                <div className="space-y-8 animate-slide-right">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-rose-600 hover:shadow-lg transition-shadow">
                            <div className="bg-rose-100 dark:bg-rose-900/30 w-12 h-12 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-300 mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Visit Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">BMICH (Bandaranaike Memorial International Conference Hall), Bauddhaloka Mawatha, Colombo 00700<br />SriLanka</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-pink-500 hover:shadow-lg transition-shadow">
                            <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-300 mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Call Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">+94 772272952<br />Mon-Fri, 9am - 6pm</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
                            onClick={() => window.location.href = "mailto:support@yourbookfair.com"}
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 mb-4">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">support@bookfair.com<br />info@bookfair.com</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
                            <div className="bg-amber-100 dark:bg-amber-900/30 w-12 h-12 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-300 mb-4">
                                <Clock size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2">Working Hours</h3>
                            <p className="text-gray-600 dark:text-gray-300">Weekdays: 8 AM - 8 PM<br />Weekends: 10 AM - 4 PM</p>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg h-80 overflow-hidden">
                        <iframe
                            title="Location Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9074412643404!2d79.87013407453372!3d6.90167199309761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597f9d09a467%3A0xee0b9455e960eba5!2sBMICH%20(Bandaranaike%20Memorial%20International%20Conference%20Hall)!5e0!3m2!1sen!2slk!4v1771475667811!5m2!1sen!2slk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg"
                        ></iframe>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl animate-slide-up">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h2>

                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2 animate-fade-in-down">
                            <span>✅ Message sent successfully! We'll get back to you soon.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                    required
                                    
                                />
                                
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
