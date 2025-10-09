'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { client, queries } from '@/lib/sanity';

interface SiteSettings {
  title: string;
  tagline: string;
  navigation: Array<{
    label: string;
    href: string;
    external: boolean;
  }>;
  ctaButton?: {
    text: string;
    href: string;
  };
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await fetch('/api/site-settings');
        if (res.ok) {
          const data = await res.json();
          setSiteSettings(data);
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };

    fetchSiteSettings();
  }, []);

  const navItems = (siteSettings?.navigation && siteSettings.navigation.length > 0
    ? siteSettings.navigation
    : [
        { href: '/learn', label: 'LEARN', external: false },
        { href: '/act', label: 'ACT', external: false },
        { href: '/examples', label: 'EXAMPLES', external: false },
        { href: '/policymakers', label: 'POLICYMAKERS', external: false },
        { href: '/about', label: 'ABOUT', external: false },
      ]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 surface-primary border-b-2 border-border-primary">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-tight group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brand-500 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
              <svg
                className="text-white w-5 h-5 lg:w-6 lg:h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="4" y="14" width="6" height="2" rx="0.5" />
                <rect x="10" y="10" width="6" height="2" rx="0.5" />
                <rect x="16" y="6" width="4" height="2" rx="0.5" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-content-primary font-bold text-body-sm lg:text-body leading-tight">
                SINGLE STAIR
              </div>
              <div className="text-content-primary font-bold text-caption lg:text-body-sm leading-tight">
                {siteSettings?.tagline || 'NORTH CAROLINA'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-content-primary font-semibold text-sm hover:bg-brand-500 hover:text-white px-4 py-2 transition-colors border-2 border-transparent hover:border-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href={siteSettings?.ctaButton?.href || "/act"} className="btn-primary">
              {siteSettings?.ctaButton?.text || 'TAKE ACTION'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 border-2 border-border-primary bg-surface-primary hover:bg-brand-500 hover:text-white transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-current block"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-current block"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-current block"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden surface-primary border-t-2 border-border-primary overflow-hidden"
          >
            <nav className="container-custom py-4">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 px-4 text-content-primary font-semibold text-lg border-2 border-transparent hover:border-brand-700 hover:bg-brand-500 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href={siteSettings?.ctaButton?.href || "/act"}
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    {siteSettings?.ctaButton?.text || 'TAKE ACTION'}
                  </Link>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}



