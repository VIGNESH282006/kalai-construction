import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
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
    tagline = "Building Dreams Into Reality",
    copyright = "© 2023 Kalai Construction. All rights reserved.",
}: FooterProps) {
    const services = [
        "Building Construction",
        "Building Plan Approval(Vasthu)",
        "Land Buying & Selling",
        "Bank Loan Arrangements",
        "Interior Designs",
        "Exterior Designs",
        "Autocad",
        "Modular Kitchen",
        "Front Elevation Designs",
        "Renovation Works"
    ];

    return (
        <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Column 1: Logo & Tagline */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-12 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{tagline}</p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                                <Facebook className="w-4 h-4 text-white" />
                            </a>
                            <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                                <Instagram className="w-4 h-4 text-white" />
                            </a>
                            <a href="tel:+917448556198" className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors">
                                <Phone className="w-4 h-4 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Contact Info */}
                    <div className="lg:col-span-1">
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Contact Info</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <a href="tel:+917448556198" className="hover:text-white transition-colors">+91 74485 56198</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <a href="mailto:kalaiconstructionkc@gmail.com" className="hover:text-white transition-colors">kalaiconstructionkc@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>
                                    #418, C.T.H Road,<br />
                                    Lakshmipuram,<br />
                                    Thirunindravur, Chennai<br />
                                    - 602024.
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links & Services - Side by side on mobile */}
                    <div className="md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-8">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/projects" className="hover:text-white transition-colors">Our Services</Link></li>
                                <li><Link href="/packages" className="hover:text-white transition-colors">Packages</Link></li>
                                <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                                <li><ContactButton className="hover:text-white transition-colors cursor-pointer">Contact Us</ContactButton></li>
                            </ul>

                            {/* QR Code - Mobile only (below Quick Links) */}
                            <div className="mt-8 md:hidden">
                                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">QR Code</h3>
                                <div className="bg-white p-2 w-fit rounded-lg">
                                    <div className="w-28 h-28 bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center">
                                        QR Code Placeholder
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Our Services */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Our Services</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                {services.map((service, index) => (
                                    <li key={index} className="hover:text-white transition-colors cursor-default">
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* QR Code - Desktop only */}
                    <div className="hidden md:block lg:col-span-1">
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">QR Code</h3>
                        <div className="bg-white p-2 w-fit rounded-lg">
                            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center">
                                QR Code Placeholder
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>{copyright}</p>
                    <p>Designed by <span className="text-blue-400">Caarapace Inc.</span></p>
                </div>
            </div>
        </footer>
    );
}
