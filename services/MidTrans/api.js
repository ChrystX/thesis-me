const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTransaction = async (payload) => {
    const response = await fetch(`${BASE_URL}/create-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create transaction");
    }

    return response.json(); // expects { token: "..." }
};