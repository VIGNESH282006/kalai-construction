"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Construction } from 'lucide-react';

// Utility function to merge class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- Component Props & Data Types ---

interface ProcessStep {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    image: string;
}

interface ConstructionProcessTimelineProps {
    steps?: ProcessStep[];
    defaultStep?: string;
}

// --- Default Data ---
const CONSTRUCTION_STEPS: ProcessStep[] = [
    {
        id: "01",
        title: "Requirement & Site Visit",
        subtitle: "Client Consultation",
        description: "Detailed discussions to understand your vision, requirements, and budget with thorough site assessment.",
        details: ["Initial Meeting", "Site Survey", "Documentation", "Feasibility Check"],
        image: "/construction-process/step1_consultation_1769953149383.png",
    },
    {
        id: "02",
        title: "Planning & Costing",
        subtitle: "Project Planning",
        description: "Comprehensive project plan with detailed cost estimates, timelines, and resource allocation.",
        details: ["Cost Analysis", "Budget Plan", "Timeline", "Resources"],
        image: "/construction-process/step2_planning_1769953170444.png",
    },
    {
        id: "03",
        title: "Design",
        subtitle: "Architectural Design",
        description: "Create architectural and structural plans that match your vision using modern design tools.",
        details: ["Architecture", "Structural", "3D Visual", "Approval"],
        image: "/construction-process/step3_design_1769953189822.png",
    },
    {
        id: "04",
        title: "Construction",
        subtitle: "Building Work",
        description: "Quality workmanship following strict standards and safety protocols throughout construction.",
        details: ["Foundation", "Structure", "MEP Work", "Interiors"],
        image: "/construction-process/step4_construction_1769953206335.png",
    },
    {
        id: "05",
        title: "Quality Checks",
        subtitle: "Inspection & Testing",
        description: "Rigorous quality inspections and safety checks to ensure the highest standards are met.",
        details: ["Inspections", "Testing", "Compliance", "Certification"],
        image: "/construction-process/step5_quality_checks.png",
    },
    {
        id: "06",
        title: "Updates",
        subtitle: "Progress Communication",
        description: "Regular progress updates through CRM and direct communication for complete transparency.",
        details: ["Reports", "Updates", "Meetings", "Support"],
        image: "/construction-process/step6_updates_1769953241221.png",
    }
];

// --- Main Timeline Component ---

export const ConstructionProcessTimeline = ({
    steps = CONSTRUCTION_STEPS,
    defaultStep
}: ConstructionProcessTimelineProps) => {
    const [activeStep, setActiveStep] = useState(defaultStep || steps[0]?.id);

    const activeStepData = steps.find(step => step.id === activeStep);
    const activeIndex = steps.findIndex(step => step.id === activeStep);

    // Auto-scroll functionality - loops continuously
    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((current) => {
                const currentIndex = steps.findIndex(step => step.id === current);
                const nextIndex = (currentIndex + 1) % steps.length; // Loop back to first step

                return steps[nextIndex].id;
            });
        }, 10000); // Change step every 10 seconds

        return () => clearInterval(interval);
    }, [steps]);

    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="w-full max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Our Construction <span className="text-blue-600">Process</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto text-center">
                        A systematic approach to deliver your dream project with quality and transparency
                    </p>
                </motion.div>

                {/* Main Card Container */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Construction className="w-6 h-6" />
                            </div>
                            <span className="font-semibold text-gray-900">Construction Process</span>
                        </div>

                        {/* Step Pills */}
                        <div className="flex gap-2">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300",
                                        activeStep === step.id
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    )}
                                >
                                    {step.id}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area - Horizontal Layout */}
                    <AnimatePresence mode="wait">
                        {activeStepData && (
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 gap-6 p-6"
                            >
                                {/* Left: Content */}
                                <div className="flex flex-col justify-center space-y-4">
                                    {/* Step Badge and Title */}
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold mb-2">
                                            Step {activeStepData.id}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                            {activeStepData.title}
                                        </h3>
                                        <p className="text-lg text-blue-600 font-medium">
                                            {activeStepData.subtitle}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 leading-relaxed">
                                        {activeStepData.description}
                                    </p>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {activeStepData.details.map((detail, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                                    ✓
                                                </div>
                                                <span className="text-gray-700 font-medium">{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Image */}
                                <div className="relative h-64 md:h-full min-h-[280px] rounded-xl overflow-hidden bg-gray-100">
                                    <Image
                                        src={activeStepData.image}
                                        alt={activeStepData.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Progress Bar */}
                    <div className="px-6 pb-6">
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute h-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Step Labels */}
                        <div className="flex justify-between items-start gap-2 mt-3">
                            {steps.map((step, i) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className="flex-1 flex flex-col items-center text-center hover:scale-105 transition-transform focus:outline-none"
                                >
                                    <span className={cn(
                                        "text-xs md:text-sm font-bold transition-colors",
                                        i <= activeIndex ? "text-blue-600" : "text-gray-400"
                                    )}>
                                        {step.id}
                                    </span>
                                    <p className={cn(
                                        "text-[10px] md:text-xs transition-colors leading-tight mt-0.5",
                                        i <= activeIndex ? "text-gray-700" : "text-gray-400"
                                    )}>
                                        {step.title}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
