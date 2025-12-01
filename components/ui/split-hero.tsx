'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SplitHeroProps {
    title: string;
    description: string;
    image1Src: string;
    image2Src: string;
    stats?: {
        value: string;
        label: string;
    }[];
}

export function SplitHero({
    title,
    description,
    image1Src,
    image2Src,
    stats,
}: SplitHeroProps) {
    return (
        <section className="relative min-h-[90vh] w-full bg-[#E8F5E9] overflow-hidden flex items-center pt-20">
            {/* Background Pattern/Gradient could go here */}

            <div className="container mx-auto px-6 py-20 md:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-center z-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1A124B] leading-[1.1] mb-8">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </motion.div>

                    {/* Right Images */}
                    <div className="relative h-[600px] w-full hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 left-10 w-[45%] h-[85%] rounded-lg overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={image1Src}
                                alt="Hero Image 1"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute top-[15%] right-10 w-[45%] h-[85%] rounded-lg overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={image2Src}
                                alt="Hero Image 2"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Mobile Image View (Simplified) */}
                    <div className="lg:hidden w-full h-[400px] relative rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={image1Src}
                            alt="Hero Image Mobile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                </div>
            </div>

            {/* Stats Section (Bottom Overlay) */}
            {stats && (
                <div className="absolute bottom-0 right-0 w-full lg:w-1/2 bg-white/90 backdrop-blur-md border-t border-l border-gray-200 p-8 hidden lg:block">
                    <div className="grid grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-3xl font-bold text-[#1A124B] mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
