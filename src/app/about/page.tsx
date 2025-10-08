'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { client, queries } from '@/lib/sanity';
import Image from 'next/image';

interface AboutPageData {
  title: string;
  heroTitle: string;
  heroDescription: string;
  missionTitle: string;
  missionContent: any[];
  missionBulletPoints: string[];
  whySingleStairTitle: string;
  whySingleStairBenefits: Array<{
    title: string;
    description: string;
  }>;
  teamTitle: string;
  teamMembers: Array<{
    name: string;
    role: string;
    bio: string;
    expertise: string[];
  }>;
  timelineTitle: string;
  timelineItems: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  seo?: any;
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await client.fetch(queries.aboutPage);
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching About page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen surface-primary flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen surface-primary flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading content</div>
      </div>
    );
  }

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
              {aboutData.heroTitle || 'ABOUT'}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500/80 mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              {aboutData.heroDescription || 'WE ARE A COALITION OF ARCHITECTS, PLANNERS, POLICYMAKERS, AND ADVOCATES WORKING TO TRANSFORM NORTH CAROLINA\'S HOUSING LANDSCAPE.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding surface-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                {aboutData.missionTitle || 'OUR MISSION'}
              </h2>
              <div className="text-lg leading-relaxed mb-6">
                {aboutData.missionContent ? (
                  <div dangerouslySetInnerHTML={{
                    __html: aboutData.missionContent.map(block =>
                      block._type === 'block' ? block.children.map((child: any) => child.text).join('') : ''
                    ).join('\n')
                  }} />
                ) : (
                  <p>Single Stair North Carolina advocates for building code reforms that enable single-stair residential buildings, creating more affordable, livable, and sustainable housing across our state.</p>
                )}
              </div>

              <div className="space-y-4">
                {aboutData.missionBulletPoints?.map((point, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 ${index === 0 ? 'bg-brand-500' : index === 1 ? 'bg-earth-sage-600' : 'bg-brand-700'} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">■</span>
                    </div>
                    <span className="font-medium">{point}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">■</span>
                      </div>
                      <span className="font-medium">Advocate for policy reform</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-earth-sage-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">■</span>
                      </div>
                      <span className="font-medium">Educate communities and stakeholders</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-brand-700 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">■</span>
                      </div>
                      <span className="font-medium">Support innovative housing projects</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-border-primary p-8 shadow-soft bg-surface-primary"
            >
              <h3 className="text-2xl font-black mb-6">
                {aboutData.whySingleStairTitle || 'WHY SINGLE STAIR?'}
              </h3>
              <div className="space-y-6">
                {aboutData.whySingleStairBenefits?.map((benefit, index) => (
                  <div key={index}>
                    <h4 className="font-bold mb-2">{benefit.title}</h4>
                    <p className="text-sm">
                      {benefit.description}
                    </p>
                  </div>
                )) || (
                  <>
                    <div>
                      <h4 className="font-bold mb-2">MORE LIVABLE SPACE</h4>
                      <p className="text-sm">
                        Single-stair design eliminates redundant corridors, creating 20-30% more usable space.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">BETTER NATURAL LIGHT</h4>
                      <p className="text-sm">
                        Cross-ventilation and corner units provide superior lighting and air quality.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">REDUCED COSTS</h4>
                      <p className="text-sm">
                        Simplified construction reduces building costs by 15-25% while maintaining safety.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding surface-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {aboutData.teamTitle || 'OUR TEAM'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500/80 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.teamMembers?.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-brand-500 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-black text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-black mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-bold text-gray-600 mb-4">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise?.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-earth-sand-100 text-black px-2 py-1 font-bold border border-border-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding surface-inverse text-content-inverse">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              {aboutData.timelineTitle || 'OUR JOURNEY'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500/80 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {aboutData.timelineItems?.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-4xl font-black mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-content-secondary leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="w-4 h-4 bg-white flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding surface-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              {aboutData.ctaTitle || 'JOIN OUR MOVEMENT'}
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              {aboutData.ctaDescription || 'Whether you\'re an architect, developer, policymaker, or concerned citizen, there\'s a place for you in our coalition. Together, we can build better communities for all North Carolinians.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 font-bold">
                {aboutData.primaryButtonText || 'GET INVOLVED'}
              </button>
              <button className="btn-secondary px-8 py-4 font-bold">
                {aboutData.secondaryButtonText || 'CONTACT US'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}








