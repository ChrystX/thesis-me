import { useState } from "react";

const INITIAL = { name: '', phone: '', address: '', email: '', course: '', cv: null };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useApplicationForm() {
    const [formData, setFormData] = useState(INITIAL);
    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formError) setFormError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowed.includes(file.type)) { setFormError('Please upload a PDF, DOC, or DOCX file.'); return; }
            if (file.size > 5 * 1024 * 1024) { setFormError('File size must be less than 5MB.'); return; }
        }
        setFormData(prev => ({ ...prev, cv: file }));
        if (formError) setFormError('');
    };

    const validate = () => {
        if (!formData.name.trim())    { setFormError('Please enter your full name.');      return false; }
        if (!formData.phone.trim())   { setFormError('Please enter your phone number.');   return false; }
        if (!formData.email.trim())   { setFormError('Please enter your email address.');  return false; }
        if (!formData.address.trim()) { setFormError('Please enter your address.');        return false; }
        if (!formData.course)         { setFormError('Please select a course.');           return false; }
        if (!EMAIL_REGEX.test(formData.email)) { setFormError('Please enter a valid email address.'); return false; }
        return true;
    };

    const reset = () => {
        setFormData(INITIAL);
        setFormError('');
    };

    const buildFormData = () => {
        const fd = new FormData();
        fd.append('Name',    formData.name.trim());
        fd.append('Phone',   formData.phone.trim());
        fd.append('Email',   formData.email.trim());
        fd.append('Address', formData.address.trim());
        fd.append('Course',  formData.course);
        if (formData.cv) fd.append('CV', formData.cv);
        return fd;
    };

    return { formData, formError, handleInputChange, handleFileChange, validate, reset, buildFormData };
}