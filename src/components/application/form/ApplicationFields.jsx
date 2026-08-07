import { User, Phone, MapPin, Mail, GraduationCap, FileText } from "lucide-react";
import InputField from "./fields/InputField.jsx";
import TextareaField from "./fields/TextareaField.jsx";
import SelectField from "./fields/SelectField.jsx";
import FileUploadField from "./fields/FileUploadField.jsx";

const COURSES = ['Lashes', 'Make Up', 'Massage', 'Nail Art', 'Hairdressing'];

export default function ApplicationFields({ formData, onInputChange, onFileChange }) {
    return (
        <div className="space-y-6">
            <InputField    label="Full Name"       Icon={User}          name="name"    value={formData.name}    onChange={onInputChange} placeholder="Enter your full name" />
            <InputField    label="Phone Number"    Icon={Phone}         name="phone"   value={formData.phone}   onChange={onInputChange} placeholder="Enter your phone number" />
            <InputField    label="Email Address"   Icon={Mail}          name="email"   value={formData.email}   onChange={onInputChange} placeholder="Enter your email address" type="email" />
            <TextareaField label="Address"         Icon={MapPin}        name="address" value={formData.address} onChange={onInputChange} placeholder="Enter your full address" rows={3} />
            <SelectField   label="Desired Course"  Icon={GraduationCap} name="course"  value={formData.course}  onChange={onInputChange} options={COURSES} />
            <FileUploadField label="CV/Resume Upload" Icon={FileText} file={formData.cv} onChange={onFileChange} />
        </div>
    );
}