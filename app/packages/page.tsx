"use client";

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { PremiumPricing } from '@/components/ui/premium-pricing';
import { ConstructionCalculator } from '@/components/ui/construction-calculator';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { FaqsSection } from '@/components/ui/faqs-1';

export default function PackagesPage() {
    return (
        <main className="min-h-screen bg-white [&_p]:text-left [&_p]:text-justify-none">
            <Navbar />

            {/* Hero Section with animation */}
            <motion.div
                className="pt-24 pb-8 bg-gradient-to-b from-blue-50 to-white"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our Construction Packages
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        style={{ textAlign: 'center' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Transparent pricing for quality construction. Choose a package that fits your needs and budget.
                    </motion.p>
                </div>
            </motion.div>

            {/* Pricing Section with animation */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                <PremiumPricing />
            </motion.div>

            {/* Construction Cost Calculator with animation */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
            >
                <ConstructionCalculator />
            </motion.div>

            {/* FAQ Section with animation */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="pb-16"
            >
                <FaqsSection />
            </motion.div>

            <ScrollToTop />
        </main>
    );
}

