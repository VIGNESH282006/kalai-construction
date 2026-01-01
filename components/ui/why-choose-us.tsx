"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Award, Clock, Wrench } from "lucide-react";
import { useContactPopup } from "./contact-popup";

interface WhyChooseFeature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface WhyChooseUsProps {
    subtitle?: string;
    imageSrc?: string;
    ctaText?: string;
}

export function WhyChooseUs({
    subtitle = "From residential homes to commercial buildings, we deliver excellence with quality craftsmanship and reliable service.",
    imageSrc = "/why-choose-us.png",
    ctaText = "Get a FREE Quote",
}: WhyChooseUsProps) {
    const { openPopup } = useContactPopup();

    const features: WhyChooseFeature[] = [
        {
            icon: <Users className="w-6 h-6" />,
            title: "Experienced Team",
            description: "Our certified experts provide top-quality service with over 15 years of construction excellence.",
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Quality Assurance",
            description: "We use only premium materials and maintain rigorous quality standards on every project.",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "On-Time Delivery",
            description: "Get your project completed on schedule. 98% of our builds are finished on or ahead of time.",
        },
        {
            icon: <Wrench className="w-6 h-6" />,
            title: "Complete Solutions",
            description: "From planning to finishing, we handle it all - your one-stop shop for all construction needs.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why choose <span className="text-blue-600">us?</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Main content with image in center and cards around */}
                <div className="relative">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
                        {/* Left Column - 2 cards */}
                        <div className="space-y-8">
                            {features.slice(0, 2).map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    whileHover={{ y: -8 }}
                                    className="text-right p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                                >
                                    <div className="flex justify-end mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Center Column - Image */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Decorative tilted border */}
                                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 translate-x-2 translate-y-2" />
                                {/* Main image */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <Image
                                        src={imageSrc}
                                        alt="Kalai Construction project"
                                        width={500}
                                        height={600}
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - 2 cards */}
                        <div className="space-y-8">
                            {features.slice(2, 4).map((feature, index) => (
                                <motion.div
                                    key={index + 2}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 2) * 0.15, duration: 0.5 }}
                                    whileHover={{ y: -8 }}
                                    className="text-left p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                                >
                                    <div className="flex justify-start mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile/Tablet Layout */}
                    <div className="lg:hidden">
                        {/* Image */}
                        <motion.div
                            className="relative mb-10"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="relative max-w-sm mx-auto">
                                {/* Decorative tilted border */}
                                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 translate-x-2 translate-y-2" />
                                {/* Main image */}
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <Image
                                        src={imageSrc}
                                        alt="Kalai Construction project"
                                        width={400}
                                        height={500}
                                        className="w-full h-[300px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5 }}
                                    className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-100"
                                >
                                    <div className="flex justify-center mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <button
                        onClick={openPopup}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        {ctaText}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

