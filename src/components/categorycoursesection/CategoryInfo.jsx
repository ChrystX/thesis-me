export default function CategoryInfo({ category, count }) {
    return (
        <div className="lg:w-80">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-gray-600 mt-2">{category.description}</p>

            <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p>{count} course{count !== 1 && 's'}</p>
                <p>Professional Training</p>
            </div>
        </div>
    );
}
