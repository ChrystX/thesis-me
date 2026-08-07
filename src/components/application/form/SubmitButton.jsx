import { Send } from "lucide-react";

export default function SubmitButton({ loading, onClick }) {
    return (
        <button onClick={onClick} disabled={loading} className="signup-button">
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                </div>
            )}
        </button>
    );
}