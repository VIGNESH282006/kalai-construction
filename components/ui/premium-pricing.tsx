"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    Zap,
    Crown,
    Star,
    ArrowRight,
    Sparkles,
    Shield,
    Rocket,
    Home,
    Users,
    Clock,
    Award,
    Gem
} from 'lucide-react';
import { useContactPopup } from './contact-popup';

interface PricingTier {
    name: string;
    subtitle: string;
    price: number;
    description: string;
    icon: typeof Zap;
    gradient: string;
    borderGradient: string;
    features: string[];
    highlight: boolean;
    badge: string | null;
    isPremium?: boolean;
}

interface AdditionalFeature {
    icon: typeof Home;
    title: string;
    description: string;
}

interface PremiumPricingProps {
    customTiers?: PricingTier[];
    customFeatures?: AdditionalFeature[];
    onPlanSelect?: (planName: string) => void;
    ctaText?: string;
    showAdditionalFeatures?: boolean;
    showCTASection?: boolean;
}

// Construction-related pricing plans
const pricingPlans: PricingTier[] = [
    {
        name: "Basic",
        subtitle: "For small projects",
        price: 2200,
        description: "Essential construction services for small residential projects",
        icon: Home,
        gradient: "from-blue-500/20 to-cyan-500/20",
        borderGradient: "from-blue-400 to-cyan-400",
        features: [
            "2D Floor Plan Design",
            "Basic Vastu Consultation",
            "Material Estimation",
            "Project Timeline Planning",
            "Email Support",
            "1 Site Visit"
        ],
        highlight: false,
        badge: null
    },
    {
        name: "Standard",
        subtitle: "Most popular choice",
        price: 2400,
        description: "Complete construction package for residential buildings",
        icon: Crown,
        gradient: "from-indigo-500/20 to-purple-500/20",
        borderGradient: "from-indigo-400 to-purple-400",
        features: [
            "3D Elevation Design",
            "Complete Vastu Planning",
            "Interior Design Concept",
            "Bank Loan Assistance",
            "Priority Support",
            "Unlimited Site Visits",
            "Quality Material Sourcing",
            "Project Management"
        ],
        highlight: true,
        badge: "Most Popular"
    },
    {
        name: "Premium",
        subtitle: "For large projects",
        price: 3000,
        description: "Enterprise-grade construction solutions with full customization",
        icon: Gem,
        gradient: "from-amber-500/30 to-orange-500/30",
        borderGradient: "from-amber-400 via-yellow-400 to-orange-400",
        features: [
            "Everything in Standard",
            "Custom Architecture Design",
            "Premium Interior Design",
            "Modular Kitchen Setup",
            "Landscaping Design",
            "Smart Home Integration",
            "5-Year Maintenance Support",
            "Dedicated Project Manager"
        ],
        highlight: false,
        badge: "Premium",
        isPremium: true
    }
];

const additionalFeatures: AdditionalFeature[] = [
    {
        icon: Award,
        title: "Quality Assurance",
        description: "Premium materials with quality certification"
    },
    {
        icon: Shield,
        title: "Warranty Protection",
        description: "Comprehensive warranty on all construction work"
    },
    {
        icon: Clock,
        title: "On-Time Delivery",
        description: "Guaranteed project completion on schedule"
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Skilled professionals with 15+ years experience"
    }
];

