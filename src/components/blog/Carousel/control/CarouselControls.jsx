import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselControls = ({ onPrev, onNext, disablePrev, disableNext, mobile = false }) => {
    if (mobile) {
        return (
            <div className="flex sm:hidden justify-center gap-3 mt-4">
                <button onClick={onPrev} aria-label="Previous slide"
                        className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-[#E91E63] hover:text-white transition-all duration-300 touch-manipulation">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={onNext} aria-label="Next slide"
                        className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-[#E91E63] hover:text-white transition-all duration-300 touch-manipulation">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="hidden sm:flex gap-2">
            <button onClick={onPrev} disabled={disablePrev} aria-label="Previous slide"
                    className="p-2.5 rounded-full border border-gray-200 hover:bg-[#E91E63] hover:text-white hover:border-[#E91E63] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={onNext} disabled={disableNext} aria-label="Next slide"
                    className="p-2.5 rounded-full border border-gray-200 hover:bg-[#E91E63] hover:text-white hover:border-[#E91E63] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default CarouselControls;