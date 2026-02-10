'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fleetData from './data.json';

gsap.registerPlugin(ScrollTrigger);

const amenityIcons = {
    wifi: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01M1 4v1a3 3 0 003 3h16a3 3 0 003-3V4M1 4h22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    water: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    charging: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    newspapers: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    tracking: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3a6 6 0 00-6 6c0 6 6 12 6 12s6-6 6-12a6 6 0 00-6-6z" />
            <circle cx="12" cy="9" r="2" />
        </svg>
    ),
    insurance: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

function FleetPage() {
    const heroRef = useRef(null);
    const introRef = useRef(null);
    const fleetRef = useRef(null);
    const [activeVehicle, setActiveVehicle] = useState(null);
    const [cardImageIndices, setCardImageIndices] = useState({});
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const vehicles = fleetData;

    // Reset modal image index when vehicle changes
    useEffect(() => {
        setModalImageIndex(0);
    }, [activeVehicle]);

    // Auto-slide for card images
    useEffect(() => {
        const interval = setInterval(() => {
            setCardImageIndices(prev => {
                const newIndices = { ...prev };
                vehicles.forEach(vehicle => {
                    const currentIndex = prev[vehicle.id] || 0;
                    const totalImages = vehicle.images.length;
                    newIndices[vehicle.id] = (currentIndex + 1) % totalImages;
                });
                return newIndices;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [vehicles]);

    // Auto-slide for modal images
    useEffect(() => {
        if (!activeVehicle) return;

        const interval = setInterval(() => {
            setModalImageIndex(prev => (prev + 1) % activeVehicle.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [activeVehicle]);

    const handleCardImageChange = (vehicleId, direction) => {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return;

        const currentIndex = cardImageIndices[vehicleId] || 0;
        const totalImages = vehicle.images.length;
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % totalImages;
        } else {
            newIndex = (currentIndex - 1 + totalImages) % totalImages;
        }

        setCardImageIndices(prev => ({ ...prev, [vehicleId]: newIndex }));
    };

    const handleModalImageChange = (direction) => {
        if (!activeVehicle) return;
        const totalImages = activeVehicle.images.length;

        if (direction === 'next') {
            setModalImageIndex((prev) => (prev + 1) % totalImages);
        } else {
            setModalImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
        }
    };

    const amenities = [
        {
            id: 'water',
            icon: amenityIcons.water,
            title: 'Bottled Water',
            description: 'Premium still and sparkling water provided on every journey.',
        },
        {
            id: 'charging',
            icon: amenityIcons.charging,
            title: 'Device Charging',
            description: 'USB and wireless charging available for all major devices.',
        },
        {
            id: 'tracking',
            icon: amenityIcons.tracking,
            title: 'Flight Tracking',
            description: 'Real-time monitoring ensures we are there when you land.',
        },
        {
            id: 'insurance',
            icon: amenityIcons.insurance,
            title: 'Full Insurance',
            description: 'Comprehensive coverage for complete peace of mind.',
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

            // Intro animation
            if (introRef.current) {
                gsap.fromTo(
                    introRef.current.querySelectorAll('.intro-animate'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: introRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }

            // Fleet cards animation
            if (fleetRef.current) {
                gsap.fromTo(
                    fleetRef.current.querySelectorAll('.fleet-card'),
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: fleetRef.current,
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
                        Our Fleet
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Vehicles of
                        <br />
                        <span className="italic">Distinction</span>
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                        A meticulously curated collection of premium vehicles, each maintained
                        to the highest standards of luxury and safety.
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section ref={introRef} className="bg-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <p className="intro-animate font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                                Excellence in Motion
                            </p>
                            <h2 className="intro-animate font-bodoni text-3xl md:text-4xl text-black mb-6">
                                Impeccably Maintained, Thoughtfully Selected
                            </h2>
                            <div className="intro-animate w-16 h-px bg-black/20 mb-6"></div>
                            <p className="intro-animate font-lato text-base text-black/70 leading-relaxed mb-6">
                                Every vehicle in our fleet represents the pinnacle of automotive craftsmanship.
                                We select only marques that embody our commitment to luxury, safety, and reliability.
                            </p>
                            <p className="intro-animate font-lato text-base text-black/70 leading-relaxed">
                                Our vehicles undergo rigorous daily inspections and regular professional detailing
                                to ensure they meet the exacting standards our clients expect.
                            </p>
                        </div>
                        <div className="intro-animate grid grid-cols-2 gap-4">
                            <div className="bg-black p-8 text-center">
                                <p className="font-bodoni text-4xl text-white mb-2">Daily</p>
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-white/50">Inspections</p>
                            </div>
                            <div className="bg-neutral-100 p-8 text-center">
                                <p className="font-bodoni text-4xl text-black mb-2">100%</p>
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/50">Fully Insured</p>
                            </div>
                            <div className="bg-neutral-100 p-8 text-center">
                                <p className="font-bodoni text-4xl text-black mb-2">Premium</p>
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/50">Quality</p>
                            </div>
                            <div className="bg-black p-8 text-center">
                                <p className="font-bodoni text-4xl text-white mb-2">24/7</p>
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-white/50">Availability</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Grid */}
            <section ref={fleetRef} className="bg-black py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                            Choose Your Vehicle
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl text-white">
                            Our Premium Collection
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className="fleet-card group bg-white border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 cursor-pointer"
                            >
                                {/* Image Slider */}
                                <div className="relative aspect-4/3 bg-neutral-200 overflow-hidden">
                                    {vehicle.images.map((img, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className="absolute inset-0 transition-opacity duration-500"
                                            style={{
                                                opacity: (cardImageIndices[vehicle.id] || 0) === imgIndex ? 1 : 0,
                                                backgroundImage: `url(${img})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        ></div>
                                    ))}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-black/80 text-white px-3 py-1 font-lato text-[10px] tracking-[0.15em] uppercase">
                                            {vehicle.category}
                                        </span>
                                    </div>

                                    {/* Slider Navigation */}
                                    {vehicle.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCardImageChange(vehicle.id, 'prev'); }}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCardImageChange(vehicle.id, 'next'); }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            {/* Dots Indicator */}
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                                                {vehicle.images.map((_, dotIndex) => (
                                                    <button
                                                        key={dotIndex}
                                                        onClick={(e) => { e.stopPropagation(); setCardImageIndices(prev => ({ ...prev, [vehicle.id]: dotIndex })); }}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${(cardImageIndices[vehicle.id] || 0) === dotIndex
                                                            ? 'bg-white w-4'
                                                            : 'bg-white/50 hover:bg-white/80'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6" onClick={() => setActiveVehicle(vehicle)}>
                                    <h3 className="font-bodoni text-xl text-black mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                        {vehicle.name}
                                    </h3>
                                    <p className="font-lato text-sm text-black/60 leading-relaxed mb-4 line-clamp-2">
                                        {vehicle.description}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex items-center gap-6 mb-4 pb-4 border-b border-neutral-100">
                                        <div className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/40">
                                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="font-lato text-xs text-black/50">{vehicle.passengers} Passengers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/40">
                                                <rect x="3" y="8" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="font-lato text-xs text-black/50">{vehicle.luggage} Bags</span>
                                        </div>
                                    </div>

                                    {/* View Details */}
                                    <div className="w-full flex items-center justify-center gap-2 py-3 font-lato text-xs tracking-[0.15em] uppercase text-black/70 group-hover:text-black transition-colors">
                                        <span>View Details</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            Standard Inclusions
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl text-black mb-6">
                            Every Journey Includes
                        </h2>
                        <div className="w-16 h-px bg-black/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black/10">
                        {amenities.map((amenity) => (
                            <div key={amenity.id} className="bg-white p-6 lg:p-8 text-center group hover:bg-neutral-50 transition-colors duration-300">
                                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-black/40 group-hover:text-black/60 transition-colors">
                                    {amenity.icon}
                                </div>
                                <h3 className="font-lato text-xs tracking-wide text-black mb-2">
                                    {amenity.title}
                                </h3>
                                <p className="font-lato text-[11px] text-black/40 leading-relaxed hidden lg:block">
                                    {amenity.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                        Ready to Travel in Style?
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                        Reserve Your Vehicle
                    </h2>
                    <p className="font-lato text-base text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                        Whether you need an executive sedan for a business meeting or an SUV for a family
                        airport transfer, we have the perfect vehicle for your journey.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                            href="/contact"
                            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span>Contact Us</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Vehicle Detail Modal */}
            {activeVehicle && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setActiveVehicle(null)}
                >
                    <div
                        className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveVehicle(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 flex items-center justify-center text-white hover:bg-black transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Image Slider */}
                        <div className="relative aspect-video bg-neutral-200 overflow-hidden">
                            {activeVehicle.images.map((img, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className="absolute inset-0 transition-opacity duration-500"
                                    style={{
                                        opacity: modalImageIndex === imgIndex ? 1 : 0,
                                        backgroundImage: `url(${img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                ></div>
                            ))}

                            {/* Navigation Arrows */}
                            {activeVehicle.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => handleModalImageChange('prev')}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 flex items-center justify-center text-black hover:bg-white transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleModalImageChange('next')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 flex items-center justify-center text-black hover:bg-white transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                                        {activeVehicle.images.map((_, dotIndex) => (
                                            <button
                                                key={dotIndex}
                                                onClick={() => setModalImageIndex(dotIndex)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${modalImageIndex === dotIndex
                                                    ? 'bg-white w-6'
                                                    : 'bg-white/50 hover:bg-white/80'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12">
                            <span className="font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2 block">
                                {activeVehicle.category}
                            </span>
                            <h3 className="font-bodoni text-2xl lg:text-3xl text-black mb-4">
                                {activeVehicle.name}
                            </h3>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-8">
                                {activeVehicle.description}
                            </p>

                            {/* Specs */}
                            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-neutral-100">
                                <div>
                                    <p className="font-bodoni text-2xl text-black">{activeVehicle.passengers}</p>
                                    <p className="font-lato text-xs text-black/50 uppercase tracking-wide">Passengers</p>
                                </div>
                                <div>
                                    <p className="font-bodoni text-2xl text-black">{activeVehicle.luggage}</p>
                                    <p className="font-lato text-xs text-black/50 uppercase tracking-wide">Luggage</p>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-4">
                                    Features & Amenities
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {activeVehicle.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/40">
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="font-lato text-sm text-black/70">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href="/booking"
                                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-colors duration-300"
                            >
                                <span>Book This Vehicle</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default FleetPage;