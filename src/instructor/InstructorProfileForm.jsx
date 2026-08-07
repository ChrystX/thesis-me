import { useState, useEffect } from "react";

const InstructorProfileForm = ({ instructor, onSave, loading }) => {
    const [form, setForm] = useState({
        Name: "",
        Headline: "",
        Bio: "",
        Specialization: "",
        ContactEmail: "",
        PhoneNumber: "",
        Certifications: "",
        ImageUrl: "",
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (instructor) {
            setForm({
                Name: instructor.name ?? "",
                Headline: instructor.headline ?? "",
                Bio: instructor.bio ?? "",
                Specialization: instructor.specialization ?? "",
                ContactEmail: instructor.contactEmail ?? "",
                PhoneNumber: instructor.phoneNumber ?? "",
                Certifications: instructor.certifications ?? "",
                ImageUrl: instructor.imageUrl ?? "",
            });
        }
    }, [instructor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        try {
            await onSave(form);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const fields = [
        { name: "Name", label: "Full Name", type: "text", required: true },
        { name: "Headline", label: "Headline", type: "text", placeholder: "e.g. Senior Web Developer & Educator" },
        { name: "Specialization", label: "Specialization", type: "text", placeholder: "e.g. React, Node.js" },
        { name: "ContactEmail", label: "Contact Email", type: "email" },
        { name: "PhoneNumber", label: "Phone Number", type: "tel" },
        { name: "ImageUrl", label: "Profile Image URL", type: "url" },
    ];

    if (loading) {
        return (
            <div className="animate-pulse space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(({ name, label, type, placeholder, required }) => (
                    <div key={name} className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {label} {required && <span className="text-pink-500">*</span>}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={placeholder ?? ""}
                            required={required}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                        />
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bio</label>
                <textarea
                    name="Bio"
                    value={form.Bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell students about yourself..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Certifications</label>
                <textarea
                    name="Certifications"
                    value={form.Certifications}
                    onChange={handleChange}
                    rows={2}
                    placeholder="e.g. AWS Certified, Google UX Design..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 text-sm font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700 transition disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Profile"}
                </button>
                {success && (
                    <span className="text-sm text-green-600 font-medium">Profile updated!</span>
                )}
            </div>
        </form>
    );
};

export default InstructorProfileForm;