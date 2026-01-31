'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactPage() {
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        'Corporate Travel',
        'Airport Transfer',
        'Wedding & Events',
        'Private Tours',
        'Roadshows',
        'Other',
    ];

    const contactInfo = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: '24/7 Reservations',
            value: '+44 20 1234 5678',
            href: 'tel:+442012345678',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Email Us',
            value: 'enquiries@savvychauffeur.com',
            href: 'mailto:enquiries@savvychauffeur.com',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Headquarters',
            value: 'Mayfair, London W1K',
            href: '#',
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            label: 'Hours of Operation',
            value: '24 Hours, 7 Days a Week',
            href: null,
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

            // Form animation
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Info animation
            gsap.fromTo(
                infoRef.current.querySelectorAll('.info-item'),
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: 'top 80%',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    _subject: 'New Contact Form Submission - Savvy Chauffeur',
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        Get in Touch
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        We Would Love to
                        <br />
                        <span className="italic">Hear From You</span>
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                        Whether you have a question, require a quote, or wish to make a reservation,
                        our team is ready to assist you.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">

                        {/* Contact Form */}
                        <div ref={formRef} className="lg:col-span-3">
                            <div className="mb-10">
                                <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-3">
                                    Send a Message
                                </p>
                                <h2 className="font-bodoni text-2xl md:text-3xl text-black">
                                    Make an Enquiry
                                </h2>
                            </div>

                            {isSubmitted ? (
                                <div className="bg-neutral-50 border border-neutral-100 p-12 text-center">
                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bodoni text-2xl text-black mb-3">Thank You</h3>
                                    <p className="font-lato text-sm text-black/60 mb-6">
                                        Your message has been received. A member of our team will be in touch shortly.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="font-lato text-xs tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label className="block font-lato text-xs tracking-wide text-black/60 uppercase mb-2">
                                                Full Name <span className="text-black">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 font-lato text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                                                placeholder="John Smith"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block font-lato text-xs tracking-wide text-black/60 uppercase mb-2">
                                                Email Address <span className="text-black">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 font-lato text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Phone */}
                                        <div>
                                            <label className="block font-lato text-xs tracking-wide text-black/60 uppercase mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 font-lato text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors"
                                                placeholder="+44 20 1234 5678"
                                            />
                                        </div>

                                        {/* Service */}
                                        <div>
                                            <label className="block font-lato text-xs tracking-wide text-black/60 uppercase mb-2">
                                                Service Required
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 font-lato text-sm text-black appearance-none focus:outline-none focus:border-black transition-colors cursor-pointer"
                                                >
                                                    <option value="">Select a service</option>
                                                    {services.map((service) => (
                                                        <option key={service} value={service}>
                                                            {service}
                                                        </option>
                                                    ))}
                                                </select>
                                                <svg
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block font-lato text-xs tracking-wide text-black/60 uppercase mb-2">
                                            Your Message <span className="text-black">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 font-lato text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors resize-none"
                                            placeholder="Please provide details about your enquiry..."
                                        ></textarea>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div ref={infoRef} className="lg:col-span-2">
                            <div className="mb-10">
                                <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-3">
                                    Contact Details
                                </p>
                                <h2 className="font-bodoni text-2xl md:text-3xl text-black">
                                    Reach Us Directly
                                </h2>
                            </div>

                            <div className="space-y-8 mb-12">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="info-item flex items-start gap-4">
                                        <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 text-black/40">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="font-lato text-xs tracking-wide text-black/40 uppercase mb-1">
                                                {info.label}
                                            </p>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="font-lato text-base text-black hover:text-black/70 transition-colors"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="font-lato text-base text-black">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-neutral-100 mb-12"></div>

                            {/* Social Links */}
                            <div className="info-item">
                                <p className="font-lato text-xs tracking-wide text-black/40 uppercase mb-4">
                                    Follow Us
                                </p>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-black/40 hover:bg-black hover:border-black hover:text-white transition-all duration-300"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-black/40 hover:bg-black hover:border-black hover:text-white transition-all duration-300"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="X (Twitter)"
                                        className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-black/40 hover:bg-black hover:border-black hover:text-white transition-all duration-300"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="bg-black py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                                Visit Us
                            </p>
                            <h2 className="font-bodoni text-2xl md:text-3xl text-white mb-6">
                                Our Location
                            </h2>
                            <p className="font-lato text-base text-white/60 leading-relaxed mb-8">
                                While our chauffeurs come to you, our office is always
                                open for consultations and corporate account discussions.
                            </p>
                            <div className="space-y-4">
                                <p className="font-lato text-sm text-white/80">
                                    Savvy Chauffeur&apos;s Limited
                                </p>
                                <p className="font-lato text-sm text-white/50">
                                    Auckland<br />
                                    New Zealand
                                </p>
                            </div>
                        </div>
                        <div className="aspect-video lg:aspect-square bg-neutral-900 relative overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6235.733958979832!2d174.63384995831944!3d-36.80816645847573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d3f6eb693997d%3A0x248ae9aa0a9911ff!2sSavvy%20Chauffeur%E2%80%99s%20Limited!5e0!3m2!1sen!2sin!4v1769639022478!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {/* <section className="bg-neutral-50 py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            Common Questions
                        </p>
                        <h2 className="font-bodoni text-2xl md:text-3xl text-black">
                            Frequently Asked
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'How far in advance should I book?',
                                a: 'While we accommodate last-minute requests when possible, we recommend booking at least 24-48 hours in advance for standard services, and 1-2 weeks for weddings or special events.',
                            },
                            {
                                q: 'What is your cancellation policy?',
                                a: 'Cancellations made 24 hours or more before the scheduled pickup receive a full refund. Cancellations within 24 hours may incur a fee. Please contact us for specific circumstances.',
                            },
                            {
                                q: 'Do you offer corporate accounts?',
                                a: 'Yes, we offer bespoke corporate account packages with priority booking, consolidated billing, and dedicated account management. Contact us to discuss your requirements.',
                            },
                            {
                                q: 'What vehicles are in your fleet?',
                                a: 'Our fleet consists of premium vehicles including Mercedes-Benz S-Class, BMW 7 Series, Range Rover, and luxury MPVs for larger groups. All vehicles are maintained to the highest standards.',
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white border border-neutral-100 p-6 lg:p-8">
                                <h3 className="font-bodoni text-lg text-black mb-3">{faq.q}</h3>
                                <p className="font-lato text-sm text-black/60 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </main>
    );
}

export default ContactPage;