import { useState, useMemo } from 'react';
import SectionItem from './SectionItem';
import { formatDuration } from '../utils/courseUtils';

const CourseSection = ({ sections = [] }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const totalDuration = useMemo(() => {
        return sections.reduce(
            (total, section) => total + (section.durationMinutes || 0),
            0
        );
    }, [sections]);

    if (sections.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold">Course Syllabus</h2>
                    <p className="text-gray-600 mt-2">
                        No sections available for this course
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">Course Syllabus</h2>
                <p className="text-gray-600 mt-2">
                    {sections.length} lessons • {formatDuration(totalDuration)} total length
                </p>
            </div>

            <div>
                {sections.map((section, index) => (
                    <SectionItem
                        key={section.id}
                        section={section}
                        index={index}
                        isExpanded={expandedSection === section.id}
                        onToggle={() =>
                            setExpandedSection(
                                expandedSection === section.id ? null : section.id
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseSection;