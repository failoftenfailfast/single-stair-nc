'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ncCountiesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';

interface NCCountiesMapProps {
  className?: string;
}

export default function NCCountiesMap({ className = '' }: NCCountiesMapProps) {
  const [selectedCounty, setSelectedCounty] = useState<PolicyProgress | null>(null);
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  // Create a lookup for county data
  const countyData = ncCountiesProgress.reduce((acc, county) => {
    acc[county.id] = county;
    return acc;
  }, {} as Record<string, PolicyProgress>);

  const handleCountyClick = (countyId: string) => {
    const county = countyData[countyId];
    if (county) {
      setSelectedCounty(county);
    }
  };

  const getCountyColor = (countyId: string) => {
    const county = countyData[countyId];
    if (!county) return '#f3f4f6'; // Light gray for no data
    
    if (hoveredCounty === countyId) {
      // Slightly darker on hover
      const baseColor = getStatusColor(county.status);
      return baseColor + 'dd'; // Add some transparency
    }
    
    return getStatusColor(county.status);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white border-2 border-black p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black">NORTH CAROLINA COUNTIES</h3>
          <div className="text-sm text-gray-600">
            Click counties for details
          </div>
        </div>

        {/* Simplified NC Counties SVG Map */}
        <div className="relative">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto border border-black"
            style={{ maxHeight: '400px' }}
          >
            {/* Major NC Counties - Simplified rectangles for demonstration */}
            {/* In a real implementation, you'd use actual county boundary paths */}
            
            {/* Mecklenburg County (Charlotte area) */}
            <rect
              id="mecklenburg"
              x="150"
              y="250"
              width="60"
              height="50"
              fill={getCountyColor('mecklenburg')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('mecklenburg')}
              onMouseEnter={() => setHoveredCounty('mecklenburg')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="180" y="280" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              MECK
            </text>

            {/* Wake County (Raleigh area) */}
            <rect
              id="wake"
              x="400"
              y="200"
              width="60"
              height="50"
              fill={getCountyColor('wake')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('wake')}
              onMouseEnter={() => setHoveredCounty('wake')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="430" y="230" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              WAKE
            </text>

            {/* Durham County */}
            <rect
              id="durham"
              x="380"
              y="180"
              width="40"
              height="40"
              fill={getCountyColor('durham')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('durham')}
              onMouseEnter={() => setHoveredCounty('durham')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="400" y="205" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              DUR
            </text>

            {/* Guilford County (Greensboro) */}
            <rect
              id="guilford"
              x="300"
              y="150"
              width="50"
              height="45"
              fill={getCountyColor('guilford')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('guilford')}
              onMouseEnter={() => setHoveredCounty('guilford')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="325" y="178" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              GUIL
            </text>

            {/* Forsyth County (Winston-Salem) */}
            <rect
              id="forsyth"
              x="250"
              y="120"
              width="50"
              height="45"
              fill={getCountyColor('forsyth')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('forsyth')}
              onMouseEnter={() => setHoveredCounty('forsyth')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="275" y="148" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              FOR
            </text>

            {/* Buncombe County (Asheville) */}
            <rect
              id="buncombe"
              x="100"
              y="180"
              width="50"
              height="45"
              fill={getCountyColor('buncombe')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('buncombe')}
              onMouseEnter={() => setHoveredCounty('buncombe')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="125" y="208" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              BUN
            </text>

            {/* Additional counties */}
            <rect
              id="gaston"
              x="120"
              y="270"
              width="40"
              height="40"
              fill={getCountyColor('gaston')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('gaston')}
              onMouseEnter={() => setHoveredCounty('gaston')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="140" y="295" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              GAS
            </text>

            <rect
              id="union"
              x="220"
              y="280"
              width="40"
              height="40"
              fill={getCountyColor('union')}
              stroke="#000"
              strokeWidth="1"
              className="cursor-pointer hover:stroke-2 transition-all"
              onClick={() => handleCountyClick('union')}
              onMouseEnter={() => setHoveredCounty('union')}
              onMouseLeave={() => setHoveredCounty(null)}
            />
            <text x="240" y="305" textAnchor="middle" className="text-xs font-bold pointer-events-none">
              UNI
            </text>

            {/* State outline (simplified) */}
            <path
              d="M50 100 L700 100 L720 120 L720 350 L50 350 Z"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              className="pointer-events-none"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('signed') }}></div>
            <span className="font-medium">Signed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('committee') }}></div>
            <span className="font-medium">In Committee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('studying') }}></div>
            <span className="font-medium">Under Study</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('no_activity') }}></div>
            <span className="font-medium">No Activity</span>
          </div>
        </div>
      </div>

      {/* County Detail Modal */}
      <AnimatePresence>
        {selectedCounty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedCounty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-black p-6 max-w-md mx-4 shadow-brutal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black">{selectedCounty.name}</h3>
                <button
                  onClick={() => setSelectedCounty(null)}
                  className="w-8 h-8 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-4 h-4 border border-black"
                      style={{ backgroundColor: getStatusColor(selectedCounty.status) }}
                    ></div>
                    <span className="font-bold">{getStatusLabel(selectedCounty.status)}</span>
                  </div>
                  
                  {selectedCounty.billNumber && (
                    <div className="text-sm mb-2">
                      <span className="font-bold">Bill:</span> {selectedCounty.billNumber}
                    </div>
                  )}

                  {selectedCounty.sponsor && (
                    <div className="text-sm mb-2">
                      <span className="font-bold">Sponsor:</span> {selectedCounty.sponsor}
                    </div>
                  )}

                  <div className="text-sm mb-2">
                    <span className="font-bold">Last Updated:</span> {new Date(selectedCounty.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                {selectedCounty.description && (
                  <div>
                    <h4 className="font-bold mb-2">Description</h4>
                    <p className="text-sm leading-relaxed">{selectedCounty.description}</p>
                  </div>
                )}

                {selectedCounty.nextStep && (
                  <div>
                    <h4 className="font-bold mb-2">Next Step</h4>
                    <p className="text-sm leading-relaxed">{selectedCounty.nextStep}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button className="btn-primary w-full">
                    CONTACT LOCAL REPRESENTATIVES
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
