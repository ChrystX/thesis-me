import {useCourses} from "../../../hooks/course/useCourses.js";
import {useCategories} from "../../../hooks/courses/useCategories.js";

export const useCoursePageData = () => {
    const { courses, loading: coursesLoading, error: coursesError, refetch: refetchCourses } = useCourses();
    const { categories, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();

    return {
        courses,
        categories,
        loading: coursesLoading || categoriesLoading,
        error: coursesError || categoriesError,
        refetch: () => { refetchCourses(); refetchCategories(); },
    };
};