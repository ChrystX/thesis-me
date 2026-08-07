import { useState, useEffect, useCallback } from "react";

const getResponsiveConfig = () => {
    const width = window.innerWidth;
    if (width < 480)  return { visibleCount: 1.2, cardWidth: Math.min(280, width - 32), gap: 16 };
    if (width < 640)  return { visibleCount: 1.5, cardWidth: 260, gap: 16 };
    if (width < 768)  return { visibleCount: 2.3, cardWidth: 240, gap: 16 };
    if (width < 1024) return { visibleCount: 3,   cardWidth: 280, gap: 20 };
    if (width < 1280) return { visibleCount: 4,   cardWidth: 300, gap: 20 };
    return             { visibleCount: 4.5, cardWidth: 320, gap: 24 };
};

export function useCarouselLayout() {
    const [config, setConfig] = useState(getResponsiveConfig);
    const [containerWidth, setContainerWidth] = useState(0);

    const updateLayout = useCallback(() => {
        const width = window.innerWidth;
        setConfig(getResponsiveConfig());
        setContainerWidth(width < 640 ? width - 32 : width - 64);
    }, []);

    useEffect(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, [updateLayout]);

    const cardWidth = Math.floor(
        (containerWidth - config.gap * (Math.floor(config.visibleCount) - 1)) / config.visibleCount
    );

    return { config, cardWidth };
}