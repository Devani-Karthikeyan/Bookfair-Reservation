import { Link } from 'react-router-dom';
import { ArrowRight, Book, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import EventCarousel from '../components/EventCarousel';
import { events } from '../data/events';
import { useAuthModal } from '../context/AuthModalContext';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=2000",
        title: "Discover a World of Stories",
        subtitle: "The International Bookfair is back with more authors, more books, and more magic."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000",
        title: "Meet Your Favorite Authors",
        subtitle: "Join exclusive signing sessions and panel discussions with bestselling writers."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=2000",
        title: "Reserve Your Stall Today",
        subtitle: "Showcase your publications to thousands of avid readers and industry professionals."
    }
];

const Home = () => {
    const { openAuthModal } = useAuthModal();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Auto-play slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Simple fade-in effect on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const [activeCategory, setActiveCategory] = useState("All");
    const categories = ["All", "Fairs", "Literary", "Workshops", "Tech"];

    // Import events from data file
    const filteredEvents = activeCategory === "All"
        ? events
        : events.filter(e => e.category === activeCategory);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Hero Slider Section */}
            <section className="relative h-screen min-h-[600px] bg-gray-900 text-white overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[10000ms]"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 to-black/40"></div>
                    </div>
                ))}

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start pt-20">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="inline-block py-1 px-3 rounded-full bg-rose-500/30 border border-rose-400 text-rose-200 text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
                            MARCH 15-20, 2026 • NEW YORK
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-4xl">
                            {slides[currentSlide].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl leading-relaxed">
                            {slides[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => openAuthModal('signup')} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                                Register Now <ArrowRight size={20} />
                            </button>
                            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-rose-900 font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-10 right-6 md:right-20 flex gap-4 z-20">
                    <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-6 md:left-20 flex gap-3 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-rose-500' : 'w-6 bg-white/40 hover:bg-white/60'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-24 px-6 container mx-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-rose-900 dark:text-rose-300 mb-4 tracking-tight">Upcoming Events</h2>
                    <div className="w-24 h-1 bg-rose-500 mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-10">
                        Mark your calendars for these exciting literary gatherings happening around the globe.
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${activeCategory === cat
                                    ? 'bg-rose-600 border-rose-600 text-white shadow-lg transform scale-105'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-rose-400 dark:hover:border-rose-500 hover:text-rose-600 dark:hover:text-rose-400'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <EventCarousel events={filteredEvents} />

                <div className="text-center mt-16">
                    <Link to="/events" className="inline-flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 font-bold hover:text-rose-800 dark:hover:text-rose-200 transition-colors group">
                        View All Events <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Stats/Features Section */}
            <section className="bg-rose-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-rose-500 mb-6 shadow-lg shadow-rose-500/40 text-white">
                                <Book size={32} />
                            </div>
                            <div className="text-5xl font-extrabold text-white mb-2">500+</div>
                            <div className="text-rose-200 font-medium tracking-wide uppercase text-sm">Publishers</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-pink-500 mb-6 shadow-lg shadow-pink-500/40 text-white">
                                <Users size={32} />
                            </div>
                            <div className="text-5xl font-extrabold text-white mb-2">1000+</div>
                            <div className="text-rose-200 font-medium tracking-wide uppercase text-sm">Authors</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-500 mb-6 shadow-lg shadow-blue-500/40 text-white">
                                <Users size={32} />
                            </div>
                            <div className="text-5xl font-extrabold text-white mb-2">50k+</div>
                            <div className="text-rose-200 font-medium tracking-wide uppercase text-sm">Visitors</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-amber-500 mb-6 shadow-lg shadow-amber-500/40 text-white">
                                <Globe size={32} />
                            </div>
                            <div className="text-5xl font-extrabold text-white mb-2">20+</div>
                            <div className="text-rose-200 font-medium tracking-wide uppercase text-sm">Countries</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
