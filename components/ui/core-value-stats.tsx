"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export interface CoreStat {
    value: number;
    suffix?: string;
    label: string;
    description: string;
    image: string;
}

interface CoreValueStatsProps {
    title?: string;
    subtitle?: string;
    description?: string;
    stats: CoreStat[];
}

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

function StatCard({ stat, index }: { stat: CoreStat; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useCountUp(stat.value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
        >
            <Card className="relative h-72 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow text-white rounded-2xl">
                <Image
                    src={stat.image}
                    alt={stat.label}
                    fill
                    className="absolute inset-0 object-cover w-full h-full"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                <CardContent className="relative z-10 p-6 space-y-2 text-left flex flex-col justify-end h-full">
                    <div>
                        <h3 className="text-5xl font-bold drop-shadow-lg">
                            {count}{stat.suffix || ''}
                        </h3>
                        <p className="text-base font-semibold uppercase tracking-wide opacity-95 mt-2">
                            {stat.label}
                        </p>
                        <p className="text-sm leading-relaxed opacity-85 mt-1">
                            {stat.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function CoreValueStats({
    title = "Our Achievements",
    description = "Numbers that speak for our commitment to excellence",
    stats,
}: CoreValueStatsProps) {
    return (
        <section className="max-w-7xl mx-auto py-16 md:py-20 px-6 text-center bg-gray-50">
            {/* Section header */}
            <div className="space-y-4 mb-12">
                <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">
                    
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
                    {title}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {description}
                </p>
            </div>

            {/* Grid container for 4 cards in a row */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
                {stats.map((item, i) => (
                    <StatCard key={i} stat={item} index={i} />
                ))}
            </div>
        </section>
    );
}
