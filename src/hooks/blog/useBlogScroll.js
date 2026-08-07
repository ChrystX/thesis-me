import { useState, useEffect } from 'react';

export const useBlogScroll = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalNavbarHeight = Math.max(0, 48 - scrollY / 2) + 80;
    return { totalNavbarHeight };
};