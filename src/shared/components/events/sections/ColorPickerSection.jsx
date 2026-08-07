import { Section } from "../ui/FormPrimitives.jsx";
import { EVENT_COLORS } from "../constants/eventColors.js";

export function ColorPickerSection({ color, onChange }) {
    return (
        <Section label="Calendar color">
            <div className="flex gap-2 items-center">
                {EVENT_COLORS.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onChange(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-full transition-all ${
                            color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""
                        }`}
                    />
                ))}
                <input
                    type="color"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-7 h-7 rounded-full border border-gray-200 cursor-pointer p-0"
                />
            </div>
        </Section>
    );
}