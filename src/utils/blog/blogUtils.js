export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

export const formatDateLong = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getImageUrl = (url) => {
    if (!url || url === 'string') return null;

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

export const formatReadTime = (content) => {
    if (!content) return '5 min read';
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return `${Math.ceil(wordCount / 200)} min read`;
};

export const parseTags = (tagsString) => {
    if (!tagsString || tagsString === 'string') return [];
    return tagsString.split(',').map(t => t.trim()).filter(t => t.length > 0);
};