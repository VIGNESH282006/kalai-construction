"use client";

import { motion } from "framer-motion";
import { Navbar } from '@/components/ui/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SplitHero } from '@/components/ui/split-hero';
import { MissionCoreValues } from '@/components/ui/mission-core-values';
import { Building2, FileCheck, Landmark, Wallet, Home, Paintbrush, Ruler, UtensilsCrossed, Building, Wrench } from 'lucide-react';

export default function OurServicesPage() {
    const services = [
        {
            title: 'Building Construction',
            description: 'Complete construction services from foundation to finishing. We build residential and commercial structures with superior quality materials and expert craftsmanship.',
            icon: Building2,
            gradient: 'from-blue-500 to-blue-700',
            iconBg: 'bg-blue-100',
            textColor: 'text-blue-700',
        },
        {
            title: 'Building Plan Approval (Vasthu)',
            description: 'Vastu-compliant building plan approvals and consultations. We ensure your construction aligns with traditional principles while meeting modern building regulations.',
            icon: FileCheck,
            gradient: 'from-emerald-500 to-emerald-700',
            iconBg: 'bg-emerald-100',
            textColor: 'text-emerald-700',
        },
        {
            title: 'Land Buying & Selling',
            description: 'Expert assistance in real estate transactions. We help you find the perfect plot and navigate the complexities of land purchase and sale processes.',
            icon: Landmark,
            gradient: 'from-amber-500 to-amber-700',
            iconBg: 'bg-amber-100',
            textColor: 'text-amber-700',
        },
        {
            title: 'Bank Loan Arrangements',
            description: 'Streamlined financial support for your construction projects. We assist with loan documentation and processing to secure the best financing options.',
            icon: Wallet,
            gradient: 'from-purple-500 to-purple-700',
            iconBg: 'bg-purple-100',
            textColor: 'text-purple-700',
        },
        {
            title: 'Interior Designs',
            description: 'Transform your spaces with creative and functional interior design solutions. From concept to execution, we create beautiful living and working environments.',
            icon: Home,
            gradient: 'from-pink-500 to-pink-700',
            iconBg: 'bg-pink-100',
            textColor: 'text-pink-700',
        },
        {
            title: 'Exterior Designs',
            description: 'Stunning facade and exterior design services that enhance curb appeal. We create impressive building exteriors that stand the test of time.',
            icon: Paintbrush,
            gradient: 'from-red-500 to-red-700',
            iconBg: 'bg-red-100',
            textColor: 'text-red-700',
        },
        {
            title: 'Autocad',
            description: 'Professional architectural drawings and technical plans using industry-standard AutoCAD software. Precise 2D and 3D designs for all your construction needs.',
            icon: Ruler,
            gradient: 'from-teal-500 to-teal-700',
            iconBg: 'bg-teal-100',
            textColor: 'text-teal-700',
        },
        {
            title: 'Modular Kitchen',
            description: 'Modern, functional modular kitchen design and installation. Customized solutions that combine aesthetics with efficiency for your culinary space.',
            icon: UtensilsCrossed,
            gradient: 'from-orange-500 to-orange-700',
            iconBg: 'bg-orange-100',
            textColor: 'text-orange-700',
        },
        {
            title: 'Front Elevation Designs',
            description: 'Impressive building facades that make a statement. Our elevation designs combine architectural excellence with visual appeal.',
            icon: Building,
            gradient: 'from-indigo-500 to-indigo-700',
            iconBg: 'bg-indigo-100',
            textColor: 'text-indigo-700',
        },
        {
            title: 'Renovation Works',
            description: 'Comprehensive renovation services to breathe new life into existing structures. From minor updates to complete transformations.',
            icon: Wrench,
            gradient: 'from-cyan-500 to-cyan-700',
            iconBg: 'bg-cyan-100',
            textColor: 'text-cyan-700',
        },
    ];

    const renderServiceCard = (service: typeof services[0], index: number) => {
        const Icon = service.icon;
        return (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
            >
                <Card className="bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:scale-105 group overflow-hidden relative h-full min-h-[280px]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardHeader className="relative z-10">
                        <div className={`w-16 h-16 ${service.iconBg} rounded-xl mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <Icon className={`w-8 h-8 ${service.textColor}`} />
                        </div>
                        <CardTitle className="text-gray-900 text-2xl group-hover:text-blue-700 transition-colors">
                            {service.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <CardDescription className="text-gray-700 leading-relaxed">
                            {service.description}
                        </CardDescription>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <SplitHero
                title="Comprehensive Construction Services in Tiruvallur"
                description="At Kalai Construction, we offer a wide range of construction services tailored to meet the diverse needs of our clients. Your trusted partner in bringing construction visions to reality."
                image1Src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
                image2Src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
                stats={[
                    { value: "10+", label: "Services Offered" },
                    { value: "500+", label: "Projects Completed" },
                    { value: "100%", label: "Client Satisfaction" }
                ]}
            />

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Introduction Section */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        From building construction to interior design, we provide comprehensive solutions
                        for all your construction needs. Our skilled team of professionals is dedicated to
                        delivering exceptional results that exceed your expectations.
                    </p>
                </div>

                {/* Services Grid - First 8 cards in 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {services.slice(0, 8).map((service, index) => renderServiceCard(service, index))}
                </div>

                {/* Last 2 cards centered */}
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
                    {services.slice(8).map((service, index) => (
                        <div key={index + 8} className="w-full md:w-[calc(25%-12px)] h-full">
                            {renderServiceCard(service, index + 8)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Core Values Section */}
            <MissionCoreValues />

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Call to Action Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Ready to Get Started?
                    </h3>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Contact us today to discuss your construction needs. Our expert team is ready to
                        turn your vision into reality with quality craftsmanship and timely delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                            Request a Quote
                        </button>
                        <button className="bg-blue-700/50 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700/70 transition-all duration-300 border-2 border-white/30 hover:scale-105">
                            Call Us Now
                        </button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mt-16 text-center space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900">Get In Touch</h4>
                    <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-700">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+91 74485 56198</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>kalaiconstructionkc@gmail.com</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Thirunindravur, Chennai</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
