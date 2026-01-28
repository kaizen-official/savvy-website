'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function WhyChooseUsSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const featuresRef = useRef([]);
    const statsRef = useRef(null);

    const features = [
        {
            id: 1,
            title: 'Uncompromised Safety',
            description:
                'The wellbeing of our passengers is absolute. We prioritize rigorous vehicle maintenance, defensive driving protocols, and complete discretion.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 2,
            title: 'Disciplined Professionalism',
            description:
                'True luxury lies in discipline. Impeccable punctuality, pristine presentation, and precise execution of every route. Always prepared.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 3,
            title: 'Ultra-Luxury Experience',
            description:
                'We do not just offer a seat; we offer an atmosphere. Every detail is curated to evoke high-end exclusivity and refined comfort.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: 4,
            title: 'Personalized Service',
            description:
                'No two journeys are alike. We adapt to your unique needs—whether that requires conversation, complete silence, or specific amenities.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    const stats = [
        { value: '15+', label: 'Years of Excellence' },
        { value: '50K+', label: 'Journeys Completed' },
        { value: '99%', label: 'Client Satisfaction' },
        { value: '24/7', label: 'Availability' },
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

            // Features animation
            featuresRef.current.forEach((feature, index) => {
                gsap.fromTo(
                    feature,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: feature,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Stats animation
            gsap.fromTo(
                statsRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16 lg:mb-20">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                        Why Choose Us
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                        The Savvy Difference
                    </h2>
                    <div className="w-16 h-px bg-black/20 mx-auto mb-6"></div>
                    <p className="font-lato text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
                        We bridge the gap between necessary transit and an extraordinary experience,
                        serving those who value their time, safety, and comfort above all else.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-28">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            ref={(el) => (featuresRef.current[index] = el)}
                            className="group flex gap-6"
                        >
                            {/* Icon */}
                            <div className="shrink-0 w-14 h-14 bg-white border border-black/10 flex items-center justify-center text-black/40 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-bodoni text-xl lg:text-2xl text-black mb-3">
                                    {feature.title}
                                </h3>
                                <p className="font-lato text-sm text-black/60 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="relative">
                    {/* Background accent */}
                    <div className="absolute inset-0 bg-black"></div>

                    <div
                        ref={statsRef}
                        className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10"
                    >
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-black px-6 py-10 lg:py-12 text-center"
                            >
                                <p className="font-bodoni text-3xl lg:text-4xl text-white mb-2">
                                    {stat.value}
                                </p>
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-white/50">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUsSection;
