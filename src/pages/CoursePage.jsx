import { useParams } from "react-router-dom";
import CoursePageLayout from "../components/course/CoursePageLayout.jsx";
import CoursePageContent from "../components/course/CoursePageContent.jsx";
import {useCoursePageData} from "../components/course/hooks/useCoursePageData.js";

const CoursePage = () => {
    const { courses, categories, loading, error, refetch } = useCoursePageData();

    return (
        <CoursePageLayout loading={loading} error={error} refetch={refetch}>
            <CoursePageContent courses={courses} categories={categories} />
        </CoursePageLayout>
    );
};

export default CoursePage;