'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ActPage() {
  const [selectedTab, setSelectedTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: 'CONTACT REPS' },
    { id: 'progress', label: 'TRACK PROGRESS' },
    { id: 'volunteer', label: 'VOLUNTEER' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-black text-white">
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
            <div className="w-32 h-1 bg-white mb-8"></div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12">
              YOUR VOICE MATTERS. MAKE A DIRECT IMPACT ON SINGLE-STAIR 
              HOUSING POLICY IN NORTH CAROLINA THROUGH TARGETED ADVOCACY.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-4 font-bold transition-colors shadow-brutal">
                FIND YOUR REPRESENTATIVE
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 font-bold transition-colors shadow-brutal">
                VIEW PROGRESS MAP
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Action Tabs */}
      <section className="bg-white">
        <div className="container-custom">
          <div className="flex border-b-2 border-black">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-4 px-6 font-bold text-sm md:text-base transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
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
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">
                POLICY PROGRESS TRACKER
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-black p-8">
                  <h3 className="text-xl font-bold mb-4">NORTH CAROLINA</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">HB 123 - Single Stair Housing Act</span>
                      <span className="bg-black text-white px-3 py-1 text-sm font-bold">
                        COMMITTEE
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium">SB 456 - Building Code Reform</span>
                      <span className="bg-gray-400 text-white px-3 py-1 text-sm font-bold">
                        INTRODUCED
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-black p-8">
                  <h3 className="text-xl font-bold mb-4">RECENT UPDATES</h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <div className="text-sm font-bold mb-1">MARCH 15, 2024</div>
                      <p className="text-sm">
                        HB 123 passed committee vote 8-3, moves to full House floor.
                      </p>
                    </div>
                    <div className="pb-4 border-b border-gray-200">
                      <div className="text-sm font-bold mb-1">MARCH 8, 2024</div>
                      <p className="text-sm">
                        Public hearing scheduled for SB 456 on March 22.
                      </p>
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

