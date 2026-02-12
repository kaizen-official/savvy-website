'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

function NewHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const overlayRef = useRef(null);

    const navLinks = [
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Fleet', href: '/fleet' },
        { label: 'Contact', href: '/contact' },
    ];

    const serviceLinks = [
        { label: 'Corporate Travel', href: '/services' },
        { label: 'Airport Transfers', href: '/services#airport' },
        { label: 'Weddings & Events', href: '/services#occasions' },
        { label: 'Private Tours', href: '/services#tours' },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle menu animation
    useEffect(() => {
        if (!menuRef.current || !overlayRef.current) return;

        const ctx = gsap.context(() => {
            if (isMenuOpen) {
                // Open menu
                document.body.style.overflow = 'hidden';

                gsap.to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    pointerEvents: 'auto',
                });

                gsap.to(menuRef.current, {
                    x: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                });

                gsap.fromTo(
                    menuItemsRef.current,
                    { x: 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        delay: 0.3,
                        ease: 'power3.out',
                    }
                );
            } else {
                // Close menu
                document.body.style.overflow = '';

                gsap.to(menuItemsRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'power3.in',
                });

                gsap.to(menuRef.current, {
                    x: '100%',
                    duration: 0.5,
                    delay: 0.2,
                    ease: 'power3.in',
                });

                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 0.3,
                    ease: 'power2.in',
                    pointerEvents: 'none',
                });
            }
        });

        return () => ctx.revert();
    }, [isMenuOpen]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <>
            {/* Header */}
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black backdrop-blur-md' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <Link href="/" className="relative z-10">
                            <img
                                src="/new.png"
                                alt="Savvy Chauffeur"
                                className="h-12 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="font-lato text-lg text-white/80 hover:text-white tracking-wide transition-colors duration-300 relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop CTA + Menu Button */}
                        <div className="flex items-center gap-6">
                            {/* Book Now - Desktop */}
                            <Link
                                href="/booking"
                                className="hidden md:flex items-center gap-2 bg-white text-black hover:bg-gray-200 hover:scale-105 px-6 py-3 font-lato text-xs tracking-widest uppercase transition-all duration-300"
                            >
                                <span>Book Now</span>
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>

                            {/* Menu Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden relative z-10 flex flex-col items-center justify-center w-12 h-12 gap-1.5 group"
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                <span
                                    className={`block w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''
                                        }`}
                                ></span>
                                <span
                                    className={`block w-6 h-px bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.75' : ''
                                        }`}
                                ></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrolled border */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-px bg-white/10 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
                        }`}
                ></div>
            </header>

            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
            ></div>

            {/* Full Screen Menu */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 w-full md:w-125 lg:w-150 h-full bg-black z-50 translate-x-full"
            >
                <div className="h-full flex flex-col">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between h-20 lg:h-24 px-6 lg:px-12 border-b border-white/10">
                        <span className="font-lato text-xs tracking-[0.3em] uppercase text-white/40">
                            Menu
                        </span>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center w-12 h-12"
                            aria-label="Close menu"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-white"
                            >
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Content */}
                    <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-12">
                        {/* Main Navigation */}
                        <nav className="mb-16">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    ref={(el) => (menuItemsRef.current[index] = el)}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-between py-5 border-b border-white/10 opacity-0"
                                >
                                    <span className="font-bodoni text-3xl lg:text-4xl text-white group-hover:text-white/70 transition-colors duration-300">
                                        {link.label}
                                    </span>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            ))}
                        </nav>

                        {/* Services Quick Links */}
                        <div
                            ref={(el) => (menuItemsRef.current[navLinks.length] = el)}
                            className="mb-16 opacity-0"
                        >
                            <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                                Services
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {serviceLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-lato text-sm text-white/60 hover:text-white transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div
                            ref={(el) => (menuItemsRef.current[navLinks.length + 1] = el)}
                            className="opacity-0"
                        >
                            <p className="font-lato text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
                                Get in Touch
                            </p>
                            <div className="space-y-4">
                                <a
                                    href="tel:+64212080749"
                                    className="block font-lato text-lg text-white hover:text-white/70 transition-colors duration-300"
                                >
                                    +64 212 080 749
                                </a>
                                <a
                                    href="mailto:sales@savvychauffeur.co.nz"
                                    className="block font-lato text-sm text-white/60 hover:text-white transition-colors duration-300"
                                >
                                    sales@savvychauffeur.co.nz
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Menu Footer */}
                    <div className="px-6 lg:px-12 py-8 border-t border-white/10">
                        <Link
                            href="/booking"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 font-lato text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors duration-300"
                        >
                            <span>Book Your Journey</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-6 mt-6">
                            {/* <a
                                href="#"
                                aria-label="LinkedIn"
                                className="text-white/40 hover:text-white transition-colors duration-300"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a> */}
                            <a
                                href="https://www.instagram.com/savvychauffeurs"
                                target="_blank"
                                aria-label="Instagram"
                                className="text-white/40 hover:text-white transition-colors duration-300"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewHeader;