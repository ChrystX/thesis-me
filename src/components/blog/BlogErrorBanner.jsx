const BlogErrorBanner = ({ message }) => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
        <p className="text-yellow-800 text-sm">
            Could not fetch blogs from API: {message}
        </p>
    </div>
);

export default BlogErrorBanner;