
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import EventCard from './EventCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventCarousel = ({ events }) => {
    return (
        <div className="event-carousel-container relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="pb-12 px-4"
            >
                {events.map((event) => (
                    <SwiperSlide key={event.id} className="h-auto">
                        <EventCard event={event} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
                .swiper-pagination-bullet-active {
                    background-color: #7c3aed !important; /* rose-600 */
                }
                .swiper-button-next, .swiper-button-prev {
                    color: #7c3aed !important;
                    background: rgba(255, 255, 255, 0.8);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }
                .swiper-button-disabled {
                    opacity: 0.35 !important;
                }
                /* Dark mode adjustments */
                @media (prefers-color-scheme: dark) {
                    .swiper-button-next, .swiper-button-prev {
                        background: rgba(31, 41, 55, 0.8); /* gray-800 */
                    }
                }
            `}</style>
        </div>
    );
};

export default EventCarousel;
