import { Upload } from "lucide-react";

export default function FileUploadField({ label, Icon, file, onChange }) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-900 font-medium flex items-center">
                <Icon className="w-4 h-4 mr-2" /> {label} <span className="text-gray-400 font-normal ml-1">(Optional)</span>
            </label>
            <div className="relative">
                <input type="file" onChange={onChange} accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                <label
                    htmlFor="cv-upload"
                    className="w-full flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 py-3 px-2 cursor-pointer hover:border-gray-900 transition-colors duration-200 rounded-sm"
                >
                    <div className="flex items-center mb-1 sm:mb-0">
                        <Upload className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-gray-900">{file ? file.name : 'Choose file'}</span>
                    </div>
                    <span className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</span>
                </label>
            </div>
        </div>
    );
}