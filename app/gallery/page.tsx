'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { SplitHero } from '@/components/ui/split-hero';
import { FocusCards } from '@/components/ui/focus-cards';
import { CarouselModal } from '@/components/ui/carousel-modal';

export default function GalleryPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // All your gallery images
    const galleryImages = Array.from({ length: 27 }, (_, i) => ({
        title: `Construction Project ${i + 1}`,
        src: `/Gallery-pic/project-${i + 1}.webp`,
    }));

    const handleCardClick = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(null);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <SplitHero
                title="Our Project Gallery"
                description="Explore our portfolio of completed construction projects. From residential homes to commercial buildings, each project showcases our commitment to quality and excellence."
                image1Src="/images/gallery-hero-1.png"
                image2Src="/images/gallery-hero-2.png"
                stats={[
                    { value: "500+", label: "Projects Completed" },
                    { value: "15+", label: "Years Experience" },
                    { value: "100%", label: "Client Satisfaction" }
                ]}
            />

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Project Gallery
                    </h2>
                    <p className="text-xl text-center text-gray-700 max-w-6xl mx-auto leading-relaxed">
                        Browse through our collection of completed projects. Click on any image to view it in detail.
                    </p>
                </div>

                {/* Focus Cards Grid */}
                <FocusCards cards={galleryImages} onCardClick={handleCardClick} />
            </div>

            {/* Carousel Modal for Enlarged View */}
            {selectedImageIndex !== null && (
                <CarouselModal
                    images={galleryImages}
                    initialIndex={selectedImageIndex}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </main>
    );
}
