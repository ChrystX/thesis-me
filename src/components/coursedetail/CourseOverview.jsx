import React from 'react';
import { Star, Clock } from 'lucide-react';
import {formatDuration} from "./utils/courseUtils.js";

const BACKGROUND_STYLE = {
    backgroundImage: `url('https://i.imgur.com/Y1Xz8bn.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

const CourseOverview = ({ courseDetail, course }) => {
    if (!courseDetail || !course) {
        return (
            <section
                className="relative w-full h-72 flex items-center justify-center text-white"
                style={BACKGROUND_STYLE}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60" />
                <div className="relative z-10 animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                </div>
            </section>
        );
    }

    return (
        <main
            className="relative w-full py-10"
            style={BACKGROUND_STYLE}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="flex justify-center">
                        <img
                            src={courseDetail.heroImage}
                            alt={course.title}
                            className="w-56 h-48 object-cover rounded-xl shadow-lg border border-gray-700"
                        />
                    </div>

                    <div className="text-white space-y-3 col-span-2">
                        <div className="flex items-center gap-2 text-sm opacity-80">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span>{course.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{course.category_name || 'Category'}</span>
                        </div>

                        <h4 className="text-2xl font-semibold tracking-tight">
                            {course.title}
                        </h4>

                        <div className="flex items-center gap-1 text-sm opacity-75">
                            <Clock size={14} className="text-gray-300" />
                            <span>{formatDuration(course.duration)}</span>
                        </div>

                        <p className="text-lg opacity-75 leading-relaxed max-w-lg">
                            {course.description}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CourseOverview;