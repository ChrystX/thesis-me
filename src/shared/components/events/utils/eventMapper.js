export function toEventDto(formState, existingEvent = null) {
    const {
        title,
        description,
        startTime,
        endTime,
        eventType,
        visibility,
        meetingUrl,
        location,
        trackAttendance,
        requiresRegistration,
        capacity,
        color,
        courseIds,
        thumbnailUrl,
        previewVideoUrl,
        isActive,
    } = formState;

    return {
        title,
        description: description || null,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        eventType,
        visibility,
        courseIds: formState.courseIds ?? [],
        meetingUrl: eventType === "online" ? meetingUrl || null : null,
        location: eventType === "offline" ? location || null : null,
        trackAttendance,
        requiresRegistration,
        capacity: requiresRegistration && capacity ? parseInt(capacity) : null,
        color,
        thumbnailUrl: formState.thumbnailUrl || null,
        previewVideoUrl: formState.previewVideoUrl || null,
        isActive,
    };
}

/**
 * Converts an ISO date string to the "YYYY-MM-DDTHH:mm" format
 * required by datetime-local inputs.
 */
export function toLocalInput(isoString) {
    const normalized = isoString.endsWith("Z") ? isoString : isoString + "Z";
    const d = new Date(normalized);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}