const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

const SNAP_URL = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

// Load the Midtrans Snap script dynamically
export const loadMidtransSnap = () => {
    return new Promise((resolve, reject) => {
        // Avoid loading the script multiple times
        if (document.getElementById("midtrans-snap")) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.id = "midtrans-snap";
        script.src = SNAP_URL;
        script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load Midtrans Snap script"));
        document.body.appendChild(script);
    });
};

// Open the Snap payment popup
export const openSnapPayment = (token, callbacks = {}) => {
    if (!window.snap) {
        throw new Error("Midtrans Snap is not loaded yet");
    }

    window.snap.pay(token, {
        onSuccess: (result) => {
            console.log("Payment success:", result);
            callbacks.onSuccess?.(result);
        },
        onPending: (result) => {
            console.log("Payment pending:", result);
            callbacks.onPending?.(result);
        },
        onError: (result) => {
            console.error("Payment error:", result);
            callbacks.onError?.(result);
        },
        onClose: () => {
            console.log("Snap popup closed");
            callbacks.onClose?.();
        },
    });
};