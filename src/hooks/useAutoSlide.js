import { useEffect } from 'react';

export function useAutoSlide(enabled, length, delay, setIndex) {
    useEffect(() => {
        if (!enabled || length <= 1) return;

        const id = setInterval(() => {
            setIndex(i => (i + 1) % length);
        }, delay);

        return () => clearInterval(id);
    }, [enabled, length, delay, setIndex]);
}
