import SignUpStats from "./section/SignUpStats.jsx";
import SignUpForm from "./form/SignUpForm.jsx";

export default function SignUpSection() {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <SignUpStats />
                    </div>
                    <div className="order-1 lg:order-2">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );
}