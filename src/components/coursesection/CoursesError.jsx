const CoursesError = ({ error, onRetry }) => (
    <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-700 mb-4">{error}</p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
                Try Again
            </button>
        </div>
    </div>
);

export default CoursesError;
