import LessonBlockRenderer from "./LessonBlockRenderer.jsx";

export default function LessonContent({ lesson, blocks, sectionTitle }) {
    return (
        <div className="max-w-2xl mx-auto px-5 py-10">

            {/* Lesson header */}
            <div className="mb-8">
                {sectionTitle && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-2">
                        {sectionTitle}
                    </p>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
                    {lesson.title}
                </h1>
                {lesson.description && (
                    <p className="text-gray-500 text-sm leading-relaxed">
                        {lesson.description}
                    </p>
                )}
                <div className="mt-4 h-px bg-gradient-to-r from-pink-100 via-rose-100 to-transparent" />
            </div>

            {/* Blocks */}
            <div className="flex flex-col gap-6">
                {blocks?.length > 0 ? (
                    blocks.map((block) => (
                        <div key={block.id} className="animate-fadeIn">
                            <LessonBlockRenderer block={block} />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-32 text-gray-300 text-sm">
                        No content yet.
                    </div>
                )}
            </div>
        </div>
    );
}