import BaseModal from "../BaseModal.jsx";

const EnrollmentRecoveryModal = ({ isOpen, onClose, onConfirm, record, recovering }) => {
    if (!record) return null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Recover Enrollment"
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Manually enroll this student into the course? This is safe to run even if something already partially went through.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Student</span>
                        <span className="font-medium">{record.student.username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">{record.student.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Course</span>
                        <span className="font-medium">{record.course.title}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono text-xs text-gray-600">{record.orderId}</span>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        onClick={onClose}
                        disabled={recovering}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(record.orderId)}
                        disabled={recovering}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                        {recovering ? "Enrolling..." : "Confirm Enrollment"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default EnrollmentRecoveryModal;