import { useState, useEffect, useCallback } from "react";

export function useBlogCarousel(itemCount, visibleCount, maxIndex) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (itemCount <= Math.floor(visibleCount)) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [itemCount, visibleCount, maxIndex]);

    const next = useCallback(() =>
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1)), [maxIndex]);

    const prev = useCallback(() =>
        setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1)), [maxIndex]);

    const goTo = useCallback((index) =>
        setCurrentIndex(Math.min(index, maxIndex)), [maxIndex]);

    return { currentIndex, next, prev, goTo };
}