import { Edit3, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const BlogTableRow = ({
                          blog,
                          onEdit,
                          onDelete,
                          onToggleStatus,
                      }) => {
    const isPublished = blog.status === "published";

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">#{blog.id}</span>
            </td>

            <td className="px-6 py-4 max-w-[220px]">
                <div>
                    <span className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</span>
                    {blog.summary && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{blog.summary}</p>
                    )}
                </div>
            </td>

            <td className="px-6 py-4 max-w-[160px]">
                <span className="text-xs font-mono text-gray-500 truncate block">{blog.slug}</span>
            </td>

            <td className="px-6 py-4">
                <span className={`text-xs px-2 py-1 rounded inline-block ${
                    isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}>
                    {isPublished ? "Published" : "Draft"}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{blog.viewCount ?? 0}</span>
            </td>

            <td className="px-6 py-4">
                <span className="text-sm text-gray-500">{formatDate(blog.publishedAt)}</span>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onToggleStatus(blog)}
                        className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-yellow-50"
                        title={isPublished ? "Unpublish" : "Publish"}
                    >
                        {isPublished
                            ? <ToggleRight className="w-4 h-4" />
                            : <ToggleLeft className="w-4 h-4" />
                        }
                    </button>

                    <button
                        onClick={() => onEdit(blog)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                        title="Edit"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(blog.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default BlogTableRow;