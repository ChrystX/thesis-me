const CarouselDots = ({ count, currentIndex, onGoTo }) => (
    <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: count }, (_, i) => (
            <button
                key={i}
                onClick={() => onGoTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                    currentIndex === i ? 'bg-[#E91E63] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
        ))}
    </div>
);

export default CarouselDots;