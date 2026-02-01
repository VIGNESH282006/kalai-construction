"use client";

import { motion } from "framer-motion";
import { Navbar } from '@/components/ui/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SplitHero } from '@/components/ui/split-hero';
import { FeatureSteps } from '@/components/ui/feature-section';
import { MissionCoreValues } from '@/components/ui/mission-core-values';
import { Building2, FileCheck, Landmark, Wallet, Home, Paintbrush, Ruler, UtensilsCrossed, Building, Wrench } from 'lucide-react';
import { useContactPopup } from '@/components/ui/contact-popup';

export default function OurServicesPage() {
    const { openPopup } = useContactPopup();

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

    const features = [
        {
            step: "Feature 1",
            title: "Quality",
            content: "We deliver exceptional quality in every project, using premium materials and skilled craftsmanship to ensure your construction stands the test of time.",
            image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
        },
        {
            step: "Feature 2",
            title: "Trust",
            content: "With over 15 years of experience, we've built lasting relationships with our clients through transparency, reliability, and consistent delivery on our promises.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
        },
        {
            step: "Feature 3",
            title: "Innovation",
            content: "We embrace modern construction techniques and innovative designs, bringing creative solutions that maximize space, efficiency, and aesthetic appeal.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
        },
        {
            step: "Feature 4",
            title: "Best Support",
            content: "Our dedicated team provides end-to-end support from planning to completion, ensuring smooth communication and addressing your needs at every stage.",
            image: "/images/best-support.png"
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
                <Card className="bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:scale-105 group overflow-hidden relative h-[320px] flex flex-col">
                    <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardHeader className="relative z-10">
                        <div className={`w-16 h-16 ${service.iconBg} rounded-xl mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                            <Icon className={`w-8 h-8 ${service.textColor}`} />
                        </div>
                        <CardTitle className="text-gray-900 text-2xl group-hover:text-blue-700 transition-colors">
                            {service.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 flex-1">
                        <CardDescription className="text-gray-700 leading-relaxed line-clamp-4">
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
                title="Comprehensive Construction Services in Chennai & Tiruvallur"
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

            {/* Features Section */}
            <FeatureSteps
                title="Our Features"
                features={features}
                autoPlayInterval={5000}
            />

            {/* Mission & Core Values Section */}
            <MissionCoreValues />

            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Call to Action Section */}
                <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Ready to Get Started?
                    </h3>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Contact us today to discuss your construction needs. Our expert team is ready to
                        turn your vision into reality with quality craftsmanship and timely delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <button
                            onClick={openPopup}
                            className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                        >
                            Request a Quote
                        </button>
                        <a
                            href="tel:+917448556198"
                            className="bg-blue-700/50 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700/70 transition-all duration-300 border-2 border-white/30 hover:scale-105"
                        >
                            Call Us Now
                        </a>
                    </div>
                </div>


            </div>
        </main>
    );
}
