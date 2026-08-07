import { useRef, useState, useEffect } from 'react';

export default function useHorizontalScroll() {
    const scrollRef = useRef(null);
    const animationRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, left: 0 });
    const [velocity, setVelocity] = useState(0);
    const lastTime = useRef(0);

    const applyMomentum = () => {
        if (!scrollRef.current || Math.abs(velocity) < 0.1) return;
        scrollRef.current.scrollLeft -= velocity;
        setVelocity(v => v * 0.95);
        animationRef.current = requestAnimationFrame(applyMomentum);
    };

    const onDown = x => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setIsDragging(true);
        setStart({ x, left: scrollRef.current.scrollLeft });
        lastTime.current = Date.now();
        setVelocity(0);
    };

    const onMove = x => {
        if (!isDragging) return;
        const now = Date.now();
        const dx = x - start.x;
        const newLeft = start.left - dx;
        const dt = now - lastTime.current;

        if (dt > 0) {
            setVelocity((scrollRef.current.scrollLeft - newLeft) / dt * 16);
            lastTime.current = now;
        }

        scrollRef.current.scrollLeft = newLeft;
    };

    const onUp = () => {
        setIsDragging(false);
        if (Math.abs(velocity) > 0.5) {
            animationRef.current = requestAnimationFrame(applyMomentum);
        }
    };

    useEffect(() => {
        return () => animationRef.current && cancelAnimationFrame(animationRef.current);
    }, []);

    return {
        scrollRef,
        isDragging,
        bind: {
            onMouseDown: e => onDown(e.clientX),
            onMouseMove: e => onMove(e.clientX),
            onMouseUp: onUp,
            onMouseLeave: onUp,
            onTouchStart: e => onDown(e.touches[0].clientX),
            onTouchMove: e => onMove(e.touches[0].clientX),
            onTouchEnd: onUp
        }
    };
}
