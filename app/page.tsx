'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Navbar } from '@/components/ui/navbar';
import Testimonials from '@/components/ui/testimonials';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

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
      >
        <div className='max-w-6xl mx-auto space-y-16'>
          {/* Company Overview */}
          <section className='space-y-6'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
              Welcome to Kalai Construction
            </h2>
            <p className='text-xl text-gray-700 leading-relaxed'>
              For over a decade, Kalai Construction has been at the forefront of building excellence,
              transforming visions into reality across residential, commercial, and industrial sectors.
              Our commitment to quality craftsmanship, innovative design, and timely delivery has made
              us a trusted partner for construction projects of all scales.
            </p>
          </section>

          {/* Services Grid */}
          <section className='space-y-8'>
            <h3 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Our Services
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {/* Service 1 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Residential Construction</h4>
                <p className='text-gray-700'>
                  Custom homes built with precision and care. From modern villas to traditional houses,
                  we bring your dream home to life with exceptional attention to detail.
                </p>
              </div>

              {/* Service 2 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Commercial Projects</h4>
                <p className='text-gray-700'>
                  Office buildings, retail spaces, and commercial complexes designed for functionality
                  and aesthetics. We deliver projects that enhance business environments.
                </p>
              </div>

              {/* Service 3 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Renovations & Remodeling</h4>
                <p className='text-gray-700'>
                  Transform existing spaces with our renovation expertise. From minor updates to complete
                  overhauls, we breathe new life into old structures.
                </p>
              </div>

              {/* Service 4 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Project Management</h4>
                <p className='text-gray-700'>
                  Comprehensive project management services ensuring your construction stays on schedule,
                  within budget, and meets the highest quality standards.
                </p>
              </div>

              {/* Service 5 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Design & Planning</h4>
                <p className='text-gray-700'>
                  Expert architectural design and planning services that blend aesthetics with functionality,
                  creating spaces that inspire and perform.
                </p>
              </div>

              {/* Service 6 */}
              <div className='bg-gray-900/5 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:bg-gray-900/10 transition-all duration-300'>
                <div className='w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold text-gray-900 mb-3'>Quality Assurance</h4>
                <p className='text-gray-700'>
                  Rigorous quality control at every stage ensures that our constructions meet and exceed
                  industry standards and client expectations.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className='space-y-8'>
            <h3 className='text-3xl md:text-4xl font-bold text-gray-900'>
              Why Choose Kalai Construction?
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>✓</span>
                </div>
                <div>
                  <h4 className='text-xl font-semibold text-gray-900 mb-2'>Experienced Team</h4>
                  <p className='text-gray-700'>Over 15 years of combined experience in construction and project management</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>✓</span>
                </div>
                <div>
                  <h4 className='text-xl font-semibold text-gray-900 mb-2'>Quality Materials</h4>
                  <p className='text-gray-700'>We use only premium, certified materials for lasting durability</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>✓</span>
                </div>
                <div>
                  <h4 className='text-xl font-semibold text-gray-900 mb-2'>On-Time Delivery</h4>
                  <p className='text-gray-700'>98% of our projects are completed on or ahead of schedule</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-2xl'>✓</span>
                </div>
                <div>
                  <h4 className='text-xl font-semibold text-gray-900 mb-2'>Competitive Pricing</h4>
                  <p className='text-gray-700'>Transparent pricing with no hidden costs or surprises</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ScrollExpandMedia>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
