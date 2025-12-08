'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Navbar } from '@/components/ui/navbar';
import { AboutSection } from '@/components/ui/about-section';
import CoreValueStats, { CoreStat } from '@/components/ui/core-value-stats';
import { FeatureSteps } from '@/components/ui/feature-section';
import { WhyChooseUs } from '@/components/ui/why-choose-us';
import Testimonials from '@/components/ui/testimonials';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  const stats: CoreStat[] = [
    {
      value: 15,
      suffix: "+",
      label: "Years of Experience",
      description: "Over 15 years of excellence in building construction across Tamil Nadu.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
    },
    {
      value: 30,
      suffix: "+",
      label: "Our Team",
      description: "A dedicated team of skilled professionals committed to quality craftsmanship.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
    },
    {
      value: 100,
      suffix: "%",
      label: "Quality Products",
      description: "We use only premium-grade materials for lasting durability and finish.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      value: 100,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Our clients' happiness is our top priority, delivering beyond expectations.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
    },
  ];

  const features = [
    {
      step: "Feature 1",
      title: "Quality",
      content: "We deliver exceptional quality in every project, using premium materials and skilled craftsmanship to ensure your construction stands the test of time.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
    },
    {
      step: "Feature 2",
      title: "Trust",
      content: "With over 15 years of experience, we've built lasting relationships with our clients through transparency, reliability, and consistent delivery on our promises.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
    },
    {
      step: "Feature 3",
      title: "Innovation",
      content: "We embrace modern construction techniques and innovative designs, bringing creative solutions that maximize space, efficiency, and aesthetic appeal.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
    },
    {
      step: "Feature 4",
      title: "Best Support",
      content: "Our dedicated team provides end-to-end support from planning to completion, ensuring smooth communication and addressing your needs at every stage.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop"
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='/kalai.mp4'
        bgImageSrc='https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop'
        date='Since 2010'
        scrollToExpand='Scroll to Explore'
        textBlend={true}
      />

      {/* About Section */}
      <AboutSection />

      {/* Stats Section - Our Achievements */}
      <CoreValueStats
        title="Our Achievements"
        subtitle="Why Choose Us"
        description="Numbers that speak for our commitment to excellence in construction"
        stats={stats}
      />

      {/* Features Section */}
      <FeatureSteps
        title="Our Features"
        features={features}
        autoPlayInterval={5000}
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}

