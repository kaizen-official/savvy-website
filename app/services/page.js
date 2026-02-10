'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
    const heroRef = useRef(null);
    const servicesRef = useRef(null);
    const processRef = useRef(null);
    const ctaRef = useRef(null);

    const services = [
        {
            id: 'airport',
            title: 'Airport Transfers',
            description: 'Seamless journeys to and from Auckland Airport with flight tracking, meet-and-greet service, and complimentary waiting time for delays.',
            features: ['Real-time Flight Monitoring', 'Meet & Greet Service', 'Luggage Assistance', 'Fixed Pricing'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16v-2a4 4 0 00-4-4H4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 10l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 20h18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'corporate',
            title: 'Corporate Travel',
            description: 'Professional chauffeur services tailored for business executives. Reliable, discreet, and punctual transportation for all corporate needs.',
            features: ['Dedicated Account Manager', 'Priority Booking', 'Corporate Billing', 'Confidential Service'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'occasions',
            title: 'Special Events',
            description: 'Make your special occasions unforgettable with our premium event transportation. Weddings, galas, anniversaries, and celebrations.',
            features: ['Red Carpet Service', 'Decorated Vehicles', 'Flexible Scheduling', 'Multiple Vehicle Options'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'hourly-charter',
            title: 'Hourly Charter',
            description: 'Flexible hourly hire for shopping trips, business meetings, city tours, or when your schedule requires adaptability.',
            features: ['Minimum 2 Hours', 'Flexible Itinerary', 'Wait & Return', 'Multi-Stop Journeys'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'intercity-transfers',
            title: 'Intercity Transfers',
            description: 'Comfortable long-distance travel between cities. Relax in luxury while we handle the journey across New Zealand.',
            features: ['Auckland to Wellington', 'Auckland to Hamilton', 'Scenic Routes Available', 'Refreshments Included'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 'vip',
            title: 'VIP Concierge',
            description: 'Complete lifestyle management including restaurant reservations, event tickets, and personalised travel arrangements.',
            features: ['Personal Assistant', 'Restaurant Bookings', 'Event Access', '24/7 Availability'],
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Book',
            description: 'Reserve your vehicle online, by phone, or through our website with instant confirmation.',
        },
        {
            step: '02',
            title: 'Confirm',
            description: 'Receive detailed trip information and your chauffeur\'s details before your journey.',
        },
        {
            step: '03',
            title: 'Travel',
            description: 'Your chauffeur arrives early, ready to provide an impeccable travel experience.',
        },
        {
            step: '04',
            title: 'Arrive',
            description: 'Reach your destination relaxed, refreshed, and precisely on time.',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.fromTo(
                heroRef.current.querySelectorAll('.hero-animate'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );

            // Services animation
            if (servicesRef.current) {
                gsap.fromTo(
                    servicesRef.current.querySelectorAll('.service-card'),
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: servicesRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Process animation
            if (processRef.current) {
                gsap.fromTo(
                    processRef.current.querySelectorAll('.process-step'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: processRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }

            // CTA animation
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current.querySelectorAll('.cta-animate'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-black min-h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-16">
                    <p className="hero-animate font-lato text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
                        Our Services
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Tailored to
                        <br />
                        <span className="italic">Perfection</span>
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                        From airport transfers to corporate travel, we offer comprehensive
                        chauffeur services designed around your needs.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section ref={servicesRef} className="bg-white py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            What We Offer
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl text-black mb-6">
                            Premium Chauffeur Services
                        </h2>
                        <div className="w-16 h-px bg-black/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className="service-card bg-gray-50 shadow-md hover:shadow-xl group p-8 border border-neutral-200 hover:border-black transition-all duration-500"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 mb-6 flex items-center justify-center text-black/30 group-hover:text-black transition-colors duration-300">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="font-bodoni text-xl text-black mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="font-lato text-sm text-black/60 leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/30">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="font-lato text-xs text-black/50">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section ref={processRef} className="bg-black py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                            How It Works
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl text-white mb-6">
                            Simple, Seamless, Sophisticated
                        </h2>
                        <div className="w-16 h-px bg-white/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
                        {process.map((item, index) => (
                            <div
                                key={index}
                                className="process-step bg-black p-8 lg:p-10 group hover:bg-white/5 transition-colors duration-300"
                            >
                                <p className="font-bodoni text-5xl text-white/50 mb-4 group-hover:text-white/80 transition-colors">
                                    {item.step}
                                </p>
                                <h3 className="font-bodoni text-xl text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="font-lato text-sm text-white/50 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="bg-black py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="cta-animate font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                        Ready to Experience the Difference?
                    </p>
                    <h2 className="cta-animate font-bodoni text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                        Book Your Journey Today
                    </h2>
                    <p className="cta-animate font-lato text-base text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                        Whether it's a crucial business meeting or a special celebration,
                        let us provide the transportation experience you deserve.
                    </p>
                    <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/booking"
                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors duration-300"
                        >
                            <span>Book Now</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="tel:+64212080749"
                            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Call Us</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesPage;