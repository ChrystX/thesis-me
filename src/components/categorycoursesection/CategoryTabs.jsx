import CategoryCard from "../categorycard/CategoryCard.jsx";

export default function CategoryTabs({ categories, selected, onSelect }) {
    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex gap-4">
                {categories.map(cat => (
                    <div key={cat.id} className="flex-1">
                        <CategoryCard
                            category={cat}
                            isSelected={selected.id === cat.id}
                            onClick={onSelect}
                        />
                    </div>
                ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex overflow-x-auto border-b pb-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat)}
                        className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                            selected.id === cat.id ? 'text-pink-600' : 'text-gray-500'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </>
    );
}