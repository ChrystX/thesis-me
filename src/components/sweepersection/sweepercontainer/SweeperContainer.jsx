import { useRef, useMemo } from "react";
import {useVerticalLoopScroll} from "../../../hooks/useVerticalLoopScroll.js";
import SweeperCard from "../sweepercard/SweeperCard.jsx";

const SweeperContainer = ({ courses }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const rows = useMemo(() => {
        const paired = [];
        for (let i = 0; i < courses.length; i += 2) {
            paired.push([courses[i], courses[i + 1] || courses[0]]);
        }
        return [...paired, ...paired];
    }, [courses]);

    useVerticalLoopScroll(containerRef, contentRef, [courses]);

    return (
        <div
            ref={containerRef}
            className="w-full max-w-6xl mx-auto overflow-hidden relative h-[600px]"
        >
            <div ref={contentRef} className="flex flex-col space-y-6">
                {rows.map((row, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-2 gap-6"
                        style={{
                            transform: i % 2 ? "translateX(20px)" : "none",
                        }}
                    >
                        <SweeperCard course={row[0]} />
                        <SweeperCard course={row[1]} />
                    </div>
                ))}
            </div>

            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white/10 to-transparent pointer-events-none z-10" />
        </div>
    );
};

export default SweeperContainer;
