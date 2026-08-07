import { ChevronRight, ArrowLeft } from "lucide-react"

export const DashboardHeader = ({
                             title,
                             subtitle,
                             icon: Icon,
                             onRefresh,
                             onAdd,
                             loading = false,
                             addLabel = "Add",
                             onBack,
                             breadcrumbs = [],
                         }) => {

    const btnBase = "px-6 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 " +
                            "disabled:cursor-not-allowed " +
                            "cursor-pointer flex items-center justify-center";

    const refreshBtn =
        btnBase + " bg-gray-500 text-white hover:bg-gray-600";

    const addBtn =
        btnBase + " bg-gradient-to-r from-slate-600 to-blue-600 text-white " +
        "hover:from-slate-700 hover:to-blue-700";

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">

            {breadcrumbs.length > 0 && (
                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        return (
                            <span key={index} className="flex items-center space-x-1">
                                {index > 0 && (
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                                )}
                                {!isLast && crumb.href ? (
                                    <a
                                        href={crumb.href}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {crumb.label}
                                    </a>
                                ) : (
                                    <span className={isLast ? "text-gray-800 font-medium" : ""}>
                                        {crumb.label}
                                    </span>
                                )}
                            </span>
                        );
                    })}
                </div>
            )}

            <div className="flex items-center justify-between">

                <div className="flex items-center space-x-3">

                    {onBack && (
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                            title="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}

                    <div className="bg-gradient-to-r from-slate-600 to-blue-600 p-3 rounded-lg">
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                        {subtitle && <p className="text-gray-600">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-center space-x-3">

                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className={refreshBtn}
                        >
                            {loading ? "Loading..." : "Refresh"}
                        </button>
                    )}

                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className={addBtn}
                        >
                            {addLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};