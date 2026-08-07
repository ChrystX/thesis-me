import { useNavigate } from 'react-router-dom';
import { useCarouselLayout } from "../hooks/useCarouselLayout.js";
import CarouselControls from "./control/CarouselControls.jsx";
import CarouselDots from "./control/CarouselDots.jsx";
import {useBlogCarousel} from "../hooks/useBlogCarousel.js";
import CarouselBlogCard from "../../blogcard/carouselcard/CarouselBlogcard.jsx";

const RecentPostsCarousel = ({ blogs }) => {
    const navigate = useNavigate();
    const { config, cardWidth } = useCarouselLayout();
    const maxIndex = Math.max(0, blogs.length - Math.floor(config.visibleCount));
    const { currentIndex, next, prev, goTo } = useBlogCarousel(blogs.length, config.visibleCount, maxIndex);

    if (blogs.length === 0) return null;

    const showControls = blogs.length > Math.floor(config.visibleCount);
    const slideDistance = currentIndex * (cardWidth + config.gap);

    return (
        <section className="mb-8 w-full">
            <div className="flex items-center justify-between mb-6 px-4 sm:px-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Latest Stories</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Fresh content just published</p>
                </div>
                {showControls && (
                    <CarouselControls
                        onPrev={prev}
                        onNext={next}
                        disablePrev={currentIndex === 0}
                        disableNext={currentIndex >= maxIndex}
                    />
                )}
            </div>

            <div className="relative">
                <div className="overflow-hidden px-4 sm:px-8">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${slideDistance}px)`, gap: `${config.gap}px` }}
                    >
                        {blogs.map((blog, index) => (
                            <div key={blog.id} style={{ minWidth: `${cardWidth}px`, width: `${cardWidth}px` }}>
                                <CarouselBlogCard
                                    blog={blog}
                                    index={index}
                                    onClick={() => navigate(`/blog/${blog.id}`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {showControls && <CarouselControls mobile onPrev={prev} onNext={next} />}
            </div>

            {showControls && (
                <CarouselDots count={maxIndex + 1} currentIndex={currentIndex} onGoTo={goTo} />
            )}
        </section>
    );
};

export default RecentPostsCarousel;