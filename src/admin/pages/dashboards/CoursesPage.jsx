// CoursesPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import CourseTable from "../../components/courses/table/CourseTable.jsx";
import CourseModal from "../../components/courses/CourseModal.jsx";
import { useCourses } from "../../../hooks/course/useCourses.js";
import CourseStatsCards from "../../components/courses/CourseStatCards.jsx";
import {useCategories} from "../../../hooks/courses/useCategories.js";

const emptyForm = {
    title: "",
    description: "",
    price: 0,
    duration: 0,
    image: "",
    isActive: true,
    categoryId: null,
    rating: null,      // ← add
};
const CoursesPage = () => {
    const navigate = useNavigate();

    const {
        courses,
        loading,
        createCourse,
        updateCourse,
        deleteCourse,
        toggleActive,
        refetch,
    } = useCourses();

    const { categories } = useCategories();   // ← new

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const handleAdd = () => {
        setModalMode("create");
        setFormData(emptyForm);
        setIsModalOpen(true);
    };

    const handleEdit = (course) => {
        setModalMode("edit");
        setSelectedCourse(course);
        setFormData({
            title: course.title,
            description: course.description ?? "",
            price: course.price ?? 0,
            duration: course.duration ?? 0,
            image: course.image ?? "",
            isActive: course.isActive,
            categoryId: course.categoryId ?? null,
            rating: course.rating ?? null,   // ← add
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (modalMode === "create") {
            await createCourse(formData);
        } else {
            await updateCourse(selectedCourse.id, {
                ...selectedCourse,
                ...formData,
                id: selectedCourse.id,
            });
        }
        setIsModalOpen(false);
    };

    const handleManageOffering = (course) => {
        navigate(`/admin/courses/${course.id}/offering`);
    };

    const handleManageContent = (course) => {
        navigate(`/admin/courses/${course.id}/content`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Courses"
                subtitle="Manage your course catalogue"
                icon={BookOpen}
                onRefresh={refetch}
                onAdd={handleAdd}
                loading={loading}
                addLabel="Add Course"
            />

            <CourseStatsCards courses={courses} />

            <CourseTable
                courses={courses}
                loading={loading}
                onManageOffering={handleManageOffering}
                onManageContent={handleManageContent}
                onEdit={handleEdit}
                onDelete={deleteCourse}
                onToggleActive={toggleActive}
                onAdd={handleAdd}
            />

            <CourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                mode={modalMode}
                categories={categories}    // ← new
            />
        </div>
    );
};

export default CoursesPage;