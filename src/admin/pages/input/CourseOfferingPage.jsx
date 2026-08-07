import { useNavigate, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import CourseDetailSection from "../../components/courses/offering/sections/CourseDetailSection.jsx";
import CourseDetailModal from "../../components/courses/offering/CourseDetailModal.jsx";
import CourseFaqModal from "../../components/courses/offering/CourseFaqModal.jsx";
import {useCourseOfferingDetail} from "../../components/courses/offering/hooks/useCourseOfferingDetail.js";
import {useCourseFaqOffering} from "../../components/courses/offering/hooks/useCourseFaqOffering.js";
import CourseFaqSection from "../../components/courses/offering/sections/CouseFaqSection.jsx";
import CourseSectionSection from "../../components/courses/offering/sections/CourseSyllabusSection.jsx";
import {useCourseSectionOffering} from "../../components/courses/offering/hooks/useCourseSectionOffering.js";
import CourseSectionModal from "../../components/courses/offering/CourseSectionModal.jsx";
import CourseInstructorSection from "../../components/courses/offering/sections/CourseInstructorSection.jsx";
import {useCourseInstructorOffering} from "../../components/courses/offering/hooks/useCourseInstructorOffering.js";
import CourseInstructorModal from "../../components/courses/offering/CourseInstructorModal.jsx";

const CourseOfferingPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const id = Number(courseId);

    const detail = useCourseOfferingDetail(id);
    const faq = useCourseFaqOffering(id);
    const section = useCourseSectionOffering(id);
    const instructor = useCourseInstructorOffering(id);

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Course Offering"
                subtitle="Manage course detail and FAQs"
                icon={FileText}
                onRefresh={() => { detail.refetch(); faq.refetch(); }}
                loading={detail.loading || faq.loading}
                onBack={() => navigate("/admin/courses")}
                breadcrumbs={[
                    { label: "Courses", href: "/admin/courses" },
                    { label: "Offering" },
                ]}
            />

            <CourseDetailSection
                detail={detail.detail}
                loading={detail.loading}
                onAdd={detail.handleAdd}
                onEdit={detail.handleEdit}
                onDelete={detail.handleDelete}
            />

            <CourseFaqSection
                faqs={faq.faqs}
                loading={faq.loading}
                onAdd={faq.handleAdd}
                onEdit={faq.handleEdit}
                onDelete={faq.handleDelete}
            />

            <CourseSectionSection
                sections={section.sections}
                loading={section.loading}
                onAdd={section.handleAdd}
                onEdit={section.handleEdit}
                onDelete={section.handleDelete}
            />

            <CourseInstructorSection
                instructors={instructor.instructors}
                loading={instructor.loading}
                onOpen={instructor.handleOpen}
                onUnassign={instructor.handleUnassign}
            />

            <CourseSectionModal
                isOpen={section.isModalOpen}
                onClose={section.handleClose}
                onSubmit={section.handleSubmit}
                formData={section.formData}
                setFormData={section.setFormData}
                mode={section.modalMode}
                saving={section.saving}
            />

            <CourseDetailModal
                isOpen={detail.isModalOpen}
                onClose={detail.handleClose}
                onSubmit={detail.handleSubmit}
                formData={detail.formData}
                setFormData={detail.setFormData}
                mode={detail.modalMode}
                saving={detail.saving}
            />

            <CourseFaqModal
                isOpen={faq.isModalOpen}
                onClose={faq.handleClose}
                onSubmit={faq.handleSubmit}
                formData={faq.formData}
                setFormData={faq.setFormData}
                mode={faq.modalMode}
                saving={faq.saving}
            />

            <CourseInstructorModal
                isOpen={instructor.isModalOpen}
                onClose={instructor.handleClose}
                assignedInstructors={instructor.instructors}
                onAssign={instructor.handleAssign}
                onUnassign={instructor.handleUnassign}
                saving={instructor.saving}
            />
        </div>
    );
};

export default CourseOfferingPage;