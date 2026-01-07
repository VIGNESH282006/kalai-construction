'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Navbar } from '@/components/ui/navbar';
import { AboutSection } from '@/components/ui/about-section';
import CoreValueStats, { CoreStat } from '@/components/ui/core-value-stats';

import { WhyChooseUs } from '@/components/ui/why-choose-us';
import Testimonials from '@/components/ui/testimonials';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

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
      image: "/images/experience-bg-bright.png"
    },
    {
      value: 30,
      suffix: "+",
      label: "Our Team",
      description: "A dedicated team of skilled professionals committed to quality craftsmanship.",
      image: "/images/our-team-bg-bright.png"
    },
    {
      value: 100,
      suffix: "%",
      label: "Quality Products",
      description: "We use only premium-grade materials for lasting durability and finish.",
      image: "/images/quality-products-bg-bright.png"
    },
    {
      value: 100,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Our clients' happiness is our top priority, delivering beyond expectations.",
      image: "/images/client-satisfaction-bg-bright.png"
    },
  ];



  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='/kalai.mp4'
        mobileMediaSrc='/kalai-construction-video.webm'
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



      {/* CRM App Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Manage Your Build From Anywhere</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the future of construction with our exclusive CRM App.
            Stay connected to your project 24/7 with real-time updates and complete transparency.
          </p>
        </div>
        <CircularTestimonials features={[
          {
            title: "Real-Time Project & Customer Updates",
            description: "Get instant updates on project progress, customer interactions, and status changes—so you’re always working with the latest information, without delays.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
          },
          {
            title: "Live Notifications & Alerts",
            description: "Receive real-time alerts for new leads, task updates, approvals, and issues, ensuring nothing slips through the cracks.",
            image: "/images/mobile-notification-v2.png"
          },
          {
            title: "Instant Team Collaboration",
            description: "Changes made by one team member are reflected immediately for everyone—keeping teams aligned, responsive, and in sync at all times.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          },
          {
            title: "Live Dashboards & Performance Tracking",
            description: "Monitor sales, projects, and customer activity through live dashboards that update automatically as data changes.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
          }
        ]}
          autoplayInterval={3000}
        />
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}

