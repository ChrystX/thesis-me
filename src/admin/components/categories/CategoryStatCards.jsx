import { Tag, BookOpen } from "lucide-react";

const CategoryStatCards = ({ categories = [], courses = [] }) => {
    const stats = {
        total: categories.length,
        withCourses: categories.filter(cat =>
            courses.some(c => c.categoryId === cat.id)
        ).length,
        empty: categories.filter(cat =>
            !courses.some(c => c.categoryId === cat.id)
        ).length,
        avgCourses: categories.length
            ? (courses.filter(c => c.categoryId).length / categories.length).toFixed(1)
            : "0.0",
    };

    const cards = [
        { title: "Total Categories", value: stats.total, icon: Tag, color: "text-blue-500" },
        { title: "With Courses", value: stats.withCourses, icon: BookOpen, color: "text-green-500" },
        { title: "Empty", value: stats.empty, icon: Tag, color: "text-red-500" },
        { title: "Avg. Courses", value: stats.avgCourses, icon: BookOpen, color: "text-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                            <Icon className={`w-8 h-8 ${card.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryStatCards;