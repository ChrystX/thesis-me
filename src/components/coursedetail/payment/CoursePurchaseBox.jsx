import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, CheckCircle2, BookOpen } from "lucide-react";
import { paymentService } from "../../../api/paymentService.js";
import useMidtrans from "../../../hooks/useMidtrans.js";
import { useAuth } from "../../../hooks/useAuth.jsx";

const CoursePurchaseBox = ({ course }) => {
    const { pay, isReady } = useMidtrans();
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [checkingEnrollment, setCheckingEnrollment] = useState(true);

    useEffect(() => {
        if (!course?.id || !isAuthenticated) {
            setCheckingEnrollment(false);
            return;
        }
        paymentService.checkEnrollment(course.id)
            .then(({ isEnrolled }) => setIsEnrolled(isEnrolled))
            .finally(() => setCheckingEnrollment(false));
    }, [course?.id, isAuthenticated]);

    const handlePurchase = async () => {
        if (!isReady || !isAuthenticated) return;
        try {
            setLoading(true);
            const { token, orderId } = await paymentService.createPayment({ courseId: course.id });
            pay(token, {
                onSuccess: async () => {
                    await paymentService.syncPayment(orderId);
                    setIsEnrolled(true);
                },
                onPending: async (result) => {
                    await paymentService.syncPayment(orderId);
                    console.log("Payment pending", result);
                },
                onError: (result) => console.log("Payment error", result),
                onClose: async () => {
                    // user might have paid then closed — sync to check
                    try { await paymentService.syncPayment(orderId); } catch {}
                    // check enrollment in case sync succeeded
                    const { isEnrolled } = await paymentService.checkEnrollment(course.id);
                    setIsEnrolled(isEnrolled);
                },
            });
        } catch (err) {
            const message = err?.response?.data;
            if (typeof message === "string" && message.includes("already purchased")) {
                setIsEnrolled(true);
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    if (checkingEnrollment) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                <div className="h-5 w-2/3 animate-pulse bg-gray-100 rounded-md" />
                <div className="h-8 w-1/3 animate-pulse bg-gray-100 rounded-md" />
                <div className="h-11 w-full animate-pulse bg-gray-100 rounded-xl mt-4" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            {/* Course title */}
            <p className="text-sm font-medium text-gray-400 mb-1">You're viewing</p>
            <h3 className="text-base font-semibold text-gray-900 leading-snug mb-5 line-clamp-2">
                {course.title}
            </h3>

            {isEnrolled ? (
                /* ── Enrolled state ── */
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                        <CheckCircle2 size={16} className="shrink-0" />
                        You own this course
                    </div>
                    <a
                    href={`/courses/${course.id}/learn`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#e91e63] text-white text-sm font-medium hover:bg-[#c2185b] active:scale-[0.98] transition-all duration-150"
                    >
                    <BookOpen size={15} />
                    Go to course
                </a>
                </div>
                ) : isAuthenticated ? (
                /* ── Purchase state ── */
                <div className="space-y-4">
                <div>
                <p className="text-xs text-gray-400 mb-0.5">Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(course.price)}
                    </p>
</div>

    <button
        onClick={handlePurchase}
        disabled={loading || !isReady}
        className="w-full py-2.5 rounded-xl bg-[#e91e63] text-white text-sm font-medium hover:bg-[#c2185b] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
    >
        {loading ? "Processing…" : "Buy Course"}
    </button>

    <p className="text-xs text-center text-gray-300">
        Secure checkout via Midtrans
    </p>
</div>
) : (
        /* ── Guest state ── */
        <div className="space-y-4">
            <div>
                <p className="text-xs text-gray-400 mb-0.5">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    }).format(course.price)}
                </p>
            </div>

            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 flex flex-col items-center gap-3 text-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Lock size={14} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                    Sign in to purchase this course
                </p>
                <Link
                    to="/auth"
                    className="w-full py-2.5 rounded-xl bg-[#e91e63] text-white text-sm font-medium text-center hover:bg-[#c2185b] active:scale-[0.98] transition-all duration-150"
                >
                    Sign in to buy
                </Link>
            </div>
        </div>
    )}
</div>
);
};

export default CoursePurchaseBox;