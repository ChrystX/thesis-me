import { Section, Field, ToggleGroup } from "../ui/FormPrimitives.jsx";

const EVENT_TYPE_OPTIONS = [
    { label: "Online", value: "online" },
    { label: "In-person", value: "offline" },
];

export function EventTypeSection({ eventType, meetingUrl, location, onTypeChange, onMeetingUrlChange, onLocationChange }) {
    return (
        <Section label="Event type">
            <ToggleGroup
                options={EVENT_TYPE_OPTIONS}
                value={eventType}
                onChange={onTypeChange}
            />
            {eventType === "online" && (
                <Field label="Meeting URL">
                    <input
                        type="url"
                        value={meetingUrl}
                        onChange={(e) => onMeetingUrlChange(e.target.value)}
                        placeholder="https://meet.google.com/..."
                    />
                </Field>
            )}
            {eventType === "offline" && (
                <Field label="Location">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="e.g. Room 301, Building A"
                    />
                </Field>
            )}
        </Section>
    );
}