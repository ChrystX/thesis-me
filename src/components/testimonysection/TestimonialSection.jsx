import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {useReviews} from "../../hooks/useReviews.js";
import {useAutoSlide} from "../../hooks/useAutoSlide.js";
import TestimonialCard from "./TestimonialCard.jsx";

const SLIDE_DURATION = 6000;

export default function TestimonialSection() {
    const { reviews, loading } = useReviews();
    console.log("reviews:", reviews);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    const wrapperRef = useRef(null);
    const containerRef = useRef(null);

    // Auto-slide
    useAutoSlide(true, reviews.length, SLIDE_DURATION, setCurrentIndex);

    // Measure width
    useLayoutEffect(() => {
        if (!wrapperRef.current) return;

        const measure = () => {
            setSlideWidth(wrapperRef.current.offsetWidth);
        };

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Animate
    useLayoutEffect(() => {
        if (!containerRef.current || !slideWidth) return;

        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                x: -currentIndex * slideWidth,
                duration: 0.8,
                ease: 'power2.inOut',
            });
        });

        return () => ctx.revert();
    }, [currentIndex, slideWidth]);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
                    <div className="h-[320px] flex items-center justify-center bg-white border rounded-xl">
                        <p className="text-gray-500">Loading testimonials…</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-[760px] mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    What Our Students Say
                </h2>

                <div ref={wrapperRef} className="overflow-hidden">
                    <div
                        ref={containerRef}
                        className="flex"
                        style={{ width: reviews.length * slideWidth }}
                    >
                        {reviews.map((review, i) => (
                            <div key={i} className="flex-shrink-0" style={{ width: slideWidth }}>
                                <TestimonialCard {...{
                                    name: review.author_name,
                                    role: review.role || 'Student',
                                    content: review.text,
                                    rating: review.rating,
                                    profile_photo_url:
                                        review.profile_photo_url || review.author_url
                                }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full ${
                                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
