export const getImageUrl = (url) => {
    if (!url || url === 'string' || !url.trim()) return null;

    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
        return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w800`;
    }

    const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
        return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
    }

    return url;
};

export const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
};

export const truncate = (text, max = 60) => {
    if (!text) return 'Untitled Course';
    return text.length > max ? text.slice(0, max).trim() + '…' : text;
};
