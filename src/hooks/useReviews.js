import { useEffect, useState } from 'react';
import axios from 'axios';

export function useReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchReviews() {
            try {
                const { data } = await axios.get('/api/reviews');
                if (isMounted && Array.isArray(data)) {
                    setReviews(data);
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchReviews();
        return () => { isMounted = false; };
    }, []);

    return { reviews, loading, error };
}