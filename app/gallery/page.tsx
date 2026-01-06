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
    const galleryImages = [
        { title: 'Construction Project 1', src: '/Gallery-pic/1.jpg' },
        { title: 'Construction Project 2', src: '/Gallery-pic/3-g.jpg' },
        { title: 'Construction Project 3', src: '/Gallery-pic/6.jpg' },
        { title: 'Construction Project 4', src: '/Gallery-pic/7.jpg' },
        { title: 'Construction Project 5', src: '/Gallery-pic/9-g.jpg' },
        { title: 'Construction Project 6', src: '/Gallery-pic/11.jpg' },
        { title: 'Construction Project 7', src: '/Gallery-pic/12-g.jpg' },
        { title: 'Construction Project 8', src: '/Gallery-pic/13.jpg' },
        { title: 'Construction Project 9', src: '/Gallery-pic/14-g.jpg' },
        { title: 'Construction Project 10', src: '/Gallery-pic/15.jpg' },
        { title: 'Construction Project 11', src: '/Gallery-pic/18.jpg' },
        { title: 'Construction Project 12', src: '/Gallery-pic/19.jpg' },
        { title: 'Construction Project 13', src: '/Gallery-pic/21.jpg' },
        { title: 'Construction Project 14', src: '/Gallery-pic/22-g.jpg' },
        { title: 'Construction Project 15', src: '/Gallery-pic/23.jpg' },
        { title: 'Construction Project 16', src: '/Gallery-pic/24.jpg' },
        { title: 'Construction Project 17', src: '/Gallery-pic/26.jpg' },
        { title: 'Construction Project 18', src: '/Gallery-pic/28-g.jpg' },
        { title: 'Construction Project 19', src: '/Gallery-pic/29-g.jpg' },
        { title: 'Construction Project 20', src: '/Gallery-pic/30.jpg' },
        { title: 'Construction Project 21', src: '/Gallery-pic/31.jpg' },
        { title: 'Construction Project 22', src: '/Gallery-pic/32.jpg' },
        { title: 'Construction Project 23', src: '/Gallery-pic/33.jpg' },
        { title: 'Construction Project 24', src: '/Gallery-pic/34.jpg' },
        { title: 'Construction Project 25', src: '/Gallery-pic/35.jpg' },
        { title: 'Construction Project 26', src: '/Gallery-pic/36.jpg' },
        { title: 'Construction Project 27', src: '/Gallery-pic/37.jpg' },
        { title: 'Construction Project 28', src: '/Gallery-pic/38.jpg' },
        { title: 'Construction Project 29', src: '/Gallery-pic/40.jpg' },
        { title: 'Construction Project 30', src: '/Gallery-pic/41.jpg' },
    ];

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
                    <p className="text-xl text-gray-700 max-w-6xl mx-auto leading-relaxed">
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
