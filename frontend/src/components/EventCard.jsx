
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 flex flex-col h-full">
            <div className="h-64 overflow-hidden relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex flex-col items-center border border-white/20">
                    <span className="text-rose-700 dark:text-rose-300 font-extrabold text-xl leading-none">{event.day}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{event.month}</span>
                </div>
                <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                    {event.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Book Your Spot <ArrowRight size={16} />
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 leading-tight group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                    {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow">
                    {event.description}
                </p>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar size={18} className="text-rose-500" />
                        <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                        <MapPin size={18} className="text-rose-500" />
                        <span className="font-medium">{event.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
