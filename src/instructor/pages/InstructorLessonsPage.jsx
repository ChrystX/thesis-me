import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLessons } from "../../hooks/lesson/useLessons.js";
import LessonTable from "../../shared/components/lessons/table/LessonTable.jsx";
import LessonModal from "../../shared/components/lessons/LessonModal.jsx";

const InstructorLessonsPage = () => {
    const { courseId, courseTitle, sectionId, sectionTitle } = useParams();
    const navigate = useNavigate();

    const {
        lessons,
        createLesson,
        updateLesson,
        deleteLesson,
        refetch,
    } = useLessons(Number(sectionId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", sortOrder: 0, lessonType: "lesson" });

    const handleAdd = () => {
        setModalMode("create");
        setFormData({ title: "", description: "", sortOrder: lessons.length });
        setIsModalOpen(true);
    };

    const handleEdit = (lesson) => {
        setModalMode("edit");
        setSelectedLesson(lesson);
        setFormData({ title: lesson.title, description: lesson.description ?? "", sortOrder: lesson.sortOrder, lessonType: lesson.lessonType ?? "lesson" });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (modalMode === "create") {
            await createLesson(formData);
        } else {
            await updateLesson(selectedLesson.id, formData);
        }
        setIsModalOpen(false);
    };

    const handleOpenEditor = (lesson) => {
        if (lesson.lessonType === "exam") {
            navigate(
                `/instructor/courses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/exam`,
                { state: { lessonTitle: lesson.title } }
            );
        } else {
            navigate(
                `/instructor/courses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/editor`,
                { state: { lessonTitle: lesson.title } }
            );
        }
    };

    const decodedCourseTitle = courseTitle ? decodeURIComponent(courseTitle) : "Course";
    const decodedSectionTitle = sectionTitle ? decodeURIComponent(sectionTitle) : "Section";

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate(`/instructor/courses/${courseId}/sections`)}
                        className="text-xs text-gray-400 hover:text-gray-600 mb-1 flex items-center gap-1"
                    >
                        ← Back to {decodedCourseTitle}
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{decodedSectionTitle}</h1>
                    <p className="text-sm text-gray-500">Manage lessons</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refetch}
                        className="text-sm px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={handleAdd}
                        className="text-sm px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                        + Add Lesson
                    </button>
                </div>
            </div>

            <LessonTable
                lessons={lessons}
                onOpenEditor={handleOpenEditor}
                onEdit={handleEdit}
                onDelete={deleteLesson}
                onAdd={handleAdd}
            />

            <LessonModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                mode={modalMode}
            />
        </div>
    );
};

export default InstructorLessonsPage;