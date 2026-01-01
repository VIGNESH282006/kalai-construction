import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ContactButton } from './contact-button';

interface FooterProps {
    logo?: {
        src: string;
        alt: string;
        title: string;
    };
    tagline?: string;
    copyright?: string;
}

export function Footer({
    logo = {
        src: "/kalai-logo.png",
        alt: "Kalai Construction",
        title: "Kalai Construction",
    },
    tagline = "At Kalai Construction we build modern, quality homes that help families live better, dream bigger, and grow with confidence.",
    copyright = "© 2026 Kalai Construction - All rights reserved.",
}: FooterProps) {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-16 pb-8 border-t border-blue-400/20 overflow-hidden">
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/85" />

            {/* Logo Watermark Background - wider */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                <img
                    src="/kalai-logo.png"
                    alt=""
                    className="w-[350px] md:w-[500px] lg:w-[650px] opacity-[0.15]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
                    {/* Column 1: Logo & Tagline */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-10 w-auto"
                            />
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">{tagline}</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="text-black font-medium hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link href="/projects" className="text-black font-medium hover:text-blue-600 transition-colors">Our Services</Link></li>
                            <li><Link href="/packages" className="text-black font-medium hover:text-blue-600 transition-colors">Packages</Link></li>
                            <li><Link href="/gallery" className="text-black font-medium hover:text-blue-600 transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/projects#building-construction" className="text-black font-medium hover:text-blue-600 transition-colors">Building Construction</Link></li>
                            <li><Link href="/projects#interior-design" className="text-black font-medium hover:text-blue-600 transition-colors">Interior Design</Link></li>
                            <li><ContactButton className="text-black font-medium hover:text-blue-600 transition-colors cursor-pointer">Contact Us</ContactButton></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                                <a href="mailto:kalaiconstructionkc@gmail.com" className="text-black font-medium hover:text-blue-600 transition-colors">kalaiconstructionkc@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                                <a href="tel:+917448556198" className="text-black font-medium hover:text-blue-600 transition-colors">+91 74485 56198</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-black font-medium">Chennai, Tamilnadu</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 pt-6 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4 text-base text-gray-800">
                    <p>{copyright}</p>
                    <a href="https://caarapace.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                        <span className="text-gray-800">Designed by</span>
                        <img src="/caarapace-logo.png" alt="Caarapace" className="h-6 w-auto" />
                        <span className="text-black font-semibold group-hover:text-red-600 transition-colors">Caarapace</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
