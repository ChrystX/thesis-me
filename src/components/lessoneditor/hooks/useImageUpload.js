import { useState } from "react";

// ─── Cloudinary ───────────────────────────────────────────────────────────────
// .env: VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET
async function cloudinaryUpload(file, resourceType= "image") {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", preset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        { method: "POST", body: form }
    );
    if (!res.ok) throw new Error(`Cloudinary ${resourceType} upload failed`);
    const json = await res.json();
    // secure_url is permanent, CDN-backed, supports transformations
    return { url: json.secure_url, public_id: json.public_id };
}

// ─── Imgur ────────────────────────────────────────────────────────────────────
// .env: VITE_IMGUR_CLIENT_ID  (register at https://api.imgur.com/oauth2/addclient)
// Anonymous upload — no user account required. 1250 uploads/day on free client ID.
async function imgurUpload(file) {
    const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID;
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: { Authorization: `Client-ID ${clientId}` },
        body: form,
    });
    if (!res.ok) throw new Error("Imgur upload failed");
    const json = await res.json();
    // link is a direct .jpg/.png/.gif URL — permanent and public
    return { url: json.data.link, public_id: json.data.id };
}

// ─── Google Drive ─────────────────────────────────────────────────────────────
// Converts a GDrive sharing link to a direct image URL.
// The file must be shared as "Anyone with the link can view".
//
// Accepted input formats:
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//
// Output:
//   https://drive.google.com/uc?export=view&id=FILE_ID
//   (This is the direct-render URL Google provides for publicly shared images)
//
// Limitation: large files show a virus-scan warning page instead of the image.
// For production, prefer Cloudinary or Imgur. GDrive is best for quick sharing.
function resolveGDriveUrl(rawUrl) {
    try {
        const u = new URL(rawUrl.trim());
        if (!u.hostname.includes("drive.google.com")) return null;

        let fileId = null;

        // Format: /file/d/FILE_ID/view
        const match = u.pathname.match(/\/file\/d\/([^/]+)/);
        if (match) fileId = match[1];

        // Format: ?id=FILE_ID
        if (!fileId) fileId = u.searchParams.get("id");

        if (!fileId) return null;
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch {
        return null;
    }
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useImageUpload() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    async function run(fn) {
        setError(null);
        setUploading(true);
        try {
            return await fn();
        } catch (err) {
            setError(err.message ?? "Upload failed");
            console.error(err);
            return null;
        } finally {
            setUploading(false);
        }
    }

    return {
        uploading,
        error,
        clearError: () => setError(null),
        uploadToCloudinary: (file) => run(() => cloudinaryUpload(file, "image")),
        uploadVideoToCloudinary: (file) => run(() => cloudinaryUpload(file, "video")),
        uploadToImgur: (file) => run(() => imgurUpload(file)),
        resolveGDriveUrl,  // sync — no async needed
    };
}