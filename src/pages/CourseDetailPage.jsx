import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../hooks/course/useCourse.js';
import {useCourseSections} from "../hooks/courses/useCourseSections.js";
import {useCourseFaqs} from "../hooks/courses/useCourseFaqs.js";
import {useCourseDetail} from "../hooks/courses/useCourseDetail.js";
import CourseDetailLayout from "../components/coursedetail/coursedetailpage/CourseDetailLayout.jsx";
import CourseDetailContent from "../components/coursedetail/coursedetailpage/CourseDetailContent.jsx";

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const { course, loading: loadingCourse, error: errorCourse } = useCourse(courseId);
    const { detail, loading: loadingDetail, error: errorDetail } = useCourseDetail(courseId);
    const { sections } = useCourseSections(courseId);
    const { faqs } = useCourseFaqs(courseId);

    const loading = loadingCourse || loadingDetail;
    const error = errorCourse || errorDetail;

    return (
        <CourseDetailLayout loading={loading} error={error}>
            <CourseDetailContent
                course={course}
                detail={detail}
                sections={sections}
                faqs={faqs}
            />
        </CourseDetailLayout>
    );
};

export default CourseDetailPage;