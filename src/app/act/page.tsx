'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { client, queries, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import GeographicProgressMaps from '@/components/maps/GeographicProgressMaps';
import RepresentativeLookup from '@/components/advocacy/RepresentativeLookup';
import AdvocacyProgress from '@/components/advocacy/AdvocacyProgress';

interface ActPageData {
  title: string;
  heroTitle: string;
  heroDescription: string;
  heroBackgroundImage?: any;
  primaryButtonText: string;
  secondaryButtonText: string;
  seo?: any;
}

export default function ActPage() {
  const [selectedTab, setSelectedTab] = useState('progress');
  const [actPageData, setActPageData] = useState<ActPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActPageData = async () => {
      try {
        const data = await client.fetch(queries.actPage);
        setActPageData(data);
      } catch (error) {
        console.error('Error fetching Act page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActPageData();
  }, []);

  const tabs = [
    { id: 'contact', label: 'CONTACT REPS' },
    { id: 'progress', label: 'TRACK PROGRESS' },
    { id: 'volunteer', label: 'VOLUNTEER' },
    { id: 'my-impact', label: 'MY IMPACT' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen surface-primary flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen surface-primary">
      {/* Hero Section */}
      <section className={`section-padding text-content-inverse ${actPageData?.heroBackgroundImage ? 'relative' : 'surface-inverse'}`}>
        {actPageData?.heroBackgroundImage && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={urlFor(actPageData.heroBackgroundImage).width(1920).height(1080).url()}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              {actPageData?.heroTitle?.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < (actPageData.heroTitle?.split('\n').length || 0) - 1 && <br />}
                </span>
              )) || 'TAKE\nACTION'}
            </h1>
            <div className="w-32 h-1 bg-brand-500 mb-8"></div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12">
              {actPageData?.heroDescription || 'YOUR VOICE MATTERS. MAKE A DIRECT IMPACT ON SINGLE-STAIR HOUSING POLICY IN NORTH CAROLINA THROUGH TARGETED ADVOCACY.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-surface-primary text-content-primary hover:bg-brand-500 hover:text-white border border-border-primary px-8 py-4 font-medium transition-colors shadow-soft">
                {actPageData?.primaryButtonText || 'FIND YOUR REPRESENTATIVE'}
              </button>
              <button className="border border-border-primary bg-surface-inverse text-content-inverse hover:bg-surface-primary hover:text-content-primary px-8 py-4 font-medium transition-colors shadow-soft">
                {actPageData?.secondaryButtonText || 'VIEW PROGRESS MAP'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Action Tabs */}
      <section className="surface-primary">
        <div className="container-custom">
          <div className="flex border-b-2 border-border-primary">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold text-sm md:text-base transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-primary text-content-primary hover:bg-brand-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-padding">
        <div className="container-custom">
          {selectedTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black mb-6">
                  CONTACT YOUR REPRESENTATIVES
                </h2>
                <p className="text-lg leading-relaxed mb-8">
                  Find your North Carolina representatives and send them
                  a personalized message about single-stair housing policy.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span className="font-medium">Enter your address</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span className="font-medium">Choose a message template</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span className="font-medium">Personalize and send</span>
                  </div>
                </div>
              </div>

              <RepresentativeLookup />
            </motion.div>
          )}

          {selectedTab === 'progress' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
                POLICY PROGRESS TRACKER
              </h2>
              
              <div className="space-y-12">
                {/* Progress Maps */}
                <GeographicProgressMaps />

                {/* Recent Updates */}
                <div className="border-2 border-black p-8 bg-white">
                  <h3 className="text-xl font-black mb-6">RECENT UPDATES</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">NORTH CAROLINA</h4>
                      <div className="space-y-3">
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-amber-600">MARCH 15, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">HB 123</span> - Single Stair Housing Act passed committee vote 8-3, moves to full House floor.
                          </p>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-amber-600">MARCH 10, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">Wake County</span> - Local Bill 2024-15 scheduled for county commission vote.
                          </p>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-purple-600">MARCH 5, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">Guilford County</span> - Greensboro planning department begins feasibility study.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">NATIONAL</h4>
                      <div className="space-y-3">
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-blue-600">FEBRUARY 28, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">Washington State</span> - HB 1110 passed both chambers, awaiting governor signature.
                          </p>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-yellow-600">FEBRUARY 20, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">Texas</span> - HB 892 introduced for single-stair buildings in urban areas.
                          </p>
                        </div>
                        <div className="pb-3 border-b border-gray-200">
                          <div className="text-sm font-bold mb-1 text-green-600">JANUARY 15, 2024</div>
                          <p className="text-sm">
                            <span className="font-medium">California</span> - AB 2097 signed into law, implementation guidelines in development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'volunteer' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                GET INVOLVED
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group">
                  <div className="text-3xl font-black mb-4">📢</div>
                  <h3 className="text-lg font-bold mb-3">ADVOCACY</h3>
                  <p className="text-sm">
                    Help spread awareness and build support in your community.
                  </p>
                </div>
                
                <div className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group">
                  <div className="text-3xl font-black mb-4">📊</div>
                  <h3 className="text-lg font-bold mb-3">RESEARCH</h3>
                  <p className="text-sm">
                    Contribute to policy research and data analysis efforts.
                  </p>
                </div>
                
                <div className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group">
                  <div className="text-3xl font-black mb-4">✍️</div>
                  <h3 className="text-lg font-bold mb-3">WRITING</h3>
                  <p className="text-sm">
                    Create content, articles, and educational materials.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <button className="bg-brand-600 text-white hover:bg-brand-700 px-12 py-4 font-medium text-lg transition-colors shadow-soft">
                  JOIN THE MOVEMENT
                </button>
              </div>
            </motion.div>
          )}

          {selectedTab === 'my-impact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <AdvocacyProgress />
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

