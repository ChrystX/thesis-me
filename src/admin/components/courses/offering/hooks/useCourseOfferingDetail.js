import { useState } from "react";
import {useCourseDetail} from "../../../../../hooks/courses/useCourseDetail.js";


const EMPTY_DETAIL = {
    id: "",
    shortDescription: "",
    fullDescriptionHtml: "",
    toolsRequired: "",
    heroImage: "",
};

export function useCourseOfferingDetail(courseId) {
    const { detail, loading, refetch, createDetail, updateDetail, deleteDetail } = useCourseDetail(courseId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [formData, setFormData] = useState(EMPTY_DETAIL);
    const [saving, setSaving] = useState(false);

    const handleAdd = () => {
        setModalMode("create");
        setFormData(EMPTY_DETAIL);
        setIsModalOpen(true);
    };

    const handleEdit = () => {
        setModalMode("edit");
        setFormData({
            id: detail.id,
            shortDescription: detail.shortDescription ?? "",
            fullDescriptionHtml: detail.fullDescriptionHtml ?? "",
            toolsRequired: detail.toolsRequired ?? "",
            heroImage: detail.heroImage ?? "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this course detail?")) return;
        await deleteDetail(detail.id);
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            if (modalMode === "create") {
                const dto = {
                    courseId,
                    shortDescription: formData.shortDescription || null,
                    fullDescriptionHtml: formData.fullDescriptionHtml || null,
                    toolsRequired: formData.toolsRequired || null,
                    heroImage: formData.heroImage || null,
                };
                await createDetail(dto);
            } else {
                const dto = {
                    id: detail.id,
                    courseId,
                    shortDescription: formData.shortDescription || null,
                    fullDescriptionHtml: formData.fullDescriptionHtml || null,
                    toolsRequired: formData.toolsRequired || null,
                    heroImage: formData.heroImage || null,
                };
                await updateDetail(detail.id, dto);
            }
            setIsModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => setIsModalOpen(false);

    return {
        detail,
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