export default function SuccessScreen({ applicationId, onReset }) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-12 h-12 border border-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">Application Submitted</h2>
                <p className="text-gray-600 font-light mb-4">We'll review your application and contact you soon.</p>
                {applicationId && (
                    <p className="text-sm text-gray-500">
                        Application ID: <span className="font-medium">#{applicationId}</span>
                    </p>
                )}
                <button onClick={onReset} className="mt-6 text-sm sm:text-base text-gray-600 underline hover:text-gray-900 transition-colors">
                    Submit another application
                </button>
            </div>
        </div>
    );
}