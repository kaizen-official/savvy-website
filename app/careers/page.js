'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import positions from './jobs.json';

gsap.registerPlugin(ScrollTrigger);

function CareersPage() {
    const heroRef = useRef(null);
    const whyRef = useRef(null);
    const positionsRef = useRef(null);
    const applyRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        license: '',
        message: '',
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    const benefits = [
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Competitive Pay',
            description: 'Industry-leading rates with performance bonuses and incentives.',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Flexible Hours',
            description: 'Choose shifts that work for you with full-time and part-time options.',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Career Growth',
            description: 'Professional development opportunities and clear advancement paths.',
        },
        {
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Great Team',
            description: 'Join a professional, supportive team that values excellence.',
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

            // Why section animation
            if (whyRef.current) {
                gsap.fromTo(
                    whyRef.current.querySelectorAll('.why-animate'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: whyRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Positions animation
            if (positionsRef.current) {
                gsap.fromTo(
                    positionsRef.current.querySelectorAll('.position-card'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: positionsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Apply section animation
            if (applyRef.current) {
                gsap.fromTo(
                    applyRef.current.querySelectorAll('.apply-animate'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: applyRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('submitting');

        try {
            const response = await fetch('https://formsubmit.co/ajax/sales@savvychauffeur.co.nz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `Career Application: ${formData.position || 'General'} - ${formData.name}`,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    position: '',
                    experience: '',
                    license: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
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
                        Join Our Team
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Drive
                        <br />
                        <span className="italic">Excellence</span>
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-base text-white/60 max-w-xl mx-auto leading-relaxed">
                        Be part of Auckland's premier luxury chauffeur service. We're looking for
                        exceptional individuals who share our passion for excellence.
                    </p>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section ref={whyRef} className="bg-white py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="why-animate font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            Why Choose Us
                        </p>
                        <h2 className="why-animate font-bodoni text-3xl md:text-4xl text-black mb-6">
                            Benefits of Joining Savvy Chauffeur
                        </h2>
                        <div className="why-animate w-16 h-px bg-black/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="why-animate text-center">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-black/30">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-bodoni text-xl text-black mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="font-lato text-sm text-black/60 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section ref={positionsRef} className="bg-black py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                            Opportunities
                        </p>
                        <h2 className="font-bodoni text-3xl md:text-4xl text-white mb-6">
                            Open Positions
                        </h2>
                        <div className="w-16 h-px bg-white/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {positions.map((position, index) => (
                            <div
                                key={index}
                                className="position-card bg-white/5 border border-white/10 p-8 hover:border-white/70 transition-all duration-500"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bodoni text-2xl text-white mb-2">
                                            {position.title}
                                        </h3>
                                        <p className="font-lato text-xs tracking-[0.15em] uppercase text-white/40">
                                            {position.type}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-lato text-sm text-white/60 leading-relaxed mb-6">
                                    {position.description}
                                </p>
                                <div className="border-t border-white/10 pt-6">
                                    <p className="font-lato text-xs tracking-[0.15em] uppercase text-white/40 mb-4">
                                        Requirements
                                    </p>
                                    <ul className="space-y-2">
                                        {position.requirements.map((req, reqIndex) => (
                                            <li key={reqIndex} className="flex items-start gap-3">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 mt-1 shrink-0">
                                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="font-lato text-sm text-white/50">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section ref={applyRef} className="bg-white py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="apply-animate font-lato text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
                            Apply Now
                        </p>
                        <h2 className="apply-animate font-bodoni text-3xl md:text-4xl text-black mb-6">
                            Start Your Journey With Us
                        </h2>
                        <div className="apply-animate w-16 h-px bg-black/20 mx-auto mb-6"></div>
                        <p className="apply-animate font-lato text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
                            Submit your application below and our team will be in touch within 48 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="apply-animate space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black placeholder:text-black/30 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black placeholder:text-black/30 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black placeholder:text-black/30 focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                    placeholder="+64 21 234 5678"
                                />
                            </div>
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Position Applying For *
                                </label>
                                <select
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                >
                                    <option value="">Select a position</option>
                                    {positions.map((pos, idx) => (
                                        <option key={idx} value={pos.title}>{pos.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Years of Driving Experience *
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                >
                                    <option value="">Select experience</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="5-10 years">5-10 years</option>
                                    <option value="10+ years">10+ years</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                    Do you have a P Endorsement? *
                                </label>
                                <select
                                    name="license"
                                    value={formData.license}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
                                >
                                    <option value="">Select an option</option>
                                    <option value="Yes">Yes, I have P Endorsement</option>
                                    <option value="No, but willing to obtain">No, but willing to obtain</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block font-lato text-xs tracking-[0.15em] uppercase text-black/40 mb-2">
                                Tell Us About Yourself
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                className="w-full bg-neutral-100 border-0 px-4 py-4 font-lato text-sm text-black placeholder:text-black/30 focus:ring-2 focus:ring-black focus:outline-none transition-all resize-none"
                                placeholder="Share your relevant experience, why you're interested in this role, and what makes you an excellent chauffeur..."
                            ></textarea>
                        </div>

                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                disabled={submitStatus === 'submitting'}
                                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitStatus === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Application</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="text-center p-6 bg-green-50 border border-green-200">
                                <p className="font-lato text-sm text-green-700">
                                    Thank you for your application! We'll be in touch within 48 hours.
                                </p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="text-center p-6 bg-red-50 border border-red-200">
                                <p className="font-lato text-sm text-red-700">
                                    Something went wrong. Please try again or email us directly at sales@savvychauffeur.co.nz
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black py-20 lg:py-28">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                        Questions?
                    </p>
                    <h2 className="font-bodoni text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                        Get in Touch
                    </h2>
                    <p className="font-lato text-base text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                        Have questions about working with us? Our team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+64212080749"
                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors duration-300"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Call Us</span>
                        </a>
                        <a
                            href="mailto:sales@savvychauffeur.co.nz"
                            className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Email Us</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CareersPage;
