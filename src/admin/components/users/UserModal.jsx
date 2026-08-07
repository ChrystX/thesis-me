import BaseModal from "../BaseModal.jsx";

const UserModal = ({
                       isOpen,
                       onClose,
                       onSubmit,
                       formData,
                       setFormData,
                       mode = "create"
                   }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "create" ? "Add User" : "Edit User"}
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, username: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        value={formData.roleId}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, roleId: Number(e.target.value) }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                    >
                        <option value={2}>Admin</option>
                        <option value={3}>Instructor</option>
                        <option value={1}>Student</option>
                    </select>
                </div>

                {mode === "edit" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={formData.isActive}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, isActive: e.target.value === "true" }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                )}

                {mode === "create" && (
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                        The user will receive an email to set their own password.
                    </p>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        {mode === "create" ? "Create User" : "Update User"}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default UserModal;