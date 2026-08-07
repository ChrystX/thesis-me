import { useState, useEffect } from "react";

const StudentProfileForm = ({ profile, onSave, loading }) => {
    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
        emergencyContact: "",
        emergencyPhone: "",
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (profile) {
            setForm({
                fullName:         profile.fullName ?? "",
                phoneNumber:      profile.phoneNumber ?? "",
                dateOfBirth:      profile.dateOfBirth
                    ? profile.dateOfBirth.split("T")[0]
                    : "",
                address:          profile.address ?? "",
                emergencyContact: profile.emergencyContact ?? "",
                emergencyPhone:   profile.emergencyPhone ?? "",
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        try {
            await onSave({
                ...form,
                dateOfBirth: form.dateOfBirth || null,
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    const fields = [
        { name: "fullName",         label: "Full Name",         type: "text",  required: true },
        { name: "phoneNumber",      label: "Phone Number",      type: "tel"  },
        { name: "dateOfBirth",      label: "Date of Birth",     type: "date" },
        { name: "emergencyContact", label: "Emergency Contact", type: "text",  placeholder: "Contact name" },
        { name: "emergencyPhone",   label: "Emergency Phone",   type: "tel"  },
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
                        <label className="font-sans text-xs font-medium text-gray-500 uppercase tracking-wide">
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
                <label className="font-sans text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Address
                </label>
                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Your address..."
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
                />
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={saving}
                    className="font-sans px-6 py-2 text-sm font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700 transition disabled:opacity-50"
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

export default StudentProfileForm;