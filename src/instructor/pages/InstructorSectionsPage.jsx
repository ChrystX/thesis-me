import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLearningSections } from "../../hooks/useLearningSections.js";
import SectionTable from "../../shared/components/sections/table/SectionTable.jsx";
import SectionModal from "../../shared/components/sections/SectionModal.jsx";

const InstructorSectionsPage = () => {
    const { courseId, courseTitle } = useParams();
    const navigate = useNavigate();

    const {
        sections,
        loading,
        createSection,
        updateSection,
        deleteSection,
        refetch,
    } = useLearningSections(Number(courseId));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedSection, setSelectedSection] = useState(null);
    const [formData, setFormData] = useState({ title: "", sortOrder: 0, isActive: true });

    const handleAdd = () => {
        setModalMode("create");
        setFormData({ title: "", sortOrder: sections.length, isActive: true });
        setIsModalOpen(true);
    };

    const handleEdit = (section) => {
        setModalMode("edit");
        setSelectedSection(section);
        setFormData({ title: section.title, sortOrder: section.sortOrder, isActive: section.isActive });
        setIsModalOpen(true);
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
        navigate(`/instructor/courses/${courseId}/sections/${section.id}/lessons`);
    };

    const decodedTitle = courseTitle ? decodeURIComponent(courseTitle) : "Course";

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate("/instructor/dashboard")}
                        className="text-xs text-gray-400 hover:text-gray-600 mb-1 flex items-center gap-1"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{decodedTitle}</h1>
                    <p className="text-sm text-gray-500">Manage sections</p>
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
                        + Add Section
                    </button>
                </div>
            </div>

            {/* Table — no onToggleActive passed, so toggle button is hidden */}
            <SectionTable
                sections={sections}
                loading={loading}
                onViewLessons={handleViewLessons}
                onEdit={handleEdit}
                onDelete={deleteSection}
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

export default InstructorSectionsPage;