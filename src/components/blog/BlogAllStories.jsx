import { BookOpen } from 'lucide-react';
import BlogGrid from "./BlogGrid.jsx";
import Pagination from "./BlogPagination.jsx";

const BlogAllStories = ({ blogs, currentPage, totalPages, onPageChange }) => {
    const blogsPerPage = 12;
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

    return (
        <section>
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">All Stories</h2>
                <p className="text-gray-600 text-sm">Page {currentPage} of {totalPages}</p>
                <div className="relative mx-auto w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e91e63] to-transparent rounded-full mt-3" />
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <BookOpen size={32} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No stories available</p>
                </div>
            ) : (
                <>
                    <BlogGrid blogs={currentBlogs} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </>
            )}
        </section>
    );
};

export default BlogAllStories;