import { useState } from "react";
import {DashboardHeader} from "../../components/DashboardHeader.jsx";
import UserStatsCards from "../../components/users/UserStatCards.jsx";
import UserTable from "../../components/users/table/UserTable.jsx";
import UserModal from "../../components/users/UserModal.jsx";
import {useUsers} from "../../../hooks/useUsers.js";

const UsersPage = () => {
    const {
        users,
        loading,
        createUser,
        updateUser,
        deleteUser,
        toggleActive
    } = useUsers();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create")
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        roleId: 3,
        isActive: true
    });

    const formatDate = (dateString) => {
        if (!dateString) return "-";

        const date = new Date(dateString);

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };


    const handleAdd = () => {
        setModalMode("create");
        setFormData({
            username: "",
            email: "",
            roleId: 3,
            isActive: true
        });
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setModalMode("edit");
        setSelectedUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            isActive: user.isActive
        });
        setIsModalOpen(true);
    };

    const handleRefresh = () => {
        console.log("refresh users");
    };

    const handleSubmit = async () => {
        if (modalMode === "create") {
            await createUser(formData);
        } else {
            await updateUser(selectedUser.id, formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            <DashboardHeader
                title="Users"
                subtitle="Manage system users"
                onRefresh={handleRefresh}
                onAdd={handleAdd}
                loading={loading}
                addLabel="Add User"
            />

            <UserStatsCards users={users} />

            <UserTable
                users={users}
                loading={loading}
                onEdit={openEditModal}
                onDelete={deleteUser}
                onToggleActive={toggleActive}
                formatDate={formatDate}
            />

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                mode={modalMode}
            />
        </div>
    );
};

export default UsersPage;