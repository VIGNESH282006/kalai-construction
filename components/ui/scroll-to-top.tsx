"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        // Force scroll to top on route change with 'auto' behavior to satisfy "even up" request
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [pathname]);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                        transition: {
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 }
                        }
                    }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-8 z-[100] p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 active:scale-95 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
