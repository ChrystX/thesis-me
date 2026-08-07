import { Section, Field, CheckRow } from "../ui/FormPrimitives.jsx";

export function OptionsSection({
                                   isActive,
                                   onIsActiveChange,
                                   trackAttendance,
                                   requiresRegistration,
                                   capacity,
                                   onTrackAttendanceChange,
                                   onRequiresRegistrationChange,
                                   onCapacityChange,
                               }) {
    return (
        <Section label="Options">
            <CheckRow
                label="Active"
                hint="Event is visible and accessible"
                checked={isActive}
                onChange={onIsActiveChange}
            />
            <CheckRow
                label="Track attendance"
                hint="Students can check in"
                checked={trackAttendance}
                onChange={onTrackAttendanceChange}
            />
            <CheckRow
                label="Require registration"
                hint="Students must register first"
                checked={requiresRegistration}
                onChange={onRequiresRegistrationChange}
            />
            {requiresRegistration && (
                <Field label="Capacity (optional)">
                    <input
                        type="number"
                        min="1"
                        value={capacity}
                        onChange={(e) => onCapacityChange(e.target.value)}
                        placeholder="Leave blank for unlimited"
                    />
                </Field>
            )}
        </Section>
    );
}