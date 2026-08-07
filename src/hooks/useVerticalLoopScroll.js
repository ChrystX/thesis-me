import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useVerticalLoopScroll = (containerRef, contentRef, deps = []) => {
    const tweenRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        const moveDistance = content.scrollHeight / 2;

        tweenRef.current = gsap.to(content, {
            y: -moveDistance,
            ease: "none",
            duration: 60,
            repeat: -1,
        });

        const pause = () =>
            gsap.to(tweenRef.current, { timeScale: 0, duration: 0.3 });
        const resume = () =>
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.3 });

        container.addEventListener("mouseenter", pause);
        container.addEventListener("mouseleave", resume);

        return () => {
            container.removeEventListener("mouseenter", pause);
            container.removeEventListener("mouseleave", resume);
            tweenRef.current?.kill();
        };
    }, deps);
};
