'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function SliderSection() {
    const sliderRef = useRef(null);
    const trackRef = useRef(null);

    const services = [
        {
            id: 1,
            title: 'Corporate Travel',
            subtitle: 'Executive Excellence',
            image: '/services/one.jpg',
        },
        {
            id: 2,
            title: 'Airport Transfers',
            subtitle: 'Seamless Arrivals',
            image: '/services/two.jpg',
        },
        {
            id: 3,
            title: 'Weddings',
            subtitle: 'Timeless Elegance',
            image: '/services/three.jpg',
        },
        {
            id: 4,
            title: 'Private Tours',
            subtitle: 'Bespoke Journeys',
            image: '/services/four.jpg',
        }
    ];

    // Duplicate for seamless loop
    const duplicatedServices = [...services, ...services];

    useEffect(() => {
        const track = trackRef.current;
        const slides = track.children;
        const slideWidth = slides[0].offsetWidth;
        const totalWidth = slideWidth * services.length;

        // Set initial position
        gsap.set(track, { x: 0 });

        // Create infinite scroll animation
        const tl = gsap.to(track, {
            x: -totalWidth,
            duration: 20,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
            },
        });

        // Pause on hover
        const handleMouseEnter = () => tl.timeScale(0.5);
        const handleMouseLeave = () => tl.timeScale(1);

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            tl.kill();
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [services.length]);

    return (
        <section ref={sliderRef} className="bg-black py-16 lg:py-20 overflow-hidden">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-12 lg:mb-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                            What We Offer
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-white">
                            Our Services
                        </h2>
                    </div>
                    <p className="font-lato text-sm text-white/50 max-w-md leading-relaxed">
                        From executive travel to milestone celebrations, we deliver excellence across every journey.
                    </p>
                </div>
            </div>

            {/* Slider Track */}
            <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>

                {/* Track */}
                <div
                    ref={trackRef}
                    className="flex gap-6 cursor-grab active:cursor-grabbing"
                    style={{ width: 'max-content' }}
                >
                    {duplicatedServices.map((service, index) => (
                        <div
                            key={`${service.id}-${index}`}
                            className="group relative w-70 md:w-[320px] lg:w-95 shrink-0"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-3/4 overflow-hidden bg-neutral-900">
                                {/* Placeholder gradient - replace with actual images */}
                                <div
                                    className="absolute inset-0 bg-linear-to-br from-neutral-800 to-neutral-900"
                                    style={{
                                        backgroundImage: `url(${service.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                                    {/* Number */}
                                    <span className="font-lato text-xs text-white/30 tracking-widest mb-2">
                                        0{service.id}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-bodoni text-xl lg:text-2xl text-white mb-1 transform group-hover:-translate-y-1 transition-transform duration-500">
                                        {service.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="font-lato text-xs text-white/60 tracking-wide uppercase">
                                        {service.subtitle}
                                    </p>

                                    {/* Hover Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/0 group-hover:bg-white/30 transition-all duration-500"></div>
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="text-white/60"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Accent */}
            {/* <div className="max-w-7xl mx-auto px-6 mt-12 lg:mt-16">
                <div className="flex items-center justify-between">
                    <div className="w-16 h-px bg-white/10"></div>
                    <p className="font-lato text-[10px] tracking-[0.3em] uppercase text-white/30">
                        Hover to pause
                    </p>
                    <div className="w-16 h-px bg-white/10"></div>
                </div>
            </div> */}
        </section>
    );
}

export default SliderSection;