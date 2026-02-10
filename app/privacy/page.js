'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function PrivacyPage() {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

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

            gsap.fromTo(
                contentRef.current.querySelectorAll('.content-animate'),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.5,
                }
            );
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

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32 pb-16">
                    <p className="hero-animate font-lato text-xs tracking-[0.4em] uppercase text-white/40 mb-6">
                        Legal
                    </p>
                    <h1 className="hero-animate font-bodoni text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Privacy Policy
                    </h1>
                    <div className="hero-animate w-16 h-px bg-white/30 mx-auto mb-6"></div>
                    <p className="hero-animate font-lato text-sm text-white/40">
                        Last updated: February 2026
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section ref={contentRef} className="bg-white py-20 lg:py-28">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="space-y-12">
                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Introduction</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                Savvy Chauffeur Limited ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our chauffeur services or visit our website.
                            </p>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                By using our services, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access our services.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Information We Collect</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                We may collect information about you in various ways, including:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Personal Data:</strong> Name, email address, phone number, and billing address when you book our services.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Journey Information:</strong> Pick-up and drop-off locations, travel dates and times, flight details, and special requests.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Payment Information:</strong> Credit card details processed securely through our payment provider.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Device Information:</strong> IP address, browser type, and device identifiers when accessing our website.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">How We Use Your Information</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Provide, operate, and maintain our chauffeur services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Process bookings and send confirmations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Communicate with you about your bookings and respond to enquiries</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Send promotional communications (with your consent)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Improve our website and services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Comply with legal obligations</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Information Sharing</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                We do not sell your personal information. We may share your information with:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Service Providers:</strong> Third parties who assist in operating our business (payment processors, email services).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Data Security</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Your Rights</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                Under the New Zealand Privacy Act 2020, you have the right to:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Access the personal information we hold about you</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Request correction of inaccurate information</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Request deletion of your information (subject to legal requirements)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Withdraw consent for marketing communications</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Cookies</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                Our website may use cookies to enhance your browsing experience. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that some features of our website may not function properly without cookies.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Changes to This Policy</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Contact Us</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>
                            <div className="bg-neutral-100 p-6 space-y-2">
                                <p className="font-lato text-sm text-black/70">
                                    <strong>Savvy Chauffeur Limited</strong>
                                </p>
                                <p className="font-lato text-sm text-black/70">
                                    Unit 7, 3 Inanga Street, Hobsonville, Auckland 0618
                                </p>
                                <p className="font-lato text-sm text-black/70">
                                    Email: sales@savvychauffeur.co.nz
                                </p>
                                <p className="font-lato text-sm text-black/70">
                                    Phone: +64 212 080 749
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default PrivacyPage;
