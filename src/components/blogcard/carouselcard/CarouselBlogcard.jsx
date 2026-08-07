import { useState } from "react";
import { formatDate, getImageUrl } from "../../../utils/blog/blogUtils.js";
import CarouselCardImage from "./CarouselCardImage.jsx";
import CarouselCardOverlay from "./CarouselCardOverlay.jsx";

const CarouselBlogCard = ({ blog, index, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = getImageUrl(blog.thumbnailUrl);

    return (
        <div
            onClick={() => onClick?.(blog)}
            className="w-full group bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 shadow-lg"
            style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.4s ease-out forwards'
            }}
        >
            <div className="aspect-[5/3] sm:aspect-[4/3] relative overflow-hidden">
                <CarouselCardImage
                    imageUrl={imageUrl}
                    imageError={imageError}
                    title={blog.title}
                    onError={() => setImageError(true)}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

                <CarouselCardOverlay blog={blog} />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            </div>
        </div>
    );
};

export default CarouselBlogCard;