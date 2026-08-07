import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import LogoItem from './LogoItem';

const LogoCarousel = ({ logos }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const scrollContainer = containerRef.current.querySelector('.scroll-container');
        if (!scrollContainer) return;

        gsap.to(scrollContainer, {
            xPercent: -33.333,
            duration: 20,
            ease: 'none',
            repeat: -1,
            modifiers: {
                xPercent: gsap.utils.unitize(gsap.utils.wrap(-33.333, 0)),
            },
        });
    }, []);

    return (
        <div ref={containerRef} className="relative h-32 overflow-hidden">
            <div className="scroll-container flex items-start absolute whitespace-nowrap">
                {[0,1,2].map(setIndex =>
                    logos.map((logo, idx) => {
                        const globalIndex = setIndex * logos.length + idx;
                        return <LogoItem key={`${logo.id}-${setIndex}`} logo={logo} isTop={globalIndex % 2 === 0} />;
                    })
                )}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>
    );
};

export default LogoCarousel;
