"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Feature {
    step: string
    title?: string
    content: string
    image: string
}

interface FeatureStepsProps {
    features: Feature[]
    className?: string
    title?: string
    autoPlayInterval?: number
    imageHeight?: string
}

export function FeatureSteps({
    features,
    className,
    title = "Our Features",
    autoPlayInterval = 4000,
}: FeatureStepsProps) {
    const [currentFeature, setCurrentFeature] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < 100) {
                setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
            } else {
                setCurrentFeature((prev) => (prev + 1) % features.length)
                setProgress(0)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [progress, features.length, autoPlayInterval])

    const handleFeatureClick = (index: number) => {
        setCurrentFeature(index)
        setProgress(0)
    }

    return (
        <section className={cn("pt-6 pb-16 md:py-20 bg-white", className)}>
            <div className="max-w-7xl mx-auto w-full px-6">
                <div className="text-center mb-0 md:mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        {title}
                    </h2>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-start lg:items-center" style={{ gap: 0 }}>
                    {/* Feature List - Left Side */}
                    <div className="space-y-4 lg:space-y-6 !mt-0 [&>*:first-child]:mt-0 order-2 lg:order-1">
                        {features.map((feature, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleFeatureClick(index)}
                                className={cn(
                                    "w-full flex items-start gap-4 md:gap-6 p-4 rounded-xl text-left transition-all duration-300",
                                    index === currentFeature
                                        ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                                )}
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: index === currentFeature ? 1 : 0.7 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg",
                                        index === currentFeature
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-600"
                                    )}
                                    animate={{
                                        scale: index === currentFeature ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {index + 1}
                                </motion.div>

                                <div className="flex-1">
                                    <h3 className={cn(
                                        "text-xl md:text-2xl font-semibold mb-1",
                                        index === currentFeature ? "text-blue-700" : "text-gray-800"
                                    )}>
                                        {feature.title || feature.step}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        {feature.content}
                                    </p>

                                    {/* Progress bar for current feature */}
                                    {index === currentFeature && (
                                        <div className="mt-3 h-1 bg-blue-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-600"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.1 }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Image - Right Side */}
                    {/* Right Side - Images & Extra Content */}
                    <div className="flex flex-col gap-8 lg:ml-24 order-1 lg:order-2 mb-4 lg:mb-0 lg:mt-0">
                        {/* Mobile App Card */}
                        <div className="w-full bg-white rounded-2xl shadow-xl p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300 border border-gray-100 min-h-[120px]">
                            <div className="flex-shrink-0 w-16 h-16 relative bg-gray-50 rounded-xl p-2">
                                <Image
                                    src="/images/c-deck-logo.jpg"
                                    alt="C-Deck Logo"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Available on Mobile App</h3>
                                <p className="text-gray-600 text-sm mt-1">Seamlessly manage projects on iOS & Android</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center lg:justify-start">
                            <Button
                                className="group px-10 py-4 text-lg font-bold bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-red-500/30 rounded-full h-auto"
                                asChild
                            >
                                <a
                                    href="https://cdeck.eksconstruction.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get Started
                                    <ArrowRight
                                        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </a>
                            </Button>
                        </div>

                        {/* Main Feature Image */}
                        <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[450px] overflow-hidden rounded-2xl shadow-xl">
                            <AnimatePresence mode="wait">
                                {features.map(
                                    (feature, index) =>
                                        index === currentFeature && (
                                            <motion.div
                                                key={index}
                                                className="absolute inset-0 rounded-2xl overflow-hidden"
                                                initial={{ x: 100, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -100, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            >
                                                <Image
                                                    src={feature.image}
                                                    alt={feature.title || feature.step}
                                                    className="w-full h-full object-cover"
                                                    width={1000}
                                                    height={600}
                                                    priority
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                                        {feature.title || feature.step}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
