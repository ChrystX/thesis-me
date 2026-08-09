import { useState } from "react";
import { EVENT_COLORS } from "../constants/eventColors.js";
import { validateEventTimes } from "../utils/eventValidation.js";
import { toEventDto, toLocalInput } from "../utils/eventMapper.js";
import {useEvents} from "../../../../context/EventsContext.jsx";

export function useEventForm(event, onSuccess) {
    const isEditing = !!event;
    const { createEvent, updateEvent } = useEvents();

    const [title, setTitle] = useState(event?.title ?? "");
    const [description, setDescription] = useState(event?.description ?? "");
    const [startTime, setStartTime] = useState(event?.startTime ? toLocalInput(event.startTime) : "");
    const [endTime, setEndTime] = useState(event?.endTime ? toLocalInput(event.endTime) : "");
    const [eventType, setEventType] = useState(event?.eventType ?? "online");
    const [visibility, setVisibility] = useState(event?.visibility ?? "course");
    const [meetingUrl, setMeetingUrl] = useState(event?.meetingUrl ?? "");
    const [location, setLocation] = useState(event?.location ?? "");
    const [trackAttendance, setTrackAttendance] = useState(event?.trackAttendance ?? true);
    const [requiresRegistration, setRequiresRegistration] = useState(event?.requiresRegistration ?? false);
    const [capacity, setCapacity] = useState(event?.capacity ?? "");
    const [color, setColor] = useState(event?.color ?? EVENT_COLORS[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courseIds, setCourseIds] = useState(event?.courseIds ?? []);
    const [thumbnailUrl, setThumbnailUrl] = useState(event?.thumbnailUrl ?? "");
    const [previewVideoUrl, setPreviewVideoUrl] = useState(event?.previewVideoUrl ?? "");
    const [isActive, setIsActive] = useState(event?.isActive ?? true);


    const formState = {
        title, description, startTime, endTime,
        eventType, visibility, meetingUrl, location,
        trackAttendance, requiresRegistration, capacity, color, courseIds,
        thumbnailUrl, previewVideoUrl, isActive
    };

    const setters = {
        setTitle, setDescription, setStartTime, setEndTime,
        setEventType, setVisibility, setMeetingUrl, setLocation,
        setTrackAttendance, setRequiresRegistration, setCapacity, setColor, setCourseIds,
        setThumbnailUrl, setPreviewVideoUrl, setIsActive
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateEventTimes(startTime, endTime);
        if (validationError) {
            setError(validationError);
            return;
        }

        const dto = toEventDto(formState, event);

        try {
            setLoading(true);
            if (isEditing) {
                await updateEvent(event.id, dto);
            } else {
                await createEvent(dto);
            }
            onSuccess?.();
        } catch {
            setError(`Failed to ${isEditing ? "update" : "create"} event. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return { formState, setters, handleSubmit, loading, error, isEditing };
}