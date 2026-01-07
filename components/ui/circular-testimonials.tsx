"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Feature {
    title: string;
    description: string;
    image: string;
}

interface CircularTestimonialsProps {
    features: Feature[];
    autoplay?: boolean;
    autoplayInterval?: number;
    className?: string; // Allow custom classNames for wrapper
}

function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    features,
    autoplay = true,
    autoplayInterval = 4000,
    className,
}: CircularTestimonialsProps) => {
    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const featuresLength = useMemo(() => features.length, [features]);

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % featuresLength);
            }, autoplayInterval);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, featuresLength]);

    // Handler to set active index when clicking a card
    const handleCardClick = (index: number) => {
        setActiveIndex(index);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };

    // Compute transforms for each image (always show 3: left, center, right)
    function getImageStyle(index: number): React.CSSProperties {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        // const offset = (index - activeIndex + featuresLength) % featuresLength;
        // const zIndex = featuresLength - Math.abs(offset);

        // In original code, logic was slightly complex for circular buffers.
        // Simplified:
        // We need to identify if 'index' is Active, Left, or Right based on 'activeIndex'.

        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + featuresLength) % featuresLength === index;
        const isRight = (activeIndex + 1) % featuresLength === index;

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1, // Keep visible for 3D effect
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        // Hide all other images
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    return (
        <div className={cn("w-full max-w-7xl mx-auto px-4 py-8 md:px-8", className)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                {/* Mobile-Only App Card (Order 1) */}
                <div className="order-1 md:hidden mb-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6 mb-8 max-w-2xl transform transition-transform hover:scale-[1.02]">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-2">
                            <img src="/images/crm-logo.jpg" alt="CRM Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="font-bold text-2xl text-gray-900 leading-tight mb-1">Available on Mobile App</h3>
                            <p className="text-gray-500 text-lg">Seamlessly manage projects on iOS & Android</p>
                        </div>
                    </div>
                    <a
                        href="https://cdeck.eksconstruction.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#E3000F] text-white px-10 py-4 text-lg rounded-full font-bold flex items-center gap-2 hover:bg-[#c4000d] transition-all w-fit group shadow-lg shadow-red-500/20"
                    >
                        Get Started
                        <svg
                            className="w-6 h-6 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
                {/* Content (Left) - Cards (Order 3 Mobile, Order 1 Desktop) */}
                <div className="flex flex-col space-y-4 order-3 md:order-1">
                    {/* App Availability Card - Increased Size (Desktop Only) */}
                    <div className="mb-4 hidden md:block">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6 mb-8 max-w-2xl transform transition-transform hover:scale-[1.02]">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-2">
                                <img src="/images/crm-logo.jpg" alt="CRM Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-gray-900 leading-tight mb-1">Available on Mobile App</h3>
                                <p className="text-gray-500 text-lg">Seamlessly manage projects on iOS & Android</p>
                            </div>
                        </div>
                        <a
                            href="https://cdeck.eksconstruction.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#E3000F] text-white px-10 py-4 text-lg rounded-full font-bold flex items-center gap-2 hover:bg-[#c4000d] transition-all w-fit group shadow-lg shadow-red-500/20"
                        >
                            Get Started
                            <svg
                                className="w-6 h-6 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    {features.map((feature, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={cn(
                                    "cursor-pointer p-6 rounded-xl transition-all duration-300 border-2",
                                    isActive
                                        ? "bg-white border-blue-600 shadow-lg scale-105"
                                        : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-md"
                                )}
                            >
                                <h3 className={cn(
                                    "text-xl font-bold mb-2",
                                    isActive ? "text-blue-600" : "text-gray-800"
                                )}>
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Images (Right) - 3D Carousel (Order 2 Mobile, Order 2 Desktop) */}
                <div className="relative w-[85%] md:w-full mx-auto h-80 md:h-[32rem] perspective-1000 order-2 md:order-2 md:mt-64" ref={imageContainerRef}>
                    {features.map((feature, index) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            key={feature.image}
                            src={feature.image}
                            alt={feature.title}
                            className="absolute w-full h-full object-cover rounded-2xl shadow-2xl bg-white"
                            style={getImageStyle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
