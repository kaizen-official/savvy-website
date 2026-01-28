'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NewHeader from '@/components/layout/newHeader';
import Footer from '@/components/layout/footer';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const missionRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);

    const values = [
        {
            number: '01',
            title: 'Uncompromised Safety',
            description: 'The wellbeing of our passengers is absolute. We prioritize rigorous vehicle maintenance, defensive driving protocols, and complete discretion. Our clients must feel secure the moment they see our vehicle.',
        },
        {
            number: '02',
            title: 'Disciplined Professionalism',
            description: 'We believe that true luxury lies in discipline. This means impeccable punctuality, pristine presentation, and the precise execution of every route. We are reliable, consistent, and always prepared.',
        },
        {
            number: '03',
            title: 'Ultra-Luxury Experience',
            description: 'We do not just offer a seat; we offer an atmosphere. From the climate control to the greeting, every detail is curated to evoke a sense of high-end exclusivity and refined comfort.',
        },
        {
            number: '04',
            title: 'Personalized Service',
            description: 'No two journeys are alike. We adapt to the unique needs of our clients—whether that requires a conversation, complete silence, or specific amenities. We are attentive without being intrusive.',
        },
    ];

    const team = [
        {
            name: 'Alexander Wright',
            role: 'Founder & Managing Director',
            image: '/team/founder.jpg',
        },
        {
            name: 'Victoria Chen',
            role: 'Director of Operations',
            image: '/team/operations.jpg',
        },
        {
            name: 'Marcus Thompson',
            role: 'Head of Client Relations',
            image: '/team/relations.jpg',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            gsap.fromTo(
                heroRef.current.querySelectorAll('.hero-animate'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );

            // Story section
            gsap.fromTo(
                storyRef.current.querySelectorAll('.story-animate'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: 'top 75%',
                    },
                }
            );

            // Mission section
            gsap.fromTo(
                missionRef.current.querySelectorAll('.mission-animate'),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            // Values animation
            gsap.fromTo(
                valuesRef.current.querySelectorAll('.value-card'),
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: 'top 75%',
                    },
                }
            );

            // Team animation
            gsap.fromTo(
                teamRef.current.querySelectorAll('.team-card'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: teamRef.current,
                        start: 'top 75%',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main>
            <section ref={heroRef} className="relative bg-black min-h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
                    <p className="hero-animate font-lato text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
                        Our Story
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-7xl text-white mb-8 leading-tight">
                        Where Professionalism
                        <br />
                        <span className="italic">Meets Luxury</span>
                    </h1>
                    <div className="hero-animate w-20 h-px bg-white/30 mx-auto mb-8"></div>
                    <p className="hero-animate font-lato text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        A premier transportation provider dedicated to seamless travel experiences
                        for those who demand excellence in every journey.
                    </p>
                </div>

                {/* Scroll indicator */}
                {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
                    <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent"></div>
                </div> */}
            </section>

            {/* Story Section */}
            <section ref={storyRef} className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Image */}
                        <div className="story-animate relative">
                            <div className="aspect-4/5 bg-neutral-100 overflow-hidden">
                                <div
                                    className="w-full h-full bg-linear-to-br from-neutral-200 to-neutral-300"
                                    style={{
                                        backgroundImage: 'url(/services/three.jpg)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            </div>
                            {/* Accent */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-black/10 -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-black -z-10"></div>
                        </div>

                        {/* Content */}
                        <div>
                            <p className="story-animate font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                                The Beginning
                            </p>
                            <h2 className="story-animate font-bodoni text-3xl md:text-4xl lg:text-5xl text-black mb-8">
                                A Vision for Excellence
                            </h2>
                            <div className="story-animate w-16 h-px bg-black/20 mb-8"></div>
                            <div className="space-y-6">
                                <p className="story-animate font-lato text-base text-black/70 leading-relaxed">
                                    Savvy Chauffeur was founded on a simple yet profound belief: that travel should
                                    never be a source of stress, but rather a seamless extension of the luxury
                                    lifestyle our clients have cultivated.
                                </p>
                                <p className="story-animate font-lato text-base text-black/70 leading-relaxed">
                                    We recognized that discerning individuals—executives, entrepreneurs, and those
                                    who value their time—deserved more than conventional transportation. They
                                    deserved a sanctuary on wheels, where every detail from the temperature to
                                    the silence is curated for their comfort.
                                </p>
                                <p className="story-animate font-lato text-base text-black/70 leading-relaxed">
                                    Today, we continue to uphold these founding principles, serving clients across
                                    London and beyond with the same dedication to excellence that has defined us
                                    from the very beginning.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section ref={missionRef} className="bg-black py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Mission */}
                        <div className="mission-animate">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/60">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </div>
                                <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40">Our Mission</p>
                            </div>
                            <h3 className="font-bodoni text-2xl lg:text-3xl text-white mb-6">
                                Setting the Benchmark
                            </h3>
                            <p className="font-lato text-base text-white/60 leading-relaxed">
                                To set the benchmark for refined, punctual, and personalized travel. We aim to
                                remove the stress of transit entirely, providing a service where the passenger's
                                safety and comfort are anticipated before they even step into the vehicle.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="mission-animate">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-white/60">
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </div>
                                <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40">Our Vision</p>
                            </div>
                            <h3 className="font-bodoni text-2xl lg:text-3xl text-white mb-6">
                                The Undisputed Leader
                            </h3>
                            <p className="font-lato text-base text-white/60 leading-relaxed">
                                To be the undisputed leader in ultra-luxury ground transportation, recognized
                                not just for our premium fleet, but for the discipline and distinctive character
                                of our service that sets us apart from all others.
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-6 my-20">
                        <div className="w-24 h-px bg-white/10"></div>
                        <div className="w-2 h-2 bg-white/20 rotate-45"></div>
                        <div className="w-24 h-px bg-white/10"></div>
                    </div>

                    {/* Quote */}
                    <div className="max-w-3xl mx-auto text-center">
                        <blockquote className="font-bodoni text-xl md:text-2xl lg:text-3xl text-white italic leading-relaxed mb-8">
                            "We bridge the gap between necessary transit and an extraordinary experience,
                            serving those who value their time, safety, and comfort above all else."
                        </blockquote>
                        <p className="font-lato text-xs tracking-[0.2em] uppercase text-white/40">
                            — Our Founding Principle
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="bg-neutral-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16 lg:mb-20">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            What We Stand For
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                            Our Core Values
                        </h2>
                        <div className="w-16 h-px bg-black/20 mx-auto"></div>
                    </div>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value) => (
                            <div
                                key={value.number}
                                className="value-card group bg-white p-8 lg:p-10 border border-neutral-100 hover:border-black transition-colors duration-500"
                            >
                                <span className="font-lato text-xs tracking-widest text-black/30 mb-4 block">
                                    {value.number}
                                </span>
                                <h3 className="font-bodoni text-xl lg:text-2xl text-black mb-4">
                                    {value.title}
                                </h3>
                                <p className="font-lato text-sm text-black/60 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* <section ref={teamRef} className="bg-white py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 lg:mb-20">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            The People Behind Savvy
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-black mb-6">
                            Leadership Team
                        </h2>
                        <div className="w-16 h-px bg-black/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {team.map((member) => (
                            <div key={member.name} className="team-card group text-center">
                                <div className="relative aspect-3/4 mb-6 overflow-hidden bg-neutral-100">
                                    <div
                                        className="w-full h-full bg-linear-to-br from-neutral-200 to-neutral-300 transition-transform duration-700 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url(${member.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                </div>
                                <h3 className="font-bodoni text-xl text-black mb-1">
                                    {member.name}
                                </h3>
                                <p className="font-lato text-xs tracking-wide text-black/50 uppercase">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="bg-black py-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                        Ready to Experience the Difference?
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-white mb-8">
                        Begin Your Journey With Us
                    </h2>
                    <p className="font-lato text-base text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                        Whether it is your daily commute, a special occasion, or an important business meeting,
                        let us provide the seamless, luxurious experience you deserve.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/booking"
                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors duration-300"
                        >
                            <span>Book a Journey</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span>Contact Us</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AboutPage;