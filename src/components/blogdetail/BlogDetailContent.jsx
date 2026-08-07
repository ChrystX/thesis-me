const BlogDetailContent = ({ html }) => (
    <div
        className="prose prose-lg max-w-none
                   prose-headings:text-gray-900 prose-headings:font-bold
                   prose-p:text-gray-700 prose-p:leading-relaxed
                   prose-a:text-[#e91e63] hover:prose-a:text-[#d01758] prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-lg prose-img:shadow-md
                   prose-blockquote:border-l-[#e91e63] prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg
                   prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                   prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: html }}
    />
);

export default BlogDetailContent;