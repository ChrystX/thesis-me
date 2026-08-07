import Alert from "../global/Alert.jsx";
import { TextInput } from "../global/AuthInputs.jsx";
import { useResetPasswordForm } from "./hooks/useResetPasswordForm.js";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
    const { token, formData, status, updateField, handleSubmit } = useResetPasswordForm();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">

            {/* Logo */}
            <Link to="/" className="mb-8">
                <img src="/deWave-logo.svg" alt="deWave" className="h-7" />
            </Link>

            {/* Card */}
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10">

                {/* Title */}
                <div className="mb-7">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                        {token ? "Set new password" : "Reset your password"}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {token
                            ? "Choose a strong password for your account."
                            : "We'll send you a link to reset your password."}
                    </p>
                </div>

                <Alert type="error" message={status.error} />
                <Alert type="success" message={status.success} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!token && (
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={updateField}
                            disabled={status.loading}
                        />
                    )}

                    {token && (
                        <>
                            <TextInput
                                label="New Password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={updateField}
                                disabled={status.loading}
                            />
                            <TextInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={updateField}
                                disabled={status.loading}
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full mt-2 py-2.5 rounded-xl bg-[#e91e63] text-white text-sm font-medium tracking-wide hover:bg-[#c2185b] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {status.loading
                            ? "Please wait…"
                            : token
                                ? "Set password"
                                : "Send reset link"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-300">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Back to login */}
                <p className="text-center text-sm text-gray-400">
                    Remember your password?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-[#e91e63] font-medium hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </div>

            <p className="mt-6 text-xs text-gray-300">
                © {new Date().getFullYear()} deWave. All rights reserved.
            </p>
        </div>
    );
};

export default ResetPasswordForm;