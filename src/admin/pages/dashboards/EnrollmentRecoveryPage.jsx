import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { DashboardHeader } from "../../components/DashboardHeader.jsx";
import { useEnrollmentRecovery } from "../../../hooks/useEnrollmentRecovery.js";
import EnrollmentRecoveryTable from "../../components/enrollments/table/EnrollmentRecoveryTable.jsx";
import EnrollmentRecoveryModal from "../../components/enrollments/EnrollmentRecoveryModal.jsx";

const EnrollmentRecoveryPage = () => {
    const { missingEnrollments, loading, recovering, refetch, recover } = useEnrollmentRecovery();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleRecover = (record) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    const handleConfirm = async (orderId) => {
        await recover(orderId);
        setModalOpen(false);
        setSelectedRecord(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Enrollment Recovery"
                subtitle="Students with successful payments not yet enrolled"
                icon={AlertTriangle}
                onRefresh={refetch}
                loading={loading}
            />

            <EnrollmentRecoveryTable
                records={missingEnrollments}
                loading={loading}
                onRecover={handleRecover}
            />

            <EnrollmentRecoveryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirm}
                record={selectedRecord}
                recovering={recovering}
            />
        </div>
    );
};

export default EnrollmentRecoveryPage;