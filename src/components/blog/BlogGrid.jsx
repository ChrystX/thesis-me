import BlogCard from "../blogcard/BlogCard.jsx";

const BlogGrid = ({ blogs }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
    </div>
);

export default BlogGrid;