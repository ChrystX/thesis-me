import BlogDetailHeader from "../BlogDetailHeader.jsx";
import BlogDetailContent from "../BlogDetailContent.jsx";
import BlogDetailTags from "../BlogDetailTags.jsx";

const BlogArticleSection = ({ blog, blogDetail }) => (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-12">
            <BlogDetailHeader blog={blog} blogDetail={blogDetail} />
            <BlogDetailContent html={blogDetail.content} />
            <BlogDetailTags tagsString={blogDetail.tags} />
        </div>
    </article>
);

export default BlogArticleSection;