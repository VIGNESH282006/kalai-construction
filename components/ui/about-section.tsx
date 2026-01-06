"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutSectionProps {
    imageSrc?: string;
}

export function AboutSection({
    imageSrc = "/images/about-us-final.jpg",
}: AboutSectionProps) {
    return (
        <section className="py-16 md:py-24 bg-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Large Heading */}
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                            ABOUT <span className="text-blue-600">US</span>
                        </h2>

                        {/* Divider */}
                        <div className="w-16 h-1 bg-blue-600 mb-8" />

                        {/* Paragraph 1 */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                            The leading firm constructing company in Thirunindravur, Avadi, Poonamallee, Pakam, Veppambaattu, Tamil Nadu is Kalai Construction. We are experts in providing services related to building construction, including plan approval (Vasthu), land purchase and sale, bank loan negotiations, interior and exterior design, and AutoCAD. We are the ideal option for all of your renovation projects, front elevation designs, and modular kitchen needs.
                        </p>

                        {/* Inspiration Label */}
                        <div className="mb-4">
                            <h3 className="text-xl md:text-2xl font-bold tracking-wide text-blue-600">
                                Our Commitment
                            </h3>
                        </div>

                        {/* Paragraph 2 */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            With our industry knowledge and experience, we are dedicated to offering our customers high-quality services and solutions that satisfy their demands. We take great satisfaction in being dependable and effective while completing projects on schedule and under budget. Our team of skilled experts will carefully strive to see that your job is finished just as you have requested.
                        </p>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="relative">
                            {/* Decorative element */}
                            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-600/20 rounded-2xl transform rotate-2" />

                            {/* Main Image */}
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src={imageSrc}
                                    alt="Kalai Construction - Building Excellence"
                                    width={600}
                                    height={700}
                                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>

                            {/* Decorative accent lines */}
                            <div className="absolute -bottom-4 -left-4 w-24 h-1 bg-blue-600" />
                            <div className="absolute -bottom-4 -left-4 w-1 h-24 bg-blue-600" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
