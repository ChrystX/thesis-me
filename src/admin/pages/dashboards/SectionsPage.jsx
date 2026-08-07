import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layers } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import SectionTable from "../../../shared/components/sections/table/SectionTable.jsx";
import SectionModal from "../../../shared/components/sections/SectionModal.jsx";
import { useLearningSections } from "../../../hooks/useLearningSections.js";
import SectionStatsCards from "../../components/sections/SectionStatCards.jsx";

const SectionsPage = () => {
    const { courseId, courseTitle } = useParams();
    const navigate = useNavigate();

    const {
        sections,
        loading,
        createSection,
        updateSection,
        deleteSection,
        refetch
    } = useLearningSections(Number(courseId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedSection, setSelectedSection] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        sortOrder: 0,
        isActive: true
    });

    const handleAdd = () => {
        setModalMode("create");
        setFormData({
            title: "",
            sortOrder: sections.length,
            isActive: true
        });
        setIsModalOpen(true);
    };

    const handleEdit = (section) => {
        setModalMode("edit");
        setSelectedSection(section);
        setFormData({
            title: section.title,
            sortOrder: section.sortOrder,
            isActive: section.isActive
        });
        setIsModalOpen(true);
    };

    const handleToggleActive = async (section) => {
        await updateSection(section.id, {
            title: section.title,
            sortOrder: section.sortOrder,
            isActive: !section.isActive
        });
    };

    const handleSubmit = async () => {
        if (modalMode === "create") {
            await createSection(formData);
        } else {
            await updateSection(selectedSection.id, formData);
        }
        setIsModalOpen(false);
    };

    const handleViewLessons = (section) => {
        navigate(`/admin/courses/${courseId}/sections/${section.id}/lessons`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title={courseTitle ? decodeURIComponent(courseTitle) : "Course"}
                subtitle="Manage sections"
                icon={Layers}
                onBack={() => navigate("/admin/courses")}
                breadcrumbs={[
                    { label: "Courses", href: "/admin/courses" },
                    { label: courseTitle ? decodeURIComponent(courseTitle) : "Course" }
                ]}
                onRefresh={refetch}
                onAdd={handleAdd}
                loading={loading}
                addLabel="Add Section"
            />

            <SectionStatsCards sections={sections} />

            <SectionTable
                sections={sections}
                loading={loading}
                onViewLessons={handleViewLessons}
                onEdit={handleEdit}
                onDelete={deleteSection}
                onToggleActive={handleToggleActive}
                onAdd={handleAdd}
            />

            <SectionModal
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

export default SectionsPage;