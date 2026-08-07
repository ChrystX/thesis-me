import StatBlock from "./StatBlock.jsx";

const STATS = [
    { value: "500+",     label: "Successful graduates" },
    { value: "15 Years", label: "Excellence in education" },
    { value: "98%",      label: "Job placement rate" },
];

export default function SignUpStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            {STATS.map((s) => (
                <StatBlock key={s.value} value={s.value} label={s.label} />
            ))}
        </div>
    );
}