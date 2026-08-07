import { useEffect, useState } from "react";
import {userStorage} from "../../../utils/userStorage.js";

export default function AdminUserInfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userStorage.get());
    }, []);

    return (
        <div className="px-6 py-4 border-b bg-gray-50">
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
    );
}