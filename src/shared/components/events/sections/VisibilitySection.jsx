import { useState } from "react";
import { useCourses } from "../../../../hooks/course/useCourses.js";
import { Section, ToggleGroup } from "../ui/FormPrimitives.jsx";
import {useAuth} from "../../../../hooks/useAuth.jsx";

const VISIBILITY_OPTIONS = [
    { label: "Course only", value: "course" },
    { label: "Public", value: "public" },
    { label: "Invite only", value: "invite" },
];

export function VisibilitySection({ visibility, courseIds, onChange, onCourseIdsChange }) {
    const { user } = useAuth();
    const { courses } = useCourses({ instructorId: user?.instructorId });
    const [search, setSearch] = useState("");

    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    const toggleCourse = (id) => {
        onCourseIdsChange(
            courseIds.includes(id)
                ? courseIds.filter(c => c !== id)
                : [...courseIds, id]
        );
    };

    return (
        <Section label="Visibility">
            <ToggleGroup
                options={VISIBILITY_OPTIONS}
                value={visibility}
                onChange={onChange}
            />

            {visibility === "course" && (
                <div className="space-y-2 mt-3">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search courses..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                        {filtered.length === 0 && (
                            <p className="text-sm text-gray-400 py-2 text-center">
                                {search ? "No courses match your search." : "No courses found."}
                            </p>
                        )}
                        {filtered.map(course => (
                            <label
                                key={course.id}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                    courseIds.includes(course.id)
                                        ? "border-gray-400 bg-gray-50"
                                        : "border-gray-100"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={courseIds.includes(course.id)}
                                    onChange={() => toggleCourse(course.id)}
                                    className="w-4 h-4 accent-black"
                                />
                                <span className="text-sm text-gray-800">{course.title}</span>
                                {course.courseCode && (
                                    <span className="ml-auto text-xs text-gray-400">{course.courseCode}</span>
                                )}
                            </label>
                        ))}
                    </div>
                    {courseIds.length > 0 && (
                        <p className="text-xs text-gray-400">
                            {courseIds.length} course{courseIds.length !== 1 ? "s" : ""} selected
                        </p>
                    )}
                </div>
            )}
        </Section>
    );
}