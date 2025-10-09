'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LearnPage() {
  const learnSections = [
    {
      title: 'OVERVIEW',
      description: 'Understanding the fundamentals of single-stair housing design',
      href: '/learn/overview',
      icon: '■',
    },
    {
      title: 'WHY IT MATTERS',
      description: 'The impact on affordability, quality of life, and urban development',
      href: '/learn/why-it-matters',
      icon: '▲',
    },
    {
      title: 'SAFETY',
      description: 'Modern fire safety systems and building code considerations',
      href: '/learn/safety',
      icon: '●',
    },
    {
      title: 'LEGISLATION',
      description: 'Current policy landscape and advocacy opportunities',
      href: '/learn/legislation',
      icon: '◆',
    },
    {
      title: 'NEWS',
      description: 'Fresh updates from CITYBUILDER via RSS',
      href: '/learn/news',
      icon: '✦',
    },
  ];

  return (
    <div className="min-h-screen surface-primary">
      {/* Hero Section */}
      <section className="section-padding surface-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-none">
              LEARN
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500/80 mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              DISCOVER THE SCIENCE, POLICY, AND DESIGN PRINCIPLES BEHIND 
              SINGLE-STAIR HOUSING. UNDERSTAND WHY THIS APPROACH CREATES 
              BETTER COMMUNITIES FOR EVERYONE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learn Sections Grid */}
      <section className="section-padding surface-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learnSections.map((section, index) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={section.href}
                  className="block bg-surface-primary border border-border-primary p-8 hover:bg-brand-500 hover:text-white transition-colors group shadow-soft"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black">{section.icon}</span>
                    <div className="w-8 h-8 border border-border-primary group-hover:border-white flex items-center justify-center">
                      <span className="text-sm font-black">→</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black mb-4 tracking-wide">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-relaxed">
                    {section.description}
                  </p>
                </Link>
              </motion.div>
            ))}
            
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <div className="bg-brand-500 text-white p-8 h-full shadow-soft border border-brand-600">
                <div className="mb-6">
                  <span className="text-sm font-bold tracking-wider text-earth-sand-200">
                    FEATURED ARTICLE
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 leading-tight">
                  THE FUTURE OF URBAN HOUSING
                </h3>
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  How single-stair design principles are reshaping cities 
                  across North America and creating more livable communities.
                </p>
                <Link
                  href="/learn/news"
                  className="inline-flex items-center space-x-2 font-bold hover:underline"
                >
                  <span>VIEW NEWS</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              BY THE NUMBERS
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center border-2 border-black p-8"
            >
              <div className="text-4xl md:text-5xl font-black text-black mb-4">
                30%
              </div>
              <p className="text-sm font-bold tracking-wide">
                MORE LIVABLE SPACE
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center border-2 border-black p-8"
            >
              <div className="text-4xl md:text-5xl font-black text-black mb-4">
                25%
              </div>
              <p className="text-sm font-bold tracking-wide">
                COST REDUCTION
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center border-2 border-black p-8"
            >
              <div className="text-4xl md:text-5xl font-black text-black mb-4">
                50%
              </div>
              <p className="text-sm font-bold tracking-wide">
                BETTER NATURAL LIGHT
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}








