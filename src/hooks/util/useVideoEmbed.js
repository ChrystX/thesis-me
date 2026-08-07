import { useMemo } from "react";

/**
 * Resolves a video URL from any supported platform into an embeddable URL.
 *
 * Supported platforms:
 *   YouTube, Vimeo, Google Drive, Dailymotion, Twitch (live + VOD + clips),
 *   Loom, Streamable, Wistia, Facebook, TED, Bilibili, Odysee, Rumble,
 *   Vidyard, Cloudflare Stream + direct video files (mp4, webm, ogg, mov, m4v)
 *
 * @param {string} url - Raw URL pasted by the user
 * @returns {{ embedUrl: string, platform: string, type: 'iframe' | 'video' } | null}
 */
function resolveEmbed(url) {
    if (!url?.trim()) return null;

    // ── Direct video file ──────────────────────────────────────────────────────
    if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)) {
        return { embedUrl: url, platform: "Video File", type: "video" };
    }

    let u;
    try { u = new URL(url); } catch { return null; }

    const host = u.hostname.replace(/^www\./, "");

    // ── YouTube ────────────────────────────────────────────────────────────────
    if (host.includes("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v) return embed(`https://www.youtube.com/embed/${v}`, "YouTube");

        const shorts = u.pathname.match(/^\/shorts\/([^/?#]+)/);
        if (shorts) return embed(`https://www.youtube.com/embed/${shorts[1]}`, "YouTube");

        const live = u.pathname.match(/^\/live\/([^/?#]+)/);
        if (live) return embed(`https://www.youtube.com/embed/${live[1]}`, "YouTube");

        if (u.pathname.startsWith("/embed/")) return embed(url, "YouTube");
    }
    if (host === "youtu.be") {
        const v = u.pathname.slice(1).split("?")[0];
        if (v) return embed(`https://www.youtube.com/embed/${v}`, "YouTube");
    }

    // ── Vimeo ──────────────────────────────────────────────────────────────────
    if (host === "vimeo.com") {
        // Standard: vimeo.com/123456789
        // Unlisted: vimeo.com/123456789/hashtoken
        const match = u.pathname.match(/^\/(\d+)(\/([a-f0-9]+))?/);
        if (match) {
            const hash = match[3] ? `?h=${match[3]}` : "";
            return embed(`https://player.vimeo.com/video/${match[1]}${hash}`, "Vimeo");
        }
    }
    if (host === "player.vimeo.com") return embed(url, "Vimeo");

    // ── Google Drive ───────────────────────────────────────────────────────────
    if (host === "drive.google.com") {
        const fileId = u.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
            ?? u.searchParams.get("id");
        if (fileId) return embed(`https://drive.google.com/file/d/${fileId}/preview`, "Google Drive");
    }

    // ── Dailymotion ────────────────────────────────────────────────────────────
    if (host === "dailymotion.com") {
        const match = u.pathname.match(/\/video\/([^_/?#]+)/);
        if (match) return embed(`https://www.dailymotion.com/embed/video/${match[1]}`, "Dailymotion");
    }
    if (host === "dai.ly") {
        const match = u.pathname.match(/^\/([^/?#]+)/);
        if (match) return embed(`https://www.dailymotion.com/embed/video/${match[1]}`, "Dailymotion");
    }

    // ── Twitch ─────────────────────────────────────────────────────────────────
    if (host === "twitch.tv" || host === "clips.twitch.tv") {
        const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";

        const vod = u.pathname.match(/^\/videos\/(\d+)/);
        if (vod) return embed(`https://player.twitch.tv/?video=${vod[1]}&parent=${parent}`, "Twitch");

        // /channel/clip/SLUG or clips.twitch.tv/SLUG
        const clip = u.pathname.match(/\/clip\/([^/?#]+)/) ?? (host === "clips.twitch.tv" && u.pathname.match(/^\/([^/?#]+)/));
        if (clip) return embed(`https://clips.twitch.tv/embed?clip=${clip[1]}&parent=${parent}`, "Twitch");

        const channel = u.pathname.match(/^\/([^/?#]+)$/);
        if (channel) return embed(`https://player.twitch.tv/?channel=${channel[1]}&parent=${parent}`, "Twitch");
    }

    // ── Loom ───────────────────────────────────────────────────────────────────
    if (host === "loom.com") {
        const match = u.pathname.match(/\/share\/([a-f0-9]+)/);
        if (match) return embed(`https://www.loom.com/embed/${match[1]}`, "Loom");
    }

    // ── Streamable ─────────────────────────────────────────────────────────────
    if (host === "streamable.com") {
        const match = u.pathname.match(/^\/([^/?#]+)$/);
        if (match && !match[1].startsWith("e/")) {
            return embed(`https://streamable.com/e/${match[1]}`, "Streamable");
        }
        if (u.pathname.startsWith("/e/")) return embed(url, "Streamable");
    }

    // ── Wistia ─────────────────────────────────────────────────────────────────
    if (host.includes("wistia.com") || host.includes("wi.st")) {
        const match = u.pathname.match(/\/medias\/([^/?#]+)/);
        if (match) return embed(`https://fast.wistia.net/embed/iframe/${match[1]}`, "Wistia");
    }

    // ── Facebook ───────────────────────────────────────────────────────────────
    if (host === "facebook.com" || host === "fb.watch") {
        return embed(
            `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
            "Facebook"
        );
    }

    // ── TED ────────────────────────────────────────────────────────────────────
    if (host === "ted.com") {
        const match = u.pathname.match(/\/talks\/([^/?#]+)/);
        if (match) return embed(`https://embed.ted.com/talks/${match[1]}`, "TED");
    }

    // ── Bilibili ───────────────────────────────────────────────────────────────
    if (host === "bilibili.com") {
        const bv = u.pathname.match(/\/video\/(BV[^/?#]+)/i);
        if (bv) return embed(`https://player.bilibili.com/player.html?bvid=${bv[1]}`, "Bilibili");

        const av = u.pathname.match(/\/video\/av(\d+)/i);
        if (av) return embed(`https://player.bilibili.com/player.html?aid=${av[1]}`, "Bilibili");
    }

    // ── Odysee ─────────────────────────────────────────────────────────────────
    if (host === "odysee.com") {
        const embedPath = u.pathname.replace(/^\/$/, "");
        if (embedPath && !u.pathname.startsWith("/$/")) {
            return embed(`https://odysee.com/$/embed${embedPath}`, "Odysee");
        }
        if (u.pathname.startsWith("/$/embed")) return embed(url, "Odysee");
    }

    // ── Rumble ─────────────────────────────────────────────────────────────────
    if (host === "rumble.com") {
        if (u.pathname.startsWith("/embed/")) return embed(url, "Rumble");
        // e.g. rumble.com/v2abc12-some-title.html → slug is everything before the first dash
        const match = u.pathname.match(/\/([^/?#]+?)(?:-[^/?#]*)?\.html/);
        if (match) return embed(`https://rumble.com/embed/${match[1]}/`, "Rumble");
    }

    // ── Vidyard ────────────────────────────────────────────────────────────────
    if (host === "vidyard.com" || host.endsWith(".vidyard.com")) {
        const match = u.pathname.match(/\/watch\/([^/?#]+)/);
        if (match) return embed(`https://play.vidyard.com/${match[1]}`, "Vidyard");
    }

    // ── Cloudflare Stream ──────────────────────────────────────────────────────
    if (host === "cloudflarestream.com" || host.endsWith(".cloudflarestream.com")) {
        if (u.pathname.startsWith("/iframe/")) return embed(url, "Cloudflare Stream");
        const match = u.pathname.match(/\/([a-f0-9]+)/);
        if (match) return embed(`https://iframe.cloudflarestream.com/${match[1]}`, "Cloudflare Stream");
    }
    if (host === "iframe.videodelivery.net") return embed(url, "Cloudflare Stream");

    return null;
}

function embed(embedUrl, platform) {
    return { embedUrl, platform, type: "iframe" };
}

/**
 * Resolves a raw video URL into an embeddable form.
 * Returns null when the URL is empty, invalid, or from an unsupported platform.
 *
 * @param {string} url
 * @returns {{ embedUrl: string, platform: string, type: 'iframe' | 'video' } | null}
 */
export function useVideoEmbed(url) {
    return useMemo(() => resolveEmbed(url), [url]);
}