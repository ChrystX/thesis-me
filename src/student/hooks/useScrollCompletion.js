import { useEffect, useState } from "react";

export function useScrollCompletion(ref, deps = []) {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

    useEffect(() => {
        setHasScrolledToBottom(false);
    }, deps);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                setHasScrolledToBottom(true);
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [ref, ...deps]);

    return hasScrolledToBottom;
}