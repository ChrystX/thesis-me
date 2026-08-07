import { useState } from "react";
import {useCourseFaqs} from "../../../../../hooks/courses/useCourseFaqs.js";


const EMPTY_FAQ = {
    question: "",
    answer: "",
    sortOrder: 0,
};

export function useCourseFaqOffering(courseId) {
    const { faqs, loading, createFaq, updateFaq, deleteFaq, refetch } = useCourseFaqs(courseId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FAQ);
    const [saving, setSaving] = useState(false);

    const handleAdd = () => {
        setModalMode("create");
        setSelectedFaq(null);
        setFormData(EMPTY_FAQ);
        setIsModalOpen(true);
    };

    const handleEdit = (faq) => {
        setModalMode("edit");
        setSelectedFaq(faq);
        setFormData({
            question: faq.question,
            answer: faq.answer ?? "",
            sortOrder: faq.sortOrder ?? 0,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this FAQ?")) return;
        await deleteFaq(id);
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const dto = {
                ...formData,
                courseId,
            };
            modalMode === "create"
                ? await createFaq(dto)
                : await updateFaq(selectedFaq.id, dto);
            setIsModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedFaq(null);
        setFormData(EMPTY_FAQ);
    };

    return {
        faqs,
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