"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { X, User, Mail, Phone, MessageSquare, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'AmWgMD6ARfk-PSYDf';
const EMAILJS_SERVICE_ID = 'service_l63y4vf';
const EMAILJS_TEMPLATE_ID = 'template_s0l435f';

// Context for managing popup state
interface ContactPopupContextType {
    isOpen: boolean;
    openPopup: () => void;
    closePopup: () => void;
}

const ContactPopupContext = createContext<ContactPopupContextType | undefined>(undefined);

export function useContactPopup() {
    const context = useContext(ContactPopupContext);
    if (!context) {
        throw new Error('useContactPopup must be used within a ContactPopupProvider');
    }
    return context;
}

// Toast notification component
interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                : 'bg-gradient-to-r from-red-500 to-rose-500'
                } text-white`}
        >
            {type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
            ) : (
                <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

// Form data interface
interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// Contact Popup Component
function ContactPopupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Lock body scroll when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setToast({ message: 'Please fill all required fields', type: 'error' });
            setTimeout(() => setToast(null), 4000);
            return;
        }

        setIsLoading(true);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject || 'General Inquiry',
            message: formData.message,
            date: new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setToast({ message: 'Message sent successfully! We\'ll contact you soon.', type: 'success' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            setTimeout(() => {
                setToast(null);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setToast({ message: 'Failed to send message. Please try again.', type: 'error' });
            setTimeout(() => setToast(null), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-slate-900 to-cyan-600 px-6 py-8 rounded-t-3xl flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h2 className="text-2xl font-bold text-white">Get In Touch</h2>
                                <p className="text-blue-100 mt-2">We'd love to hear from you. Send us a message!</p>
                            </div>

                            {/* Scrollable Form Container */}
                            <div className="flex-1 overflow-y-auto contact-popup-scroll">
                                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                placeholder="+91 XXXXX XXXXX"
                                                value={formData.phone}
                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="What's this about?"
                                                value={formData.subject}
                                                onChange={(e) => handleChange('subject', e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <textarea
                                                placeholder="Tell us about your project..."
                                                value={formData.message}
                                                onChange={(e) => handleChange('message', e.target.value)}
                                                rows={4}
                                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white resize-none"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 px-6 bg-gradient-to-r from-slate-900 to-cyan-600 hover:from-slate-800 hover:to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* Toast */}
                    <AnimatePresence>
                        {toast && (
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => setToast(null)}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}

// Provider Component
export function ContactPopupProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return (
        <ContactPopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
            {children}
            <ContactPopupModal isOpen={isOpen} onClose={closePopup} />
        </ContactPopupContext.Provider>
    );
}
