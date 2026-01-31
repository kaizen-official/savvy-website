'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ServicesSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    const services = [
        {
            id: 'corporate',
            title: 'Corporate Travel',
            description: 'Seamless executive transportation for business professionals. We understand the demands of corporate schedules and deliver punctual, discreet service that allows you to prepare, decompress, or simply enjoy the journey.',
            features: ['Dedicated Account Management', 'Real-time Flight Monitoring', 'Wi-Fi Enabled Vehicles', 'Invoiced Billing'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12v4M8 12v4M16 12v4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'airport',
            title: 'Airport Transfers',
            description: 'Your journey begins the moment you land. We track your flight in real-time, ensuring a chauffeur awaits you regardless of delays. Experience a stress-free transition from terminal to destination.',
            features: ['Flight Tracking', 'Meet & Greet Service', 'Luggage Assistance', 'Complimentary Wait Time'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M21 16v-2a4 4 0 00-4-4H7l-4 4m0 0l4 4m-4-4h18" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 8l2-4h10l2 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'occasions',
            title: 'Weddings & Events',
            description: 'Make your special day extraordinary. Our immaculate vehicles and impeccably presented chauffeurs provide the elegance and reliability your milestone moments deserve.',
            features: ['Decorated Vehicles', 'Red Carpet Service', 'Champagne on Request', 'Photography Stops'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'tours',
            title: 'Private Tours',
            description: 'Discover the city through the eyes of those who know it best. Whether a bespoke itinerary or a leisurely exploration, we curate journeys that transform transit into experience.',
            features: ['Customized Itineraries', 'Local Expertise', 'Full-Day Availability', 'Multi-City Options'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 2a8 8 0 018 8c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 018-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
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
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Cards animation
            cardsRef.current.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16 lg:mb-24">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                        Our Services
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                        Tailored to Your Journey
                    </h2>
                    <div className="w-16 h-px bg-black/20 mx-auto mb-6"></div>
                    <p className="font-lato text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
                        Every journey is unique. We offer a comprehensive suite of services designed
                        to meet the distinct needs of our discerning clientele.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group relative bg-gray-100 border border-gray-100 shadow-md hover:shadow-lg p-8 lg:p-10 transition-all duration-500 hover:bg-black hover:border-black"
                        >
                            {/* Icon */}
                            <div className="text-black/30 group-hover:text-white/50 transition-colors duration-500 mb-6">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-bodoni text-xl lg:text-2xl text-black group-hover:text-white transition-colors duration-500 mb-4">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="font-lato text-sm text-black/60 group-hover:text-white/70 transition-colors duration-500 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-8">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <span className="w-1 h-1 bg-black/30 group-hover:bg-white/50 transition-colors duration-500"></span>
                                        <span className="font-lato text-xs text-black/50 group-hover:text-white/60 transition-colors duration-500 tracking-wide">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href={`/services#${service.id}`}
                                className="inline-flex items-center gap-2 font-lato text-xs tracking-[0.15em] uppercase text-black/70 group-hover:text-white transition-colors duration-500"
                            >
                                <span>Learn More</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                                <div className="absolute top-0 right-0 w-px h-8 bg-black/10 group-hover:bg-white/20 transition-colors duration-500"></div>
                                <div className="absolute top-0 right-0 w-8 h-px bg-black/10 group-hover:bg-white/20 transition-colors duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 lg:mt-24">
                    <p className="font-lato text-sm text-black/50 mb-6">
                        Not sure which service suits your needs?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-lato text-xs tracking-widest uppercase transition-all duration-400 hover:bg-neutral-800"
                    >
                        <span>Speak With Our Team</span>
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

export default ServicesSection;