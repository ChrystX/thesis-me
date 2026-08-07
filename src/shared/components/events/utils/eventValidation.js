// events/utils/eventValidation.js
export function validateEventTimes(startTime, endTime) {
    if (!startTime || !endTime) return "Start and end times are required.";
    if (new Date(endTime) <= new Date(startTime)) {
        return "End time must be after start time.";
    }
    return null;
}