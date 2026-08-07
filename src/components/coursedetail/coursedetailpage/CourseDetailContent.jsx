import CourseOverview from "../CourseOverview.jsx";
import CourseBenefits from "../CourseBenefit.jsx";
import CourseDescription from "../CourseDescription.jsx";
import CourseSection from "../syllabus/CourseSection.jsx";
import CourseFaq from "../coursefaq/CourseFaq.jsx";
import CoursePurchaseBox from "../payment/CoursePurchaseBox.jsx";

const CourseDetailContent = ({ course, detail, sections, faqs }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Left — main content */}
            <div className="lg:col-span-2 space-y-12">
                <CourseOverview
                    courseDetail={detail}
                    courseSections={sections}
                    course={course}
                />
                <CourseBenefits />
                <CourseDescription
                    fullDescriptionHtml={detail?.fullDescriptionHtml}
                    toolsRequired={detail?.toolsRequired}
                />
                <CourseSection sections={sections} />
                <CourseFaq faqs={faqs} />
            </div>

            {/* Right — sticky purchase box */}
            <aside className="hidden lg:block">
                <div className="sticky top-28">
                    {course && <CoursePurchaseBox course={course} />}
                </div>
            </aside>

        </div>
    );
};

export default CourseDetailContent;