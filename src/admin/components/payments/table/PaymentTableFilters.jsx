import { Search, RotateCcw } from "lucide-react";

const STATUSES = ["", "Success", "Pending", "Failed", "Expired"];

const PaymentTableFilters = ({ filters = {}, onFilterChange, onReset }) => {
    return (
        <div className="flex flex-wrap gap-3 items-end">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search order / student / course..."
                    value={filters.search ?? ""}
                    onChange={e => onFilterChange("search", e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Status */}
            <select
                value={filters.status ?? ""}
                onChange={e => onFilterChange("status", e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {STATUSES.map(s => (
                    <option key={s} value={s}>{s || "All statuses"}</option>
                ))}
            </select>

            {/* Date from */}
            <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 whitespace-nowrap">From</label>
                <input
                    type="date"
                    value={filters.dateFrom ?? ""}
                    onChange={e => onFilterChange("dateFrom", e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Date to */}
            <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 whitespace-nowrap">To</label>
                <input
                    type="date"
                    value={filters.dateTo ?? ""}
                    onChange={e => onFilterChange("dateTo", e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
            </button>
        </div>
    );
};

export default PaymentTableFilters;