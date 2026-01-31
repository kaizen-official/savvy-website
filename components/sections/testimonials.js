'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TestimonialsSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            quote:
                'Savvy Chauffeur has transformed how I approach business travel. The attention to detail and unwavering punctuality allows me to focus entirely on my work. A truly exceptional service.',
            author: 'James Thornton',
            title: 'Chief Executive Officer',
            company: 'Meridian Capital',
        },
        {
            id: 2,
            quote:
                'On our wedding day, every moment mattered. The team delivered an impeccable experience—from the pristine vehicle to the gracious chauffeur. They made our arrival unforgettable.',
            author: 'Elizabeth & Michael',
            title: 'Wedding Clients',
            company: 'London, 2025',
        },
        {
            id: 3,
            quote:
                'I have used many executive car services across Europe, but none compare to the level of professionalism and discretion offered by Savvy Chauffeur. They understand what true luxury means.',
            author: 'Dr. Sarah Mitchell',
            title: 'Private Client',
            company: 'Harley Street',
        },
        {
            id: 4,
            quote:
                'For our international executives visiting London, we trust only Savvy Chauffeur. Their reliability and sophistication reflect our own corporate standards perfectly.',
            author: 'Richard Hayes',
            title: 'Head of Operations',
            company: 'Sterling Partners LLP',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Slider animation
            gsap.fromTo(
                sliderRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sliderRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Auto-advance testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section ref={sectionRef} className="bg-black py-16 lg:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 lg:mb-20">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                        Testimonials
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                        Words From Our Clients
                    </h2>
                    <div className="w-16 h-px bg-white/20 mx-auto"></div>
                </div>

                {/* Testimonials Slider */}
                <div ref={sliderRef} className="relative max-w-4xl mx-auto">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-0 lg:left-12 text-white/5">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
                        </svg>
                    </div>

                    {/* Testimonial Content */}
                    <div className="relative min-h-75 lg:min-h-70">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`absolute inset-0 transition-all duration-700 ease-out ${index === activeIndex
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8 pointer-events-none'
                                    }`}
                            >
                                <div className="text-center px-4 lg:px-16">
                                    {/* Quote */}
                                    <blockquote className="font-bodoni text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-10 italic">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Author */}
                                    <div>
                                        <p className="font-lato text-sm font-medium text-white tracking-wide mb-1">
                                            {testimonial.author}
                                        </p>
                                        <p className="font-lato text-xs text-white/50">
                                            {testimonial.title}, {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-8 mt-12">
                        {/* Prev Button */}
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                            aria-label="Previous testimonial"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Indicators */}
                        <div className="flex items-center gap-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`transition-all duration-300 ${index === activeIndex
                                        ? 'w-8 h-1 bg-white'
                                        : 'w-2 h-1 bg-white/20 hover:bg-white/40'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                            aria-label="Next testimonial"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16 lg:mt-20">
                    <p className="font-lato text-sm text-white/50 mb-6">
                        Experience the difference for yourself
                    </p>
                    <a
                        href="/booking"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-lato text-xs tracking-widest uppercase transition-all duration-400 hover:bg-white/90"
                    >
                        <span>Book Your First Journey</span>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