export function PremiumPricing({
    customTiers,
    customFeatures,
    onPlanSelect,
    ctaText = "Get Started",
    showAdditionalFeatures = true,
    showCTASection = true,
}: PremiumPricingProps = {}) {
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { openPopup } = useContactPopup();

    const tiers = customTiers || pricingPlans;
    const features = customFeatures || additionalFeatures;

    const handlePlanSelect = (planName: string) => {
        try {
            onPlanSelect?.(planName);
        } catch (err) {
            console.error('Error in plan selection callback:', err);
        }
    };

    const scrollToCalculator = () => {
        const calculator = document.getElementById('cost-calculator');
        if (calculator) {
            calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardHover = {
        rest: { scale: 1, y: 0 },
        hover: {
            scale: 1.02,
            y: -8,
            transition: {
                duration: 0.4,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Light Background Effects */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-amber-50/50"
                />

                {/* Subtle orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <motion.div
                ref={containerRef}
                className="relative z-10 max-w-7xl mx-auto px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeInUp}
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="h-4 w-4 text-blue-600" />
                        </motion.div>
                        <span className="text-sm font-medium text-blue-700">
                            Construction Packages
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </motion.div>

                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
                        variants={fadeInUp}
                    >
                        <span className="text-gray-900">
                            Choose Your
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#001f3f] via-blue-500 to-cyan-400">
                            Construction Package
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        style={{ textAlign: 'center' }}
                        variants={fadeInUp}
                    >
                        From basic planning to premium construction, we offer comprehensive packages tailored to your budget and requirements.
                    </motion.p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 pt-6"
                    variants={staggerContainer}
                >
                    {tiers.map((plan, index) => {
                        const isPremiumPlan = (plan as PricingTier).isPremium;

                        return (
                            <motion.div
                                key={plan.name}
                                className="relative"
                                variants={fadeInUp}
                                onHoverStart={() => setHoveredPlan(index)}
                                onHoverEnd={() => setHoveredPlan(null)}
                            >
                                {/* Half-hidden badge above card */}
                                {plan.badge && (
                                    <motion.div
                                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg ${isPremiumPlan
                                            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-white shadow-amber-200'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-purple-200'
                                            }`}
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {isPremiumPlan && <Sparkles className="w-3 h-3" />}
                                            {plan.badge}
                                            {isPremiumPlan && <Sparkles className="w-3 h-3" />}
                                        </span>
                                    </motion.div>
                                )}

                                <motion.div
                                    className={`relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-visible ${isPremiumPlan
                                        ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-300 shadow-2xl shadow-amber-100'
                                        : plan.highlight
                                            ? 'bg-white border-blue-300 shadow-xl shadow-blue-100'
                                            : 'bg-white border-gray-200 shadow-lg'
                                        } ${plan.badge ? 'mt-2' : ''}`}
                                    variants={cardHover}
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    {/* Premium glow effect */}
                                    {isPremiumPlan && (
                                        <motion.div
                                            className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 rounded-3xl opacity-20 blur-xl -z-10"
                                            animate={{
                                                opacity: [0.15, 0.25, 0.15],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    )}

                                    {/* Gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl ${isPremiumPlan ? 'opacity-60' : 'opacity-40'}`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon */}
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isPremiumPlan
                                                ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 border-2 border-amber-300 shadow-lg shadow-amber-200'
                                                : `bg-gradient-to-br ${plan.gradient} border border-gray-200`
                                                }`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <plan.icon className={`w-8 h-8 ${isPremiumPlan ? 'text-white' : 'text-gray-700'}`} />
                                        </motion.div>

                                        {/* Plan Info */}
                                        <h3 className={`text-2xl font-bold mb-2 ${isPremiumPlan ? 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">{plan.subtitle}</p>
                                        <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                                        {/* Price */}
                                        <div className="mb-8">
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-4xl font-bold ${isPremiumPlan ? 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                                                    ₹{plan.price.toLocaleString()}
                                                </span>
                                                <span className="text-gray-600">
                                                    /sq.ft
                                                </span>
                                            </div>
                                        </div>

                                        {/* Features - flex-grow to push button down */}
                                        <div className="mb-8 space-y-3 flex-grow">
                                            {plan.features.map((feature, featureIndex) => (
                                                <motion.div
                                                    key={featureIndex}
                                                    className="flex items-center gap-3"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: featureIndex * 0.1 }}
                                                >
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isPremiumPlan
                                                        ? 'bg-amber-100 border border-amber-300'
                                                        : 'bg-green-100 border border-green-300'
                                                        }`}>
                                                        <Check className={`w-3 h-3 ${isPremiumPlan ? 'text-amber-600' : 'text-green-600'}`} />
                                                    </div>
                                                    <span className="text-gray-600 text-sm">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* CTA Button - mt-auto ensures it stays at bottom */}
                                        <motion.button
                                            onClick={scrollToCalculator}
                                            className={`w-full py-4 px-6 rounded-xl font-medium transition-all mt-auto cursor-pointer ${isPremiumPlan
                                                ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200'
                                                : plan.highlight
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                                    : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {ctaText}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </motion.button>
                                    </div>

                                    {/* Hover glow effect */}
                                    <AnimatePresence>
                                        {hoveredPlan === index && (
                                            <motion.div
                                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                                style={{
                                                    background: isPremiumPlan
                                                        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)'
                                                        : plan.highlight
                                                            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                                                            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Additional Features */}
                {showAdditionalFeatures && (
                    <motion.div
                        className="mb-20"
                        variants={fadeInUp}
                    >
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Why Choose Kalai Construction?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-md hover:shadow-xl transition-all"
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center mx-auto mb-4"
                                        whileHover={{ rotate: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-blue-600" />
                                    </motion.div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* CTA Section */}
                {showCTASection && (
                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                    >
                        <div className="relative bg-gradient-to-r from-[#001f3f] via-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 overflow-hidden max-w-4xl mx-auto">
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    Ready to Build Your Dream Home?
                                </h3>
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed" style={{ textAlign: 'center' }}>
                                    Contact us today for a free consultation. Let us help you bring your vision to life with quality construction.
                                </p>

                                <motion.button
                                    onClick={openPopup}
                                    className="inline-flex items-center gap-3 bg-white text-blue-700 font-medium py-4 px-8 rounded-xl hover:bg-blue-50 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Star className="h-5 w-5" />
                                    Get Free Consultation
                                    <ArrowRight className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
