'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/learn', label: 'LEARN' },
    { href: '/act', label: 'ACT' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 surface-primary border-b-2 border-border-primary">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-tight group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-surface-inverse flex items-center justify-center group-hover:bg-brutal-gray-800 transition-colors">
              <span className="text-content-inverse font-bold text-body-sm lg:text-body">SS</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-content-primary font-bold text-body-sm lg:text-body leading-tight">
                SINGLE STAIR
              </div>
              <div className="text-content-primary font-bold text-caption lg:text-body-sm leading-tight">
                NORTH CAROLINA
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black font-bold text-sm hover:bg-black hover:text-white px-4 py-2 transition-colors border-2 border-transparent hover:border-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link href="/act" className="btn-primary">
              TAKE ACTION
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t-2 border-black overflow-hidden"
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
                      className="block py-3 px-4 text-black font-bold text-lg border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-colors"
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
                    href="/act"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    TAKE ACTION
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



