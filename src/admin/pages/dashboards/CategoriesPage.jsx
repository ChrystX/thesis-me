// CategoriesPage.jsx
import { useState } from "react";
import { Tag } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import CategoryTable from "../../components/categories/table/CategoryTable.jsx";
import CategoryModal from "../../components/categories/CategoryModal.jsx";
import CategoryStatCards from "../../components/categories/CategoryStatCards.jsx";
import { useCourses } from "../../../hooks/course/useCourses.js";
import {useCategories} from "../../../hooks/courses/useCategories.js";

const emptyForm = {
    name: "",
    description: "",
};

const CategoriesPage = () => {
    const {
        categories,
        loading,
        createCategory,
        updateCategory,
        deleteCategory,
        refetch,
    } = useCategories();

    const { courses } = useCourses();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const handleAdd = () => {
        setModalMode("create");
        setFormData(emptyForm);
        setIsModalOpen(true);
    };

    const handleEdit = (category) => {
        setModalMode("edit");
        setSelectedCategory(category);
        setFormData({
            name: category.name ?? "",
            description: category.description ?? "",
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        if (modalMode === "create") {
            await createCategory(formData);
        } else {
            await updateCategory(selectedCategory.id, {
                ...selectedCategory,
                ...formData,
                id: selectedCategory.id,
            });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Categories"
                subtitle="Manage your course categories"
                icon={Tag}
                onRefresh={refetch}
                onAdd={handleAdd}
                loading={loading}
                addLabel="Add Category"
            />

            <CategoryStatCards categories={categories} courses={courses} />

            <CategoryTable
                categories={categories}
                loading={loading}
                onEdit={handleEdit}
                onDelete={deleteCategory}
                onAdd={handleAdd}
            />

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                mode={modalMode}
            />
        </div>
    );
};

export default CategoriesPage;