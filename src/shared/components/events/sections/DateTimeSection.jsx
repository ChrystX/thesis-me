import { Section, Field } from "../ui/FormPrimitives.jsx";

export function DateTimeSection({ startTime, endTime, onStartChange, onEndChange }) {
    return (
        <Section label="Date & time">
            <div className="grid grid-cols-2 gap-3">
                <Field label="Start">
                    <input
                        type="datetime-local"
                        required
                        value={startTime}
                        onChange={(e) => onStartChange(e.target.value)}
                    />
                </Field>
                <Field label="End">
                    <input
                        type="datetime-local"
                        required
                        value={endTime}
                        onChange={(e) => onEndChange(e.target.value)}
                    />
                </Field>
            </div>
        </Section>
    );
}