import { Section, Field } from "../ui/FormPrimitives.jsx";

export function BasicInfoSection({ title, description, onTitleChange, onDescriptionChange }) {
    return (
        <Section label="Basic info">
            <Field label="Title">
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="e.g. Mid-semester review session"
                />
            </Field>
            <Field label="Description">
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    placeholder="Optional details about this event..."
                    rows={3}
                />
            </Field>
        </Section>
    );
}