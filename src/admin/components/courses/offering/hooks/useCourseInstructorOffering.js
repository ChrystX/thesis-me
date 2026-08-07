import { useState } from "react";
import {useCourseInstructors} from "../../../../../hooks/courses/useCourseInstructor.js";


export function useCourseInstructorOffering(courseId) {
    const { instructors, loading, assign, unassign, refetch } = useCourseInstructors(courseId);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleAssign = async (instructorId, sortOrder) => {
        setSaving(true);
        try {
            await assign({ courseId, instructorId,  sortOrder });
        } finally {
            setSaving(false);
        }
    };

    const handleUnassign = async (instructorId) => {
        if (!window.confirm("Remove this instructor from the course?")) return;
        setSaving(true);
        try {
            await unassign(instructorId);
        } finally {
            setSaving(false);
        }
    };

    return {
        instructors,
        loading,
        saving,
        refetch,
        isModalOpen,
        handleOpen,
        handleClose,
        handleAssign,
        handleUnassign,
    };
}