import { useEffect, useState } from "react";
import {loadMidtransSnap, openSnapPayment} from "../../services/MidTrans/midtransService.js";

const useMidtrans = () => {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadMidtransSnap()
            .then(() => setIsReady(true))
            .catch((err) => setError(err.message));
    }, []);

    const pay = (token, callbacks) => {
        if (!isReady) {
            console.warn("Midtrans Snap is not ready yet");
            return;
        }
        openSnapPayment(token, callbacks);
    };

    return { pay, isReady, error };
};

export default useMidtrans;