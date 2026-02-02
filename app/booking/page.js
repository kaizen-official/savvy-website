'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fleetData from '../fleet/data.json';

gsap.registerPlugin(ScrollTrigger);

function BookingPage() {
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [formData, setFormData] = useState({
        // Step 1: Service Details
        serviceType: '',
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        pickupTime: '',
        returnTrip: false,
        returnDate: '',
        returnTime: '',
        // Step 2: Vehicle & Passengers
        vehicle: '',
        passengers: '1',
        luggage: '0',
        childSeats: '0',
        // Step 3: Personal Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        flightNumber: '',
        specialRequests: '',
    });

    const vehicles = fleetData;

    const serviceTypes = [
        { id: 'airport-arrival', label: 'Airport Pickup', icon: '✈️' },
        { id: 'airport-departure', label: 'Airport Drop-off', icon: '🛫' },
        { id: 'point-to-point', label: 'Point to Point', icon: '📍' },
        { id: 'hourly-charter', label: 'Hourly Charter', icon: '⏱️' },
        { id: 'special-event', label: 'Special Event', icon: '⭐' },
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formsubmit.co/ajax/kaizen.official.hub@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Booking Request - ${formData.serviceType}`,
                    ...formData,
                    _template: 'table'
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    serviceType: '',
                    pickupLocation: '',
                    dropoffLocation: '',
                    pickupDate: '',
                    pickupTime: '',
                    returnTrip: false,
                    returnDate: '',
                    returnTime: '',
                    vehicle: '',
                    passengers: '1',
                    luggage: '0',
                    childSeats: '0',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    flightNumber: '',
                    specialRequests: '',
                });
                setCurrentStep(1);
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        }

        setIsSubmitting(false);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const isStepValid = (step) => {
        switch (step) {
            case 1:
                return formData.serviceType && formData.pickupLocation && formData.pickupDate && formData.pickupTime;
            case 2:
                return formData.vehicle && formData.passengers;
            case 3:
                return formData.firstName && formData.lastName && formData.email && formData.phone;
            default:
                return false;
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            if (formRef.current) {
                gsap.fromTo(
                    formRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
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
            <section ref={heroRef} className="relative bg-black min-h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-12">
                    <p className="hero-animate font-lato text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
                        Reserve Your Journey
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Book Your
                        <br />
                        <span className="italic">Chauffeur</span>
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                        Complete the form below and we will confirm your booking within the hour.
                    </p>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-12">
                        {[1, 2, 3].map((step) => (
                            <React.Fragment key={step}>
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-lato text-sm transition-all duration-300 ${currentStep >= step
                                        ? 'bg-black text-white'
                                        : 'bg-neutral-100 text-black/40'
                                        }`}
                                >
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-20 md:w-32 h-px transition-all duration-300 ${currentStep > step ? 'bg-black' : 'bg-neutral-200'
                                            }`}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Labels */}
                    <div className="flex items-center justify-between mb-12 max-w-md mx-auto">
                        <p className={`font-lato text-xs tracking-wide ${currentStep >= 1 ? 'text-black' : 'text-black/40'}`}>
                            Journey
                        </p>
                        <p className={`font-lato text-xs tracking-wide ${currentStep >= 2 ? 'text-black' : 'text-black/40'}`}>
                            Vehicle
                        </p>
                        <p className={`font-lato text-xs tracking-wide ${currentStep >= 3 ? 'text-black' : 'text-black/40'}`}>
                            Details
                        </p>
                    </div>

                    {submitStatus === 'success' ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bodoni text-2xl text-black mb-4">Booking Request Received</h3>
                            <p className="font-lato text-base text-black/60 mb-8 max-w-md mx-auto">
                                Thank you for choosing Savvy Chauffeur. We will review your request and send confirmation to your email within the hour.
                            </p>
                            <button
                                onClick={() => setSubmitStatus(null)}
                                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-colors"
                            >
                                Make Another Booking
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit}>
                            {/* Step 1: Journey Details */}
                            {currentStep === 1 && (
                                <div className="space-y-8">
                                    <div>
                                        <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-4">
                                            Select Service Type
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                            {serviceTypes.map((service) => (
                                                <label
                                                    key={service.id}
                                                    className={`p-4 border cursor-pointer transition-all duration-300 text-center ${formData.serviceType === service.id
                                                        ? 'border-black bg-black text-white'
                                                        : 'border-neutral-200 hover:border-black'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="serviceType"
                                                        value={service.id}
                                                        checked={formData.serviceType === service.id}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-2xl block mb-2">{service.icon}</span>
                                                    <span className="font-lato text-xs">{service.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Pickup Location *
                                            </label>
                                            <input
                                                type="text"
                                                name="pickupLocation"
                                                value={formData.pickupLocation}
                                                onChange={handleInputChange}
                                                placeholder="Address or location name"
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Drop-off Location
                                            </label>
                                            <input
                                                type="text"
                                                name="dropoffLocation"
                                                value={formData.dropoffLocation}
                                                onChange={handleInputChange}
                                                placeholder="Address or location name"
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Pickup Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="pickupDate"
                                                value={formData.pickupDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Pickup Time *
                                            </label>
                                            <input
                                                type="time"
                                                name="pickupTime"
                                                value={formData.pickupTime}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="returnTrip"
                                                checked={formData.returnTrip}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 border-neutral-200 accent-black"
                                            />
                                            <span className="font-lato text-sm text-black/70">I need a return trip</span>
                                        </label>
                                    </div>

                                    {formData.returnTrip && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                                            <div>
                                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                    Return Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="returnDate"
                                                    value={formData.returnDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                    Return Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="returnTime"
                                                    value={formData.returnTime}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Vehicle Selection */}
                            {currentStep === 2 && (
                                <div className="space-y-8">
                                    <div>
                                        <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-4">
                                            Select Your Vehicle
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {vehicles.map((vehicle) => (
                                                <label
                                                    key={vehicle.id}
                                                    className={`flex gap-4 p-4 border cursor-pointer transition-all duration-300 ${formData.vehicle === vehicle.id
                                                        ? 'border-black'
                                                        : 'border-neutral-200 hover:border-black/50'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="vehicle"
                                                        value={vehicle.id}
                                                        checked={formData.vehicle === vehicle.id}
                                                        onChange={handleInputChange}
                                                        className="sr-only"
                                                    />
                                                    <div
                                                        className="w-24 h-16 bg-neutral-100 shrink-0"
                                                        style={{
                                                            backgroundImage: `url(${vehicle.images[0]})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                        }}
                                                    ></div>
                                                    <div className="flex-1">
                                                        <p className="font-bodoni text-base text-black">{vehicle.name}</p>
                                                        <p className="font-lato text-xs text-black/50 mb-1">{vehicle.category}</p>
                                                        <p className="font-lato text-xs text-black/40">
                                                            {vehicle.passengers} passengers · {vehicle.luggage} bags
                                                        </p>
                                                    </div>
                                                    {formData.vehicle === vehicle.id && (
                                                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center shrink-0">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Passengers *
                                            </label>
                                            <select
                                                name="passengers"
                                                value={formData.passengers}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors bg-white"
                                                required
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Luggage
                                            </label>
                                            <select
                                                name="luggage"
                                                value={formData.luggage}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors bg-white"
                                            >
                                                {[0, 1, 2, 3, 4, 5, 6].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Bag' : 'Bags'}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Child Seats
                                            </label>
                                            <select
                                                name="childSeats"
                                                value={formData.childSeats}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors bg-white"
                                            >
                                                {[0, 1, 2, 3].map(num => (
                                                    <option key={num} value={num}>{num} {num === 1 ? 'Seat' : 'Seats'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Personal Details */}
                            {currentStep === 3 && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {(formData.serviceType === 'airport-arrival' || formData.serviceType === 'airport-departure') && (
                                        <div>
                                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                                Flight Number
                                            </label>
                                            <input
                                                type="text"
                                                name="flightNumber"
                                                value={formData.flightNumber}
                                                onChange={handleInputChange}
                                                placeholder="e.g., NZ123"
                                                className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                            Special Requests
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder="Any special requirements or preferences..."
                                            className="w-full px-4 py-3 border border-neutral-200 font-lato text-sm focus:border-black focus:outline-none transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="bg-neutral-50 p-6 border border-neutral-100">
                                        <p className="font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-4">
                                            Booking Summary
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="font-lato text-sm text-black/60">Service</span>
                                                <span className="font-lato text-sm text-black">
                                                    {serviceTypes.find(s => s.id === formData.serviceType)?.label || '-'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-lato text-sm text-black/60">Date & Time</span>
                                                <span className="font-lato text-sm text-black">
                                                    {formData.pickupDate} at {formData.pickupTime}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-lato text-sm text-black/60">Vehicle</span>
                                                <span className="font-lato text-sm text-black">
                                                    {vehicles.find(v => v.id === formData.vehicle)?.name || '-'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-lato text-sm text-black/60">Passengers</span>
                                                <span className="font-lato text-sm text-black">{formData.passengers}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-100">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="inline-flex items-center gap-2 font-lato text-xs tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Back</span>
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid(currentStep)}
                                        className={`inline-flex items-center gap-3 px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase transition-all duration-300 ${isStepValid(currentStep)
                                            ? 'bg-black text-white hover:bg-neutral-800'
                                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <span>Continue</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!isStepValid(currentStep) || isSubmitting}
                                        className={`inline-flex items-center gap-3 px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase transition-all duration-300 ${isStepValid(currentStep) && !isSubmitting
                                            ? 'bg-black text-white hover:bg-neutral-800'
                                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <span>{isSubmitting ? 'Submitting...' : 'Submit Booking'}</span>
                                        {!isSubmitting && (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </div>

                            {submitStatus === 'error' && (
                                <p className="mt-4 text-center font-lato text-sm text-red-600">
                                    Something went wrong. Please try again or contact us directly.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-black py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                        <div className="bg-black p-8 lg:p-10 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-white/40">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bodoni text-lg text-white mb-2">Instant Confirmation</h3>
                            <p className="font-lato text-sm text-white/50">
                                Receive booking confirmation within one hour of submission.
                            </p>
                        </div>
                        <div className="bg-black p-8 lg:p-10 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-white/40">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bodoni text-lg text-white mb-2">Free Cancellation</h3>
                            <p className="font-lato text-sm text-white/50">
                                Cancel up to 24 hours before your journey at no charge.
                            </p>
                        </div>
                        <div className="bg-black p-8 lg:p-10 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-white/40">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3 className="font-bodoni text-lg text-white mb-2">24/7 Support</h3>
                            <p className="font-lato text-sm text-white/50">
                                Our team is always available to assist with your booking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default BookingPage;