'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'LEARN',
      links: [
        { href: '/learn/overview', label: 'Overview' },
        { href: '/learn/why-it-matters', label: 'Why It Matters' },
        { href: '/learn/safety', label: 'Safety' },
        { href: '/learn/legislation', label: 'Legislation' },
        { href: '/learn/articles', label: 'Articles' },
      ],
    },
    {
      title: 'ACT',
      links: [
        { href: '/act/get-involved', label: 'Get Involved' },
        { href: '/act/progress', label: 'Track Progress' },
        { href: '/act/contact-reps', label: 'Contact Representatives' },
      ],
    },
    {
      title: 'ABOUT',
      links: [
        { href: '/about', label: 'Mission' },
        { href: '/gallery', label: 'Building Gallery' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/accessibility', label: 'Accessibility' },
        { href: '#', label: 'Newsletter' },
        { href: '#', label: 'Press Kit' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white flex items-center justify-center">
                  <span className="text-black font-bold text-lg">SS</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">
                    SINGLE STAIR
                  </div>
                  <div className="text-white font-bold text-sm leading-tight">
                    NORTH CAROLINA
                  </div>
                </div>
              </Link>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                Advocating for better housing design through single-stair buildings. 
                Creating more livable, affordable, and sustainable communities across North Carolina.
              </p>

              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <span className="text-sm font-bold">T</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">F</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <span className="text-sm font-bold">L</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                  aria-label="Email"
                >
                  <span className="text-sm font-bold">@</span>
                </a>
              </div>
            </div>

            {/* Navigation Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-bold text-sm mb-4 pb-2 border-b border-gray-700">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 text-sm hover:text-white hover:bg-white hover:text-black px-2 py-1 -mx-2 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="max-w-2xl">
            <h3 className="text-white font-bold text-lg mb-4">
              STAY INFORMED
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Get updates on single-stair legislation, new research, and advocacy opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-white text-black font-medium border-2 border-white focus:outline-none focus:border-gray-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-black font-bold px-6 py-3 border-2 border-white hover:bg-black hover:text-white transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Single Stair North Carolina. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


