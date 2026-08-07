export const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube
    const youtubeRegexes = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const regex of youtubeRegexes) {
        const match = url.match(regex);
        if (match) {
            return {
                type: 'youtube',
                embedUrl: `https://www.youtube.com/embed/${match[1]}`
            };
        }
    }

    // Google Drive
    const driveRegexes = [
        /\/file\/d\/([^/]+)/,
        /id=([^&]+)/,
        /\/open\?id=([^&]+)/
    ];

    for (const regex of driveRegexes) {
        const match = url.match(regex);
        if (match) {
            return {
                type: 'drive',
                embedUrl: `https://drive.google.com/file/d/${match[1]}/preview`
            };
        }
    }

    return { type: 'external', embedUrl: url };
};