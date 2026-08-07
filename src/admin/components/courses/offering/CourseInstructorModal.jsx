import { useState } from "react";
import { Search, Plus } from "lucide-react";
import BaseModal from "../../BaseModal.jsx";
import {useInstructors} from "../../../../hooks/useInstructors.js";


const CourseInstructorModal = ({
                                   isOpen,
                                   onClose,
                                   assignedInstructors,
                                   onAssign,
                                   onUnassign,
                                   saving,
                               }) => {
    const { instructors: allInstructors, loading } = useInstructors();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const available = allInstructors.filter(i =>
        !assignedInstructors.some(a => a.instructorId === i.id) &&
        (searchTerm === "" || i.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Manage Instructors"
        >
            <div className="space-y-5">

                {/* Assigned */}
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                        Assigned ({assignedInstructors.length})
                    </p>
                    {assignedInstructors.length === 0 ? (
                        <p className="text-sm text-gray-400 py-4 text-center border rounded-lg">
                            No instructors assigned yet
                        </p>
                    ) : (
                        <div
                            className="space-y-2 overflow-y-auto pr-1"
                            style={{ maxHeight: "13rem" }} /* ~3 rows at ~64px each */
                        >
                            {assignedInstructors.map(i => (
                                <div
                                    key={i.instructorId}
                                    className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-medium">
                                            {i.name?.charAt(0) ?? "?"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{i.name}</p>
                                            {i.instructorType && (
                                                <p className="text-xs text-gray-400">{i.instructorType}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onUnassign(i.instructorId)}
                                        disabled={saving}
                                        className="text-red-600 hover:text-red-800 text-xs px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 disabled:opacity-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search + Add */}
                <div className="border-t pt-4 space-y-3">
                    <p className="text-sm font-medium text-gray-500">Add Instructor</p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative col-span-2">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search instructors..."
                                className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Sort Order</label>
                            <input
                                type="number"
                                value={sortOrder}
                                onChange={e => setSortOrder(Number(e.target.value))}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                min={0}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-sm text-gray-400 text-center py-2">Loading...</p>
                    ) : available.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-2">
                            {searchTerm ? "No instructors found" : "All instructors already assigned"}
                        </p>
                    ) : (
                        <div
                            className="space-y-2 overflow-y-auto pr-1"
                            style={{ maxHeight: "13rem" }} /* ~3 rows at ~64px each */
                        >
                            {available.map(i => (
                                <button
                                    key={i.id}
                                    onClick={() => onAssign(i.id, sortOrder)}
                                    disabled={saving}
                                    className="w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 text-left disabled:opacity-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
                                            {i.name?.charAt(0) ?? "?"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{i.name}</p>
                                            {i.contactEmail && (
                                                <p className="text-xs text-gray-400">{i.contactEmail}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Plus className="w-4 h-4 text-blue-600" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default CourseInstructorModal;