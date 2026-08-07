import {useEffect} from "react";

function useBodyScrollLock(lock) {
    useEffect(() => {
        document.body.style.overflow = lock ? 'hidden' : 'unset';
        return () => (document.body.style.overflow = 'unset');
    }, [lock]);
}

export default useBodyScrollLock;