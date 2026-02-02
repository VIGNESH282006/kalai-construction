'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc: string;
    mobileMediaSrc?: string;
    posterSrc?: string;
    bgImageSrc: string;
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    mobileMediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
    }, [mediaType]);

    // Scroll-based zoom effect - allows normal page scrolling
    useEffect(() => {
        const handleScroll = (): void => {
            if (!sectionRef.current) return;

            const scrollY = window.scrollY;
            const sectionHeight = sectionRef.current.offsetHeight;
            // Calculate progress based on how much we've scrolled through the hero section
            // Use a smaller portion of the section height for faster zoom completion
            const zoomScrollDistance = sectionHeight * 0.4; // Zoom completes at 40% of section height
            const progress = Math.min(Math.max(scrollY / zoomScrollDistance, 0), 1);

            setScrollProgress(progress);

            if (progress >= 1) {
                setShowContent(true);
            } else if (progress < 0.75) {
                setShowContent(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call to set correct state on mount
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // 16:9 aspect ratio - starts larger, expands moderately to reduce cropping
    const mediaWidth = 700 + scrollProgress * (isMobileState ? 250 : 900);
    const mediaHeight = (isMobileState ? 600 : 394) + scrollProgress * (isMobileState ? 450 : 506);
    const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

    const firstWord = title ? title.split(' ')[0] : '';
    const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

    // Use mobile video source if available and on mobile
    const currentMediaSrc = isMobileState && mobileMediaSrc ? mobileMediaSrc : mediaSrc;

    return (
        <div
            ref={sectionRef}
            className='transition-colors duration-700 ease-in-out overflow-x-hidden'
        >
            <section className='relative flex flex-col items-center justify-start min-h-dvh pt-20'>
                <div className='relative w-full flex flex-col items-center min-h-dvh'>
                    <motion.div
                        className='absolute inset-0 z-0 h-full'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 - scrollProgress }}
                        transition={{ duration: 0.1 }}
                    >
                        <Image
                            src={bgImageSrc}
                            alt='Background'
                            width={1920}
                            height={1080}
                            className='w-screen h-screen'
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            priority
                        />
                        <div className='absolute inset-0 bg-black/10 backdrop-blur-[3px]' />
                    </motion.div>

                    <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
                        <div className='flex flex-col items-center justify-center w-full h-dvh relative'>
                            <div
                                className='absolute z-0 top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                                style={{
                                    width: `${mediaWidth}px`,
                                    height: `${mediaHeight}px`,
                                    maxWidth: '95vw',
                                    maxHeight: '85vh',
                                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {mediaType === 'video' ? (
                                    currentMediaSrc.includes('youtube.com') ? (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <iframe
                                                width='100%'
                                                height='100%'
                                                src={
                                                    currentMediaSrc.includes('embed')
                                                        ? currentMediaSrc +
                                                        (currentMediaSrc.includes('?') ? '&' : '?') +
                                                        'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                                                        : currentMediaSrc.replace('watch?v=', 'embed/') +
                                                        '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                                                        currentMediaSrc.split('v=')[1]
                                                }
                                                className='w-full h-full rounded-xl'
                                                frameBorder='0'
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                allowFullScreen
                                            />
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'none' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30 rounded-xl backdrop-blur-[5px]'
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    ) : (
                                        <div className='relative w-full h-full pointer-events-none'>
                                            <video
                                                src={currentMediaSrc}
                                                poster={posterSrc}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload='auto'
                                                className='w-full h-full object-cover rounded-xl'
                                                controls={false}
                                                disablePictureInPicture
                                                disableRemotePlayback
                                            />
                                            <div
                                                className='absolute inset-0 z-10'
                                                style={{ pointerEvents: 'none' }}
                                            ></div>

                                            <motion.div
                                                className='absolute inset-0 bg-black/30 rounded-xl backdrop-blur-[5px]'
                                                initial={{ opacity: 0.7 }}
                                                animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <div className='relative w-full h-full'>
                                        <Image
                                            src={mediaSrc}
                                            alt={title || 'Media content'}
                                            width={1280}
                                            height={720}
                                            className='w-full h-full object-cover rounded-xl'
                                        />

                                        <motion.div
                                            className='absolute inset-0 bg-black/50 rounded-xl backdrop-blur-[5px]'
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    </div>
                                )}

                                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                                    {date && (
                                        <p
                                            className='text-3xl md:text-4xl font-semibold text-blue-200'
                                            style={{ transform: `translateX(-${textTranslateX}vw)` }}
                                        >
                                            {date}
                                        </p>
                                    )}
                                    {scrollToExpand && (
                                        <p
                                            className='text-blue-200 font-medium text-center'
                                            style={{ transform: `translateX(${textTranslateX}vw)` }}
                                        >
                                            {scrollToExpand}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div
                                className='flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col mix-blend-normal'
                            >
                                <motion.h2
                                    className='text-4xl md:text-5xl lg:text-6xl font-bold transition-none'
                                    style={{
                                        transform: `translateX(-${textTranslateX}vw)`,
                                        color: '#1A124B',
                                        textShadow: '0 2px 4px rgba(16, 2, 2, 0.2), 0 1px 2px rgba(16, 2, 2, 0.2)'
                                    }}
                                >
                                    {firstWord}
                                </motion.h2>
                                <motion.h2
                                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-none'
                                    style={{
                                        transform: `translateX(${textTranslateX}vw)`,
                                        color: '#1A124B',
                                        textShadow: '0 2px 4px rgba(16, 2, 2, 0.2), 0 1px 2px rgba(16, 2, 2, 0.2)'
                                    }}
                                >
                                    {restOfTitle}
                                </motion.h2>
                            </div>
                        </div>

                        <motion.section
                            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showContent ? 1 : 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {children}
                        </motion.section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
