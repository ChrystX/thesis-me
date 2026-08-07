import ApplicationFields from "./ApplicationFields.jsx";
import SubmitButton from "./SubmitButton.jsx";
import SuccessScreen from "./SuccessScreen.jsx";
import {useApplicationForm} from "../../../hooks/application/useApplicationForm.js";
import {useApplication} from "../../../hooks/application/useApplication.js";

export default function SignUpForm() {
    const { formData, formError, handleInputChange, handleFileChange, validate, reset: resetForm, buildFormData } = useApplicationForm();
    const { submit, loading, error: apiError, applicationId, submitted, reset: resetApi } = useApplication();

    const error = formError || apiError;

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (!validate()) return;
        await submit(buildFormData());
    };

    const handleReset = () => {
        resetForm();
        resetApi();
    };

    if (submitted) {
        return <SuccessScreen applicationId={applicationId} onReset={handleReset} />;
    }

    return (
        <div className="py-8 bg-white flex items-center justify-center px-4 sm:px-6">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-2">Course Application</h2>
                    <p className="text-gray-500 font-light text-sm sm:text-base">Professional beauty and wellness programs</p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                    </div>
                )}

                <ApplicationFields
                    formData={formData}
                    onInputChange={handleInputChange}
                    onFileChange={handleFileChange}
                />

                <SubmitButton loading={loading} onClick={handleSubmit} />

                <p className="text-xs sm:text-sm text-gray-400 text-center mt-4">
                    By submitting this form, you agree to be contacted regarding your course application.
                </p>
            </div>
        </div>
    );
}