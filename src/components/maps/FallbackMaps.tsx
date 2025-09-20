'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ncCountiesProgress, usStatesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';

// Fallback NC Counties Map (no API required)
export function FallbackNCCountiesMap({ className = '' }: { className?: string }) {
  const [selectedCounty, setSelectedCounty] = useState<PolicyProgress | null>(null);

  const countyData = ncCountiesProgress.reduce((acc, county) => {
    acc[county.id] = county;
    return acc;
  }, {} as Record<string, PolicyProgress>);

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white border-2 border-black p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black">NORTH CAROLINA COUNTIES</h3>
          <div className="text-sm text-gray-600">
            Click for details
          </div>
        </div>

        {/* List View of Counties */}
        <div className="grid md:grid-cols-2 gap-4">
          {ncCountiesProgress.map((county) => (
            <div
              key={county.id}
              onClick={() => setSelectedCounty(county)}
              className="border border-black p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{county.name}</h4>
                  <p className="text-xs text-gray-600">{getStatusLabel(county.status)}</p>
                </div>
                <div 
                  className="w-4 h-4 border border-black"
                  style={{ backgroundColor: getStatusColor(county.status) }}
                ></div>
              </div>
              {county.billNumber && (
                <div className="text-xs text-gray-500 mt-1">{county.billNumber}</div>
              )}
            </div>
          ))}
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

// Fallback US States Map (no API required)
export function FallbackUSStatesMap({ className = '' }: { className?: string }) {
  const [selectedState, setSelectedState] = useState<PolicyProgress | null>(null);

  // Summary statistics
  const stats = {
    signed: usStatesProgress.filter(s => s.status === 'signed').length,
    inProgress: usStatesProgress.filter(s => ['committee', 'introduced', 'passed_chamber', 'passed_both'].includes(s.status)).length,
    studying: usStatesProgress.filter(s => s.status === 'studying').length,
    noActivity: usStatesProgress.filter(s => s.status === 'no_activity').length
  };

  // Group states by status
  const statesByStatus = usStatesProgress.reduce((acc, state) => {
    if (!acc[state.status]) acc[state.status] = [];
    acc[state.status].push(state);
    return acc;
  }, {} as Record<string, PolicyProgress[]>);

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

        {/* States organized by status */}
        <div className="space-y-6">
          {/* Leading States */}
          {(statesByStatus.signed || statesByStatus.passed_both) && (
            <div>
              <h4 className="font-black text-sm mb-3 text-green-600">🏆 LEADING STATES</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  ...(statesByStatus.signed || []),
                  ...(statesByStatus.passed_both || [])
                ].map((state) => (
                  <div
                    key={state.id}
                    onClick={() => setSelectedState(state)}
                    className="border-2 border-green-600 p-4 cursor-pointer hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm">{state.name}</span>
                      <div 
                        className="w-4 h-4 border border-black"
                        style={{ backgroundColor: getStatusColor(state.status) }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {getStatusLabel(state.status)}
                    </div>
                    {state.billNumber && (
                      <div className="text-xs text-green-700 font-medium">{state.billNumber}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Legislation */}
          {(statesByStatus.committee || statesByStatus.introduced || statesByStatus.passed_chamber) && (
            <div>
              <h4 className="font-black text-sm mb-3 text-blue-600">📋 ACTIVE LEGISLATION</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  ...(statesByStatus.passed_chamber || []),
                  ...(statesByStatus.committee || []),
                  ...(statesByStatus.introduced || [])
                ].map((state) => (
                  <div
                    key={state.id}
                    onClick={() => setSelectedState(state)}
                    className="border border-blue-600 p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{state.name}</span>
                      <div 
                        className="w-4 h-4 border border-black"
                        style={{ backgroundColor: getStatusColor(state.status) }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {getStatusLabel(state.status)}
                    </div>
                    {state.billNumber && (
                      <div className="text-xs text-blue-700 font-medium">{state.billNumber}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research & Study */}
          {statesByStatus.studying && statesByStatus.studying.length > 0 && (
            <div>
              <h4 className="font-black text-sm mb-3 text-purple-600">🔍 RESEARCH & STUDY</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {statesByStatus.studying.map((state) => (
                  <div
                    key={state.id}
                    onClick={() => setSelectedState(state)}
                    className="border border-purple-600 p-3 cursor-pointer hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{state.name}</span>
                      <div className="w-3 h-3 bg-purple-600"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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