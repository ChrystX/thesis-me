import { useEventForm } from "./hooks/useEventForm.js";
import { BasicInfoSection } from "./sections/BasicInfoSection.jsx";
import { DateTimeSection } from "./sections/DateTimeSection.jsx";
import { EventTypeSection } from "./sections/EventTypeSection.jsx";
import { VisibilitySection } from "./sections/VisibilitySection.jsx";
import { OptionsSection } from "./sections/OptionsSection.jsx";
import { ColorPickerSection } from "./sections/ColorPickerSection.jsx";
import { Divider } from "./ui/FormPrimitives.jsx";
import {ThumbnailSection} from "./sections/ThumbnailSection.jsx";

export function EventForm({ event, onSuccess, onCancel }) {
    const { formState, setters, handleSubmit, loading, error, isEditing } = useEventForm(event, onSuccess);

    const {
        title, description, startTime, endTime,
        eventType, visibility, meetingUrl, location,
        trackAttendance, requiresRegistration, capacity, color, courseIds,
        thumbnailUrl, previewVideoUrl, isActive
    } = formState;

    const {
        setTitle, setDescription, setStartTime, setEndTime,
        setEventType, setVisibility, setMeetingUrl, setLocation,
        setTrackAttendance, setRequiresRegistration, setCapacity, setColor,
        setCourseIds, setThumbnailUrl, setPreviewVideoUrl, setIsActive
    } = setters;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInfoSection
                title={title}
                description={description}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
            />

            <Divider />

            <DateTimeSection
                startTime={startTime}
                endTime={endTime}
                onStartChange={setStartTime}
                onEndChange={setEndTime}
            />

            <Divider />

            <EventTypeSection
                eventType={eventType}
                meetingUrl={meetingUrl}
                location={location}
                onTypeChange={setEventType}
                onMeetingUrlChange={setMeetingUrl}
                onLocationChange={setLocation}
            />

            <Divider />

            <VisibilitySection
                visibility={visibility}
                courseIds={courseIds}
                onChange={setVisibility}
                onCourseIdsChange={setCourseIds}
            />

            <Divider />

            <OptionsSection
                isActive={isActive}
                onIsActiveChange={setIsActive}
                trackAttendance={trackAttendance}
                requiresRegistration={requiresRegistration}
                capacity={capacity}
                onTrackAttendanceChange={setTrackAttendance}
                onRequiresRegistrationChange={setRequiresRegistration}
                onCapacityChange={setCapacity}
            />

            <Divider />

            <ColorPickerSection
                color={color}
                onChange={setColor}
            />

            <Divider />

            <ThumbnailSection
                thumbnailUrl={thumbnailUrl}
                onThumbnailUrlChange={setThumbnailUrl}
                previewVideoUrl={previewVideoUrl}
                onPreviewVideoUrlChange={setPreviewVideoUrl}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all"
                >
                    {loading
                        ? (isEditing ? "Saving..." : "Creating...")
                        : (isEditing ? "Save changes" : "Create event")}
                </button>
            </div>
        </form>
    );
}