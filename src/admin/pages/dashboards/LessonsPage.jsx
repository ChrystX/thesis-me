import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import LessonTable from "../../../shared/components/lessons/table/LessonTable.jsx";
import LessonModal from "../../../shared/components/lessons/LessonModal.jsx";
import { useLessons } from "../../../hooks/lesson/useLessons.js";
import LessonStatsCards from "../../components/lessons/LessonStatCards.jsx";

const LessonsPage = () => {
    const { courseId, courseTitle, sectionId, sectionTitle } = useParams();
    const navigate = useNavigate();

    const {
        lessons,
        createLesson,
        updateLesson,
        deleteLesson,
        refetch
    } = useLessons(Number(sectionId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedLesson, setSelectedLesson] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sortOrder: 0
    });

    const handleAdd = () => {
        setModalMode("create");
        setFormData({
            title: "",
            description: "",
            sortOrder: lessons.length
        });
        setIsModalOpen(true);
    };

    const handleEdit = (lesson) => {
        setModalMode("edit");
        setSelectedLesson(lesson);
        setFormData({
            title: lesson.title,
            description: lesson.description ?? "",
            sortOrder: lesson.sortOrder
        });
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
        navigate(
            `/admin/courses/${courseId}/sections/${sectionId}/lessons/${lesson.id}/editor`,
            { state: { lessonTitle: lesson.title } }
        );
    };

    const decodedCourseTitle = courseTitle ? decodeURIComponent(courseTitle) : "Course";
    const decodedSectionTitle = sectionTitle ? decodeURIComponent(sectionTitle) : "Section";

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title={decodedSectionTitle}
                subtitle="Manage lessons"
                icon={BookOpen}
                onBack={() => navigate(`/admin/courses/${courseId}/sections`)}
                breadcrumbs={[
                    { label: "Courses", href: "/admin/courses" },
                    {
                        label: decodedCourseTitle,
                        href: `/admin/courses/${courseId}/sections`
                    },
                    { label: decodedSectionTitle }
                ]}
                onRefresh={refetch}
                onAdd={handleAdd}
                addLabel="Add Lesson"
            />

            <LessonStatsCards lessons={lessons} />

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

export default LessonsPage;