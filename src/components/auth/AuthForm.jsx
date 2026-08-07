import { useAuthForm } from './hooks/useAuthForm.js';
import { TextInput } from '../global/AuthInputs.jsx';
import Alert from '../global/Alert.jsx';
import { Link } from 'react-router-dom';

const AuthForm = () => {
    const {
        isLogin,
        formData,
        status,
        updateField,
        toggleMode,
        handleSubmit
    } = useAuthForm();

    const isRegister = !isLogin;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">

            {/* Logo — floats above the card, no bar */}
            <Link to="/" className="mb-8">
                <img src="/deWave-logo.svg" alt="deWave" className="h-7" />
            </Link>

            {/* Card */}
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10">

                {/* Title */}
                <div className="mb-7">
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">
                        {isLogin ? 'Sign in' : 'Create an account'}
                    </h1>
                    <p className="text-sm text-gray-400">
                        {isLogin
                            ? 'Good to have you back.'
                            : 'Start your learning journey today.'}
                    </p>
                </div>

                <Alert type="error" message={status.error} />
                <Alert type="success" message={status.success} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextInput
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={updateField}
                        disabled={status.loading}
                    />

                    {isRegister && (
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

                    <div className="space-y-1">
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            value={formData.password}
                            onChange={updateField}
                            disabled={status.loading}
                        />
                        {isLogin && (
                            <div className="text-right">
                                <a
                                href="/reset-password"
                                className="text-xs text-gray-400 hover:text-[#e91e63] transition-colors"
                                >
                                Forgot password?
                            </a>
                            </div>
                            )}
                    </div>

                    {isRegister && (
                        <TextInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={updateField}
                            disabled={status.loading}
                        />
                    )}

                    <button
                        type="submit"
                        disabled={status.loading}
                        className="w-full mt-2 py-2.5 rounded-xl bg-[#e91e63] text-white text-sm font-medium tracking-wide hover:bg-[#c2185b] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {status.loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Sign up'}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-300">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Toggle */}
                <p className="text-center text-sm text-gray-400">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                        onClick={toggleMode}
                        className="text-[#e91e63] font-medium hover:underline"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>

            <p className="mt-6 text-xs text-gray-300">
                © {new Date().getFullYear()} deWave. All rights reserved.
            </p>
        </div>
    );
};

export default AuthForm;