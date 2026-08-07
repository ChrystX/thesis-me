import { useEffect, useState } from "react";
import { X, Users, UserCheck, UserX, BarChart2, CheckSquare, Square, Save, Loader2 } from "lucide-react";
import BaseModal from "../BaseModal.jsx";
import {useEventAttendance} from "../../../hooks/events/useEventAttendance.js";
import {useEventRegistration} from "../../../hooks/events/useEventRegistration.js";

const formatDate = (dt) =>
    dt
        ? new Intl.DateTimeFormat("id-ID", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        }).format(new Date(dt))
        : "—";

const StatusBadge = ({ attended }) =>
    attended ? (
        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
            <UserCheck className="w-3 h-3" /> Present
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
            <UserX className="w-3 h-3" /> Absent
        </span>
    );

const AttendanceModal = ({ isOpen, onClose, event }) => {
    const { report, stats, bulkMarkAttendance } = useEventAttendance(isOpen ? event?.id : null);
    const { registrations } = useEventRegistration(isOpen ? event?.id : null);

    // local attendance state: { [studentId]: bool }
    const [localAttendance, setLocalAttendance] = useState({});
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    // seed local state when report loads
    useEffect(() => {
        if (report?.students) {
            const initial = {};
            report.students.forEach((s) => {
                initial[s.studentId] = s.attended;
            });
            setLocalAttendance(initial);
            setDirty(false);
        }
    }, [report]);

    // If event has no attendance report yet, fall back to registrations list
    const studentList = report?.students?.length
        ? report.students
        : registrations.map((r) => ({
            studentId: r.studentId,
            studentName: r.studentName,
            studentDisplayId: r.studentDisplayId,
            attended: localAttendance[r.studentId] ?? false,
            joinedAt: null,
            isRegistered: true,
            status: "absent",
        }));

    const toggle = (studentId) => {
        setLocalAttendance((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
        setDirty(true);
    };

    const selectAll = () => {
        const all = {};
        studentList.forEach((s) => { all[s.studentId] = true; });
        setLocalAttendance(all);
        setDirty(true);
    };

    const clearAll = () => {
        const all = {};
        studentList.forEach((s) => { all[s.studentId] = false; });
        setLocalAttendance(all);
        setDirty(true);
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const attendances = studentList.map((s) => ({
                studentId: s.studentId,
                attended: localAttendance[s.studentId] ?? s.attended,
            }));
            await bulkMarkAttendance({ eventId: event.id, attendances });
            setDirty(false);
        } catch (err) {
            console.error("Failed to save attendance", err);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen || !event) return null;

    const presentCount = Object.values(localAttendance).filter(Boolean).length;
    const totalCount = studentList.length;
    const rate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={event.title}
            maxWidth="max-w-3xl"
            className="max-h-[90vh] flex flex-col overflow-hidden"
            noPadding
        >
                {/* Stats bar */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">{totalCount}</span> registered
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-green-700">{presentCount}</span> present
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserX className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-red-600">{totalCount - presentCount}</span> absent
                        </span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <BarChart2 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-blue-700">{rate}% attendance rate</span>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Select:</span>
                    <button
                        onClick={selectAll}
                        className="flex items-center gap-1 text-xs text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                        <CheckSquare className="w-3.5 h-3.5" /> All Present
                    </button>
                    <button
                        onClick={clearAll}
                        className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                        <Square className="w-3.5 h-3.5" /> All Absent
                    </button>
                </div>

                {/* Student list */}
                <div className="flex-1 overflow-y-auto">
                    {studentList.length === 0 ? (
                        <div className="p-12 text-center">
                            <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400">No students registered for this event.</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in Time</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Override</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                            {studentList.map((student) => {
                                const isPresent = localAttendance[student.studentId] ?? student.attended;
                                return (
                                    <tr
                                        key={student.studentId}
                                        className={`transition-colors ${isPresent ? "bg-green-50/40" : "hover:bg-gray-50"}`}
                                    >
                                        <td className="px-6 py-3.5">
                                            <p className="text-sm font-medium text-gray-900">{student.studentName}</p>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-xs font-mono text-gray-500">{student.studentDisplayId}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className="text-xs text-gray-500">{formatDate(student.joinedAt)}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <StatusBadge attended={isPresent} />
                                        </td>
                                        <td className="px-6 py-3.5 text-center">
                                            <button
                                                onClick={() => toggle(student.studentId)}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                                                    isPresent ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                                aria-label={isPresent ? "Mark absent" : "Mark present"}
                                            >
                                                    <span
                                                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                                                            isPresent ? "translate-x-4" : "translate-x-1"
                                                        }`}
                                                    />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                    <p className="text-xs text-gray-400">
                        {dirty ? "⚠ You have unsaved changes." : "All changes saved."}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !dirty}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-slate-700 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Attendance
                        </button>
                    </div>
                </div>
        </BaseModal>
    );
};

export default AttendanceModal;