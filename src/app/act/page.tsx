'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GeographicProgressMaps from '@/components/maps/GeographicProgressMaps';

export default function ActPage() {
  const [selectedTab, setSelectedTab] = useState('progress');

  const tabs = [
    { id: 'contact', label: 'CONTACT REPS' },
    { id: 'progress', label: 'TRACK PROGRESS' },
    { id: 'volunteer', label: 'VOLUNTEER' },
  ];

  return (
    <div className="min-h-screen surface-primary">
      {/* Hero Section */}
      <section className="section-padding surface-inverse text-content-inverse">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              TAKE
              <br />
              ACTION
            </h1>
            <div className="w-32 h-1 bg-brand-500 mb-8"></div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12">
              YOUR VOICE MATTERS. MAKE A DIRECT IMPACT ON SINGLE-STAIR 
              HOUSING POLICY IN NORTH CAROLINA THROUGH TARGETED ADVOCACY.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-surface-primary text-content-primary hover:bg-brand-500 hover:text-white border-2 border-surface-primary px-8 py-4 font-semibold transition-colors shadow-brutal">
                FIND YOUR REPRESENTATIVE
              </button>
              <button className="border-2 border-surface-primary text-content-inverse hover:bg-surface-primary hover:text-content-primary px-8 py-4 font-semibold transition-colors shadow-brutal">
                VIEW PROGRESS MAP
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
              <div className="grid md:grid-cols-2 gap-12">
                <div>
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

                <div className="border-2 border-black p-8 shadow-brutal">
                  <h3 className="text-xl font-bold mb-6">FIND YOUR DISTRICT</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        YOUR ADDRESS
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, Charlotte, NC 28202"
                        className="w-full p-3 border-2 border-black focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 py-3 font-bold transition-colors"
                    >
                      FIND MY REPRESENTATIVES
                    </button>
                  </form>
                </div>
              </div>
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
                <button className="bg-black text-white hover:bg-gray-800 px-12 py-4 font-bold text-lg transition-colors shadow-brutal">
                  JOIN THE MOVEMENT
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

