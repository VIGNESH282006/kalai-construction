"use client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CarouselModalProps {
    images: { src: string; title: string }[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export function CarouselModal({ images, initialIndex, isOpen, onClose }: CarouselModalProps) {
    const [current, setCurrent] = useState(initialIndex);

    useEffect(() => {
        setCurrent(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, current]);

    const handlePrevious = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const handleNext = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-10 text-white text-lg font-medium">
                {current + 1} / {images.length}
            </div>

            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                className="absolute left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110"
            >
                <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className="absolute right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110"
            >
                <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image
                        src={images[current].src}
                        alt={images[current].title}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-white text-2xl font-semibold text-center">
                        {images[current].title}
                    </h3>
                </div>
            </div>
        </div>
    );
}
