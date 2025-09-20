'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usStatesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';

interface USStatesMapProps {
  className?: string;
}

export default function USStatesMap({ className = '' }: USStatesMapProps) {
  const [selectedState, setSelectedState] = useState<PolicyProgress | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Create a lookup for state data
  const stateData = usStatesProgress.reduce((acc, state) => {
    acc[state.id] = state;
    return acc;
  }, {} as Record<string, PolicyProgress>);

  const handleStateClick = (stateId: string) => {
    const state = stateData[stateId];
    if (state) {
      setSelectedState(state);
    }
  };

  const getStateColor = (stateId: string) => {
    const state = stateData[stateId];
    if (!state) return '#f3f4f6'; // Light gray for no data
    
    if (hoveredState === stateId) {
      // Slightly darker on hover
      const baseColor = getStatusColor(state.status);
      return baseColor + 'dd'; // Add some transparency
    }
    
    return getStatusColor(state.status);
  };

  // Summary statistics
  const stats = {
    signed: usStatesProgress.filter(s => s.status === 'signed').length,
    inProgress: usStatesProgress.filter(s => ['committee', 'introduced', 'passed_chamber', 'passed_both'].includes(s.status)).length,
    studying: usStatesProgress.filter(s => s.status === 'studying').length,
    noActivity: usStatesProgress.filter(s => s.status === 'no_activity').length
  };

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white border-2 border-black p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black">UNITED STATES PROGRESS</h3>
          <div className="text-sm text-gray-600">
            Click states for details
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center border border-black p-3">
            <div className="text-2xl font-black text-green-600">{stats.signed}</div>
            <div className="text-xs font-bold">SIGNED</div>
          </div>
          <div className="text-center border border-black p-3">
            <div className="text-2xl font-black text-blue-600">{stats.inProgress}</div>
            <div className="text-xs font-bold">IN PROGRESS</div>
          </div>
          <div className="text-center border border-black p-3">
            <div className="text-2xl font-black text-purple-600">{stats.studying}</div>
            <div className="text-xs font-bold">STUDYING</div>
          </div>
          <div className="text-center border border-black p-3">
            <div className="text-2xl font-black text-gray-500">{stats.noActivity}</div>
            <div className="text-xs font-bold">NO ACTIVITY</div>
          </div>
        </div>

        {/* Simplified US States SVG Map */}
        <div className="relative">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-auto border border-black"
            style={{ maxHeight: '500px' }}
          >
            {/* Simplified state rectangles - in a real implementation, use actual state boundaries */}
            
            {/* West Coast */}
            <rect id="ca" x="50" y="200" width="80" height="120" fill={getStateColor('ca')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('ca')} onMouseEnter={() => setHoveredState('ca')} onMouseLeave={() => setHoveredState(null)} />
            <text x="90" y="265" textAnchor="middle" className="text-xs font-bold pointer-events-none">CA</text>

            <rect id="wa" x="50" y="100" width="70" height="60" fill={getStateColor('wa')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('wa')} onMouseEnter={() => setHoveredState('wa')} onMouseLeave={() => setHoveredState(null)} />
            <text x="85" y="135" textAnchor="middle" className="text-xs font-bold pointer-events-none">WA</text>

            <rect id="or" x="50" y="160" width="70" height="50" fill={getStateColor('or')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('or')} onMouseEnter={() => setHoveredState('or')} onMouseLeave={() => setHoveredState(null)} />
            <text x="85" y="190" textAnchor="middle" className="text-xs font-bold pointer-events-none">OR</text>

            {/* Southwest */}
            <rect id="az" x="150" y="280" width="70" height="60" fill={getStateColor('az')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('az')} onMouseEnter={() => setHoveredState('az')} onMouseLeave={() => setHoveredState(null)} />
            <text x="185" y="315" textAnchor="middle" className="text-xs font-bold pointer-events-none">AZ</text>

            <rect id="tx" x="350" y="320" width="120" height="80" fill={getStateColor('tx')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('tx')} onMouseEnter={() => setHoveredState('tx')} onMouseLeave={() => setHoveredState(null)} />
            <text x="410" y="365" textAnchor="middle" className="text-xs font-bold pointer-events-none">TX</text>

            {/* Mountain States */}
            <rect id="co" x="300" y="220" width="70" height="60" fill={getStateColor('co')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('co')} onMouseEnter={() => setHoveredState('co')} onMouseLeave={() => setHoveredState(null)} />
            <text x="335" y="255" textAnchor="middle" className="text-xs font-bold pointer-events-none">CO</text>

            {/* Midwest */}
            <rect id="il" x="500" y="200" width="60" height="70" fill={getStateColor('il')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('il')} onMouseEnter={() => setHoveredState('il')} onMouseLeave={() => setHoveredState(null)} />
            <text x="530" y="240" textAnchor="middle" className="text-xs font-bold pointer-events-none">IL</text>

            {/* Northeast */}
            <rect id="ny" x="700" y="150" width="80" height="70" fill={getStateColor('ny')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('ny')} onMouseEnter={() => setHoveredState('ny')} onMouseLeave={() => setHoveredState(null)} />
            <text x="740" y="190" textAnchor="middle" className="text-xs font-bold pointer-events-none">NY</text>

            <rect id="ma" x="800" y="160" width="50" height="40" fill={getStateColor('ma')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('ma')} onMouseEnter={() => setHoveredState('ma')} onMouseLeave={() => setHoveredState(null)} />
            <text x="825" y="185" textAnchor="middle" className="text-xs font-bold pointer-events-none">MA</text>

            <rect id="ct" x="780" y="180" width="40" height="30" fill={getStateColor('ct')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('ct')} onMouseEnter={() => setHoveredState('ct')} onMouseLeave={() => setHoveredState(null)} />
            <text x="800" y="200" textAnchor="middle" className="text-xs font-bold pointer-events-none">CT</text>

            {/* Southeast */}
            <rect id="fl" x="650" y="350" width="80" height="60" fill={getStateColor('fl')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('fl')} onMouseEnter={() => setHoveredState('fl')} onMouseLeave={() => setHoveredState(null)} />
            <text x="690" y="385" textAnchor="middle" className="text-xs font-bold pointer-events-none">FL</text>

            <rect id="ga" x="600" y="280" width="70" height="70" fill={getStateColor('ga')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('ga')} onMouseEnter={() => setHoveredState('ga')} onMouseLeave={() => setHoveredState(null)} />
            <text x="635" y="320" textAnchor="middle" className="text-xs font-bold pointer-events-none">GA</text>

            {/* North Carolina - Highlighted */}
            <rect id="nc" x="650" y="240" width="80" height="50" fill={getStateColor('nc')} stroke="#000" strokeWidth="3" className="cursor-pointer hover:stroke-4 transition-all" onClick={() => handleStateClick('nc')} onMouseEnter={() => setHoveredState('nc')} onMouseLeave={() => setHoveredState(null)} />
            <text x="690" y="270" textAnchor="middle" className="text-sm font-black pointer-events-none">NC</text>

            {/* Additional states - simplified for space */}
            <rect id="pa" x="680" y="180" width="70" height="50" fill={getStateColor('pa')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('pa')} onMouseEnter={() => setHoveredState('pa')} onMouseLeave={() => setHoveredState(null)} />
            <text x="715" y="210" textAnchor="middle" className="text-xs font-bold pointer-events-none">PA</text>

            <rect id="oh" x="600" y="190" width="70" height="60" fill={getStateColor('oh')} stroke="#000" strokeWidth="1" className="cursor-pointer hover:stroke-2 transition-all" onClick={() => handleStateClick('oh')} onMouseEnter={() => setHoveredState('oh')} onMouseLeave={() => setHoveredState(null)} />
            <text x="635" y="225" textAnchor="middle" className="text-xs font-bold pointer-events-none">OH</text>

            {/* Add more states as needed - this is a simplified version */}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('signed') }}></div>
            <span className="font-medium">Signed into Law</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('passed_both') }}></div>
            <span className="font-medium">Passed Legislature</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('committee') }}></div>
            <span className="font-medium">In Committee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('introduced') }}></div>
            <span className="font-medium">Bill Introduced</span>
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

      {/* State Detail Modal */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedState(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-black p-6 max-w-md mx-4 shadow-brutal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black">{selectedState.name}</h3>
                <button
                  onClick={() => setSelectedState(null)}
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
                      style={{ backgroundColor: getStatusColor(selectedState.status) }}
                    ></div>
                    <span className="font-bold">{getStatusLabel(selectedState.status)}</span>
                  </div>
                  
                  {selectedState.billNumber && (
                    <div className="text-sm mb-2">
                      <span className="font-bold">Bill:</span> {selectedState.billNumber}
                    </div>
                  )}

                  {selectedState.sponsor && (
                    <div className="text-sm mb-2">
                      <span className="font-bold">Sponsor:</span> {selectedState.sponsor}
                    </div>
                  )}

                  <div className="text-sm mb-2">
                    <span className="font-bold">Last Updated:</span> {new Date(selectedState.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                {selectedState.description && (
                  <div>
                    <h4 className="font-bold mb-2">Description</h4>
                    <p className="text-sm leading-relaxed">{selectedState.description}</p>
                  </div>
                )}

                {selectedState.nextStep && (
                  <div>
                    <h4 className="font-bold mb-2">Next Step</h4>
                    <p className="text-sm leading-relaxed">{selectedState.nextStep}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button className="btn-primary w-full">
                    CONTACT STATE REPRESENTATIVES
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
