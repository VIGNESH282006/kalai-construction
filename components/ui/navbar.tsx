'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FlowButton } from './flow-button';
import { useContactPopup } from './contact-popup';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const { openPopup } = useContactPopup();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Our Services', href: '/projects' },
        { name: 'Packages', href: '/packages' },
        { name: 'Gallery', href: '/gallery' },
    ];

    // Determine styles based on scroll state and page
    // On Home: Transparent at top (white text), White Glass when scrolled (dark text)
    // On Other Pages: Always White Glass (dark text)
    const isTransparent = isHome && !scrolled;

    const navClasses = isTransparent
        ? 'bg-gradient-to-b from-black/10 to-black/10 backdrop-blur-2xl border-b border-white/20 shadow-lg'
        : 'bg-white/80 backdrop-blur-1xl border-b border-gray-200 shadow-sm';

    // Always use dark text for better visibility
    const textClasses = 'text-gray-900 hover:text-blue-600';

    // Always use dark text for mobile menu
    const mobileMenuClasses = 'text-gray-900 hover:bg-gray-100';

    const handleContactClick = () => {
        setIsMobileMenuOpen(false);
        openPopup();
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src="/kalai-logo.png"
                            alt="Kalai Construction"
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* Navigation Items */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-base font-semibold transition-all duration-300 hover:scale-105 ${isActive
                                        ? 'text-blue-600'
                                        : textClasses
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Contact Us Button */}
                    <div className="hidden md:block">
                        <FlowButton text="Contact Us" dark={true} onClick={handleContactClick} />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 rounded-lg transition-colors ${mobileMenuClasses}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg
                            className="w-6 h-6 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 py-4 space-y-3 border-t border-gray-200/50">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`block py-2 px-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive
                                        ? 'text-blue-600 bg-blue-50'
                                        : mobileMenuClasses
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="pt-2">
                            <FlowButton text="Contact Us" dark={true} onClick={handleContactClick} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
