import { useState } from "react";
import {useCourseSections} from "../../../../../hooks/courses/useCourseSections.js";

const EMPTY_SECTION = {
    title: "",
    contentHtml: "",
    videoUrl: "",
    thumbnailUrl: "",
    durationMinutes: "",
    sortOrder: "",
};

export function useCourseSectionOffering(courseId) {
    const { sections, loading, createSection, updateSection, deleteSection, refetch } = useCourseSections(courseId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedSection, setSelectedSection] = useState(null);
    const [formData, setFormData] = useState(EMPTY_SECTION);
    const [saving, setSaving] = useState(false);

    const handleAdd = () => {
        setModalMode("create");
        setSelectedSection(null);
        setFormData({ ...EMPTY_SECTION, sortOrder: sections.length + 1 });
        setIsModalOpen(true);
    };

    const handleEdit = (section) => {
        setModalMode("edit");
        setSelectedSection(section);
        setFormData({
            title: section.title,
            contentHtml: section.contentHtml ?? "",
            videoUrl: section.videoUrl ?? "",
            thumbnailUrl: section.thumbnailUrl ?? "",
            durationMinutes: section.durationMinutes?.toString() ?? "",
            sortOrder: section.sortOrder?.toString() ?? "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this section?")) return;
        await deleteSection(id);
    };

    const handleSubmit = async () => {
        if (!formData.title.trim()) return;
        setSaving(true);
        try {
            const dto = {
                courseId,
                title: formData.title,
                contentHtml: formData.contentHtml || null,
                videoUrl: formData.videoUrl || null,
                thumbnailUrl: formData.thumbnailUrl || null,
                durationMinutes: formData.durationMinutes ? Number(formData.durationMinutes) : null,
                sortOrder: formData.sortOrder ? Number(formData.sortOrder) : sections.length + 1,
            };
            modalMode === "create"
                ? await createSection(dto)
                : await updateSection(selectedSection.id, dto);
            setIsModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedSection(null);
        setFormData(EMPTY_SECTION);
    };

    return {
        sections,
        loading,
        saving,
        refetch,
        isModalOpen,
        modalMode,
        formData,
        setFormData,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        handleClose,
    };
}