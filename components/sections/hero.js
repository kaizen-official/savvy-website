'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function HeroSection() {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);
    const preloaderRef = useRef(null);
    const subtitleRef = useRef(null);
    const titleRef = useRef(null);
    const dividerRef = useRef(null);
    const taglineRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([subtitleRef.current, titleRef.current, dividerRef.current, taglineRef.current, ctaRef.current, scrollRef.current], {
                opacity: 0,
                y: 60,
            });

            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(preloaderRef.current, { opacity: 1 });

            // Main timeline
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                delay: 0.5,
            });

            // Fade out preloader, fade in overlay
            tl.to(preloaderRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
            })
                .to(overlayRef.current, {
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                }, '-=0.5')

                // Subtitle animation
                .to(subtitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, '-=0.6')

                // Title animation with stagger effect on words
                .to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                }, '-=0.7')

                // Divider line animation
                .to(dividerRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                }, '-=0.8')
                .fromTo(dividerRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
                    '-=0.6'
                )

                // Tagline animation
                .to(taglineRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                }, '-=0.8')

                // CTA button animation
                .to(ctaRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                }, '-=0.6')

                // Scroll indicator
                .to(scrollRef.current, {
                    opacity: 0.7,
                    y: 0,
                    duration: 0.6,
                }, '-=0.3');

            // Subtle parallax on video
            // gsap.to(videoRef.current, {
            //     yPercent: 20,
            //     ease: 'none',
            //     scrollTrigger: {
            //         trigger: heroRef.current,
            //         start: 'top top',
            //         end: 'bottom top',
            //         scrub: true,
            //     },
            // });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
            {/* Preloader */}
            <div
                ref={preloaderRef}
                className="absolute inset-0 z-30 bg-black flex items-center justify-center"
            >
                <div className="w-12 h-12 border border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>

            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-110"
            >
                <source src="/hero-two.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="video-overlay absolute inset-0 z-10"
            ></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="hero-subtitle text-xs md:text-sm mb-6 text-white/80"
                    >
                        Premier Luxury Transportation
                    </p>

                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="hero-title text-4xl md:text-6xl lg:text-7xl text-white mb-8"
                    >
                        Where Professionalism
                        <br />
                        <span className="italic">Meets Luxury</span>
                    </h1>

                    {/* Divider */}
                    <div
                        ref={dividerRef}
                        className="divider-line w-24 h-px mx-auto mb-8 origin-center"
                    ></div>

                    {/* Tagline */}
                    <p
                        ref={taglineRef}
                        className="hero-tagline text-sm md:text-base lg:text-lg text-white/70 max-w-2xl mx-auto mb-12"
                    >
                        A sanctuary of calm and reliability for those who value their time,
                        safety, and comfort above all else.
                    </p>

                    {/* CTA Button */}
                    <div ref={ctaRef}>
                        <a
                            href="/booking"
                            className="btn-primary inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs md:text-sm"
                        >
                            <span>Reserve Your Journey</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div
                ref={scrollRef}
                className="scroll-indicator absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-2 text-white/60"
            >
                <span className="font-lato text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <svg
                    width="16"
                    height="24"
                    viewBox="0 0 16 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <rect x="1" y="1" width="14" height="22" rx="7" strokeOpacity="0.5" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.8">
                        <animate
                            attributeName="cy"
                            values="8;14;8"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            </div> */}

            {/* Side Brand Mark */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-16 bg-white/20"></div>
                    <span
                        className="font-lato text-[10px] tracking-[0.3em] text-white/40 uppercase rotate-180"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        Savvy Chauffeur
                    </span>
                    <div className="w-px h-16 bg-white/20"></div>
                </div>
            </div>

            {/* Right Side - Established */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-16 bg-white/20"></div>
                    <span
                        className="font-lato text-[10px] tracking-[0.3em] text-white/40 uppercase"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        Est. New Zealand
                    </span>
                    <div className="w-px h-16 bg-white/20"></div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;