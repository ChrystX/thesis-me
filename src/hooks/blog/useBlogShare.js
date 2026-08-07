import { useState } from 'react';
import {buildShareData, fallbackCopy} from "../../utils/blog/blogShareUtils.js";

export const useBlogShare = (blog, blogDetail) => {
    const [shareSuccess, setShareSuccess] = useState(false);

    const triggerSuccess = () => {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
    };

    const handleShare = async () => {
        const shareData = buildShareData(blog, blogDetail);
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (e) {
                if (e.name !== 'AbortError') await fallbackCopy(shareData.url, triggerSuccess);
            }
        } else {
            await fallbackCopy(shareData.url, triggerSuccess);
        }
    };

    return { handleShare, shareSuccess };
};