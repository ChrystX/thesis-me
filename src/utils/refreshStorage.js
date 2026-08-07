export const refreshStorage = {
    getRefresh() {
        return localStorage.getItem("refreshToken");
    },
    setRefresh(token) {
        localStorage.setItem("refreshToken", token);
    },
    clearRefresh() {
        localStorage.removeItem("refreshToken");
    }
};