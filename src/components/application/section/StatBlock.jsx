export default function StatBlock({ value, label }) {
    return (
        <div className="text-center lg:text-left">
            <div className="border-b-2 border-pink-600 pb-3 mb-3">
                <div className="text-2xl lg:text-3xl font-light text-pink-600 mb-1">{value}</div>
                <div className="text-gray-600 font-light text-sm">{label}</div>
            </div>
        </div>
    );
}