'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ncCountiesProgress, usStatesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';

interface SimpleProgressMapsProps {
  className?: string;
}

export default function SimpleProgressMaps({ className = '' }: SimpleProgressMapsProps) {
  const [selectedItem, setSelectedItem] = useState<PolicyProgress | null>(null);
  const [activeMap, setActiveMap] = useState<'us' | 'nc'>('us');

  // Summary statistics
  const stats = {
    signed: usStatesProgress.filter(s => s.status === 'signed').length,
    inProgress: usStatesProgress.filter(s => ['committee', 'introduced', 'passed_chamber', 'passed_both'].includes(s.status)).length,
    studying: usStatesProgress.filter(s => s.status === 'studying').length,
    totalStates: usStatesProgress.length
  };

  const ncStats = {
    active: ncCountiesProgress.filter(c => c.status !== 'no_activity').length,
    total: ncCountiesProgress.length
  };

  // Group data by status
  const statesByStatus = usStatesProgress.reduce((acc, state) => {
    if (!acc[state.status]) acc[state.status] = [];
    acc[state.status].push(state);
    return acc;
  }, {} as Record<string, PolicyProgress[]>);

  const countiesByStatus = ncCountiesProgress.reduce((acc, county) => {
    if (!acc[county.status]) acc[county.status] = [];
    acc[county.status].push(county);
    return acc;
  }, {} as Record<string, PolicyProgress[]>);

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Map Type Toggle */}
      <div className="flex justify-center">
        <div className="border-2 border-black inline-flex">
          <button
            onClick={() => setActiveMap('us')}
            className={`px-8 py-3 font-bold text-sm transition-colors ${
              activeMap === 'us' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            UNITED STATES
          </button>
          <button
            onClick={() => setActiveMap('nc')}
            className={`px-8 py-3 font-bold text-sm transition-colors border-l-2 border-black ${
              activeMap === 'nc' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            NORTH CAROLINA
          </button>
        </div>
      </div>

      {/* US States View */}
      {activeMap === 'us' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-black p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">UNITED STATES PROGRESS</h3>
            <div className="text-sm text-gray-600">
              {stats.inProgress + stats.signed + stats.studying} of {stats.totalStates} states active
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center border border-black p-4">
              <div className="text-3xl font-black text-green-600">{stats.signed}</div>
              <div className="text-xs font-bold">SIGNED INTO LAW</div>
            </div>
            <div className="text-center border border-black p-4">
              <div className="text-3xl font-black text-blue-600">{stats.inProgress}</div>
              <div className="text-xs font-bold">ACTIVE LEGISLATION</div>
            </div>
            <div className="text-center border border-black p-4">
              <div className="text-3xl font-black text-purple-600">{stats.studying}</div>
              <div className="text-xs font-bold">UNDER STUDY</div>
            </div>
            <div className="text-center border border-black p-4">
              <div className="text-3xl font-black text-gray-500">{stats.totalStates - stats.signed - stats.inProgress - stats.studying}</div>
              <div className="text-xs font-bold">NO ACTIVITY</div>
            </div>
          </div>

          {/* States by Status */}
          <div className="space-y-8">
            {/* Leading States */}
            {(statesByStatus.signed || statesByStatus.passed_both) && (
              <div>
                <h4 className="font-black text-lg mb-4 text-green-600 border-b-2 border-green-600 pb-2">
                  🏆 LEADING STATES
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    ...(statesByStatus.signed || []),
                    ...(statesByStatus.passed_both || [])
                  ].map((state) => (
                    <motion.div
                      key={state.id}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedItem(state)}
                      className="border-2 border-green-600 p-4 cursor-pointer hover:bg-green-50 transition-colors shadow-brutal-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-lg">{state.name}</span>
                        <div 
                          className="w-6 h-6 border border-black"
                          style={{ backgroundColor: getStatusColor(state.status) }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {getStatusLabel(state.status)}
                      </div>
                      {state.billNumber && (
                        <div className="text-sm text-green-700 font-bold bg-green-100 px-2 py-1">
                          {state.billNumber}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Legislation */}
            {(statesByStatus.committee || statesByStatus.introduced || statesByStatus.passed_chamber) && (
              <div>
                <h4 className="font-black text-lg mb-4 text-blue-600 border-b-2 border-blue-600 pb-2">
                  📋 ACTIVE LEGISLATION
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    ...(statesByStatus.passed_chamber || []),
                    ...(statesByStatus.committee || []),
                    ...(statesByStatus.introduced || [])
                  ].map((state) => (
                    <motion.div
                      key={state.id}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedItem(state)}
                      className="border border-blue-600 p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base">{state.name}</span>
                        <div 
                          className="w-5 h-5 border border-black"
                          style={{ backgroundColor: getStatusColor(state.status) }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {getStatusLabel(state.status)}
                      </div>
                      {state.billNumber && (
                        <div className="text-xs text-blue-700 font-medium bg-blue-100 px-2 py-1">
                          {state.billNumber}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Research & Study */}
            {statesByStatus.studying && statesByStatus.studying.length > 0 && (
              <div>
                <h4 className="font-black text-lg mb-4 text-purple-600 border-b-2 border-purple-600 pb-2">
                  🔍 RESEARCH & STUDY
                </h4>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {statesByStatus.studying.map((state) => (
                    <motion.div
                      key={state.id}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedItem(state)}
                      className="border border-purple-600 p-4 cursor-pointer hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{state.name}</span>
                        <div className="w-4 h-4 bg-purple-600"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* NC Counties View */}
      {activeMap === 'nc' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-black p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black">NORTH CAROLINA COUNTIES</h3>
            <div className="text-sm text-gray-600">
              {ncStats.active} of {ncStats.total} counties with activity
            </div>
          </div>

          {/* NC Counties by Status */}
          <div className="space-y-8">
            {/* Active Counties */}
            {(countiesByStatus.committee || countiesByStatus.introduced || countiesByStatus.studying) && (
              <div>
                <h4 className="font-black text-lg mb-4 text-blue-600 border-b-2 border-blue-600 pb-2">
                  🏛️ ACTIVE COUNTIES
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    ...(countiesByStatus.committee || []),
                    ...(countiesByStatus.introduced || []),
                    ...(countiesByStatus.studying || [])
                  ].map((county) => (
                    <motion.div
                      key={county.id}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedItem(county)}
                      className="border border-blue-600 p-4 cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-base">{county.name}</span>
                        <div 
                          className="w-5 h-5 border border-black"
                          style={{ backgroundColor: getStatusColor(county.status) }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {getStatusLabel(county.status)}
                      </div>
                      {county.billNumber && (
                        <div className="text-xs text-blue-700 font-medium bg-blue-100 px-2 py-1">
                          {county.billNumber}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        Updated: {new Date(county.lastUpdated).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Counties List */}
            <div>
              <h4 className="font-black text-lg mb-4 text-black border-b-2 border-black pb-2">
                📍 ALL COUNTIES
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {ncCountiesProgress.map((county) => (
                  <div
                    key={county.id}
                    onClick={() => setSelectedItem(county)}
                    className="border border-gray-300 p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{county.name}</span>
                      <div 
                        className="w-3 h-3 border border-black"
                        style={{ backgroundColor: getStatusColor(county.status) }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getStatusLabel(county.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-black p-6 max-w-lg mx-4 shadow-brutal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black">{selectedItem.name}</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-6 h-6 border border-black"
                      style={{ backgroundColor: getStatusColor(selectedItem.status) }}
                    ></div>
                    <span className="font-bold text-lg">{getStatusLabel(selectedItem.status)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedItem.billNumber && (
                      <div>
                        <span className="font-bold">Bill Number:</span>
                        <br />
                        <span className="bg-gray-100 px-2 py-1 font-mono">{selectedItem.billNumber}</span>
                      </div>
                    )}

                    {selectedItem.sponsor && (
                      <div>
                        <span className="font-bold">Sponsor:</span>
                        <br />
                        {selectedItem.sponsor}
                      </div>
                    )}

                    <div>
                      <span className="font-bold">Last Updated:</span>
                      <br />
                      {new Date(selectedItem.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {selectedItem.description && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Description</h4>
                    <p className="text-sm leading-relaxed bg-gray-50 p-3 border border-gray-200">
                      {selectedItem.description}
                    </p>
                  </div>
                )}

                {selectedItem.nextStep && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Next Steps</h4>
                    <p className="text-sm leading-relaxed bg-blue-50 p-3 border border-blue-200">
                      {selectedItem.nextStep}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button className="btn-primary w-full">
                    CONTACT REPRESENTATIVES
                  </button>
                  <button className="btn-secondary w-full">
                    GET UPDATES ON THIS {activeMap === 'us' ? 'STATE' : 'COUNTY'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="bg-gray-50 border border-gray-300 p-4">
        <h4 className="font-bold text-sm mb-3">LEGEND</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('signed') }}></div>
            <span className="font-medium">Signed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('passed_both') }}></div>
            <span className="font-medium">Passed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('committee') }}></div>
            <span className="font-medium">Committee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('introduced') }}></div>
            <span className="font-medium">Introduced</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('studying') }}></div>
            <span className="font-medium">Studying</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-black" style={{ backgroundColor: getStatusColor('no_activity') }}></div>
            <span className="font-medium">No Activity</span>
          </div>
        </div>
      </div>

      {/* API Integration Note */}
      <div className="bg-gray-100 border border-gray-400 p-4 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-bold">Want interactive geographic maps?</span>
          <br />
          Add a Mapbox API token to enable full interactive mapping with real geographic boundaries.
          <br />
          <span className="text-xs text-gray-500">
            Current view shows organized data without requiring external APIs.
          </span>
        </p>
      </div>
    </div>
  );
}







