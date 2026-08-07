export const userStorage = {
    get() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },
    set(user) {
        localStorage.setItem("user", JSON.stringify(user));
    },
    clear() {
        localStorage.removeItem("user");
    }
};