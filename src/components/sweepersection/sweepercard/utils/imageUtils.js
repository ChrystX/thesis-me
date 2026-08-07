export const getImageUrl = (url) => {
    if (!url || url === "string" || !url.trim()) return null;

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
