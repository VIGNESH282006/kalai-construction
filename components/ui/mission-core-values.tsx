"use client";

import { motion } from "framer-motion";
import { Building, Users, Award, Clock } from "lucide-react";

interface CoreValue {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface MissionCoreValuesProps {
    missionText?: string;
}

export function MissionCoreValues({
    missionText = "To provide world-class construction services that exceed expectations while maintaining the highest standards of safety, sustainability, and innovation. We are committed to building lasting relationships with our clients through transparency, reliability, and exceptional craftsmanship.",
}: MissionCoreValuesProps) {
    const coreValues: CoreValue[] = [
        {
            icon: <Building className="w-6 h-6" />,
            title: "Quality Construction",
            description: "We deliver exceptional quality in every project, ensuring durability and excellence.",
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Expert Team",
            description: "Our skilled professionals bring years of experience to every construction project.",
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Award Winning",
            description: "Recognized for our commitment to excellence and innovative building solutions.",
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "On-Time Delivery",
            description: "We pride ourselves on completing projects on schedule without compromising quality.",
        },
    ];

    return (
        <section className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Our Mission
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {missionText}
                    </p>
                </motion.div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Our Core Values
                    </h2>
                </motion.div>

                {/* Core Values Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreValues.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                {value.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {value.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
