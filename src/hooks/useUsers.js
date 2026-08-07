import { useEffect, useState, useCallback } from "react";
import { userService } from "../api/userService";

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createUser = async (dto) => {
        const { isActive, ...createDto } = dto;
        console.log("sending:", createDto);
        await userService.createUser(createDto); // was dto, should be createDto
        await fetchUsers();
    };

    const resendSetup = async (id) => {
        await userService.resendSetup(id);
    };

    const updateUser = async (id, dto) => {
        await userService.updateUser(id, dto);
        await fetchUsers();
    };

    const toggleActive = async (id) => {
        await userService.toggleActive(id);
        await fetchUsers();
    };

    const deleteUser = async (id) => {
        await userService.deleteUser(id);
        await fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        toggleActive,
        resendSetup,
        deleteUser
    };
}