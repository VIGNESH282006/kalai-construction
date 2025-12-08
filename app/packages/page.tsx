"use client";

import { Navbar } from '@/components/ui/navbar';
import { PremiumPricing } from '@/components/ui/premium-pricing';
import { ConstructionCalculator } from '@/components/ui/construction-calculator';

export default function PackagesPage() {
    return (
        <main className="min-h-screen bg-white [&_p]:text-left [&_p]:text-justify-none">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-24 pb-8 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Construction Packages
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Transparent pricing for quality construction. Choose a package that fits your needs and budget.
                    </p>
                </div>
            </div>

            {/* Pricing Section */}
            <PremiumPricing />

            {/* Construction Cost Calculator */}
            <ConstructionCalculator />
        </main>
    );
}
