const CarouselCardImage = ({ imageUrl, imageError, title, onError }) => {
    if (imageUrl && !imageError) {
        return (
            <img
                src={imageUrl}
                alt={title || 'Blog post'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={onError}
                loading="lazy"
            />
        );
    }

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#836953] via-[#9d7d65] to-[#b8967d] flex items-center justify-center">
            <div className="text-3xl sm:text-4xl font-bold text-white/30">
                {title?.charAt(0) || 'B'}
            </div>
        </div>
    );
};

export default CarouselCardImage;