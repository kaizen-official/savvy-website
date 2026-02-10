'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function TermsPage() {
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
                        Terms of Service
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
                            <h2 className="font-bodoni text-2xl text-black mb-4">Agreement to Terms</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                These Terms of Service ("Terms") govern your use of the chauffeur services provided by Savvy Chauffeur Limited ("we", "our", or "us"), a company registered in New Zealand.
                            </p>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                By booking our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Booking and Reservations</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>All bookings are subject to vehicle and driver availability.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Bookings can be made via our website, phone, or email.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>A booking is confirmed only upon receipt of written confirmation from us.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>You must provide accurate journey details including pick-up location, destination, date, and time.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>For airport transfers, please provide flight details to enable flight tracking.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Pricing and Payment</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>All prices are quoted in New Zealand Dollars (NZD) and include GST.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Quoted prices include vehicle hire, professional chauffeur, fuel, and standard tolls.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Additional charges may apply for waiting time, route changes, or extended travel.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Payment is required prior to or at the completion of the journey unless otherwise agreed.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>We accept major credit cards and bank transfers.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Cancellation Policy</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                The following cancellation terms apply:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>More than 24 hours notice:</strong> Full refund</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>12-24 hours notice:</strong> 50% of the booking fee</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Less than 12 hours notice:</strong> 100% of the booking fee</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>No-show:</strong> 100% of the booking fee</span>
                                </li>
                            </ul>
                            <p className="font-lato text-base text-black/70 leading-relaxed mt-4">
                                For special events and group bookings, different cancellation terms may apply as specified at the time of booking.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Waiting Time</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>Airport Pick-ups:</strong> 30 minutes complimentary waiting time from flight landing.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span><strong>All Other Pick-ups:</strong> 15 minutes complimentary waiting time from scheduled pick-up time.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Additional waiting time is charged at our standard hourly rate.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Passenger Conduct</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                Passengers are expected to:
                            </p>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Treat our vehicles and chauffeurs with respect</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Not smoke or vape in vehicles</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Not consume alcohol unless explicitly permitted</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Wear seatbelts as required by New Zealand law</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Not carry illegal substances or weapons</span>
                                </li>
                            </ul>
                            <p className="font-lato text-base text-black/70 leading-relaxed mt-4">
                                We reserve the right to terminate a journey without refund if passenger conduct is deemed inappropriate or unsafe.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Liability and Insurance</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <ul className="space-y-3 font-lato text-base text-black/70">
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>All our vehicles are fully insured for passenger transport.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>We are not liable for any loss or damage to personal belongings left in vehicles.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>We are not liable for delays caused by traffic, weather, or circumstances beyond our control.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-black/30 mt-1">•</span>
                                    <span>Passengers are liable for any damage caused to vehicles through negligence or wilful misconduct.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Child Restraints</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                Child restraints are available upon request and must be requested at the time of booking. Parents/guardians are responsible for ensuring children are properly secured in appropriate restraints as required by New Zealand law.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Force Majeure</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                We shall not be liable for any failure or delay in performing our obligations where such failure or delay results from any cause beyond our reasonable control, including but not limited to natural disasters, extreme weather, civil unrest, or government actions.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Governing Law</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                These Terms are governed by and construed in accordance with the laws of New Zealand. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the New Zealand courts.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Changes to Terms</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed">
                                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new Terms.
                            </p>
                        </div>

                        <div className="content-animate">
                            <h2 className="font-bodoni text-2xl text-black mb-4">Contact Us</h2>
                            <div className="w-12 h-px bg-black/20 mb-6"></div>
                            <p className="font-lato text-base text-black/70 leading-relaxed mb-4">
                                If you have any questions about these Terms, please contact us:
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

export default TermsPage;
