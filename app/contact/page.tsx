"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { SplitHero } from '@/components/ui/split-hero';

import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration (Same as popup)
const EMAILJS_PUBLIC_KEY = 'AmWgMD6ARfk-PSYDf';
const EMAILJS_SERVICE_ID = 'service_l63y4vf';
const EMAILJS_TEMPLATE_ID = 'template_s0l435f';

// Toast Component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
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
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
    );
}

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleChange = (field: string, value: string) => {
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
            subject: formData.subject || 'General Inquiry via Website',
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
        } catch (error) {
            console.error('EmailJS Error:', error);
            setToast({ message: 'Failed to send message. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setToast(null), 5000);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Split Hero Section */}
            <SplitHero
                title="Get in Touch with Kalai Construction"
                description="We are here to answer your questions and discuss your construction needs. Reach out to us today to start your journey."
                image1Src="/images/contact-hero-1.png"
                image2Src="/images/contact-hero-2.png"
            />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Information</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Ready to start your project? Have questions about our services?
                                Our team is here to help. Contact us through any of the channels below.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100">
                                <div className="p-3 bg-blue-600 rounded-xl text-white">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600 mb-2">Mon-Sat from 9am to 6pm</p>
                                    <a href="tel:+917448556198" className="text-lg font-semibold text-blue-700 hover:text-blue-800 transition-colors">
                                        +91 74485 56198
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100">
                                <div className="p-3 bg-blue-600 rounded-xl text-white">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600 mb-2">Our friendly team is here to help</p>
                                    <a href="mailto:kalaiconstructionkc@gmail.com" className="text-lg font-semibold text-blue-700 hover:text-blue-800 transition-colors break-all">
                                        kalaiconstructionkc@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100">
                                <div className="p-3 bg-blue-600 rounded-xl text-white">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Office</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Thirunindravur,<br />
                                        Chennai, Tamil Nadu
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 hover:bg-white"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 hover:bg-white"
                                        placeholder="Your phone number"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message <span className="text-red-500">*</span></label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 hover:bg-white resize-none"
                                    placeholder="Tell us about your project..."
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>


            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
