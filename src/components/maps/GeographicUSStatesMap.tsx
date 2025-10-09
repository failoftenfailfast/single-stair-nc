'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { usStatesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';
import { fetchPolicyStates } from '@/lib/policyData';

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);

interface GeographicUSStatesMapProps {
  className?: string;
}

export default function GeographicUSStatesMap({ className = '' }: GeographicUSStatesMapProps) {
  const [selectedState, setSelectedState] = useState<PolicyProgress | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [statesProgress, setStatesProgress] = useState<PolicyProgress[]>(usStatesProgress);

  // Create a lookup for state data
  const stateData = statesProgress.reduce((acc, state) => {
    acc[state.id] = state;
    acc[state.name] = state;
    return acc;
  }, {} as Record<string, PolicyProgress>);

  useEffect(() => {
    setIsClient(true);
    
    // Load US states GeoJSON data
    fetch('/geojson/us-states.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      })
      .catch(error => {
        console.error('Error loading GeoJSON data:', error);
      });

    // Load policy data from CMS with fallback
    fetchPolicyStates()
      .then((data) => setStatesProgress(data))
      .catch(() => setStatesProgress(usStatesProgress));
  }, []);

  const getStateByName = (stateName: string): PolicyProgress | null => {
    // Try exact match first
    let state = stateData[stateName];
    if (state) return state;
    
    // Try by ID (state abbreviation)
    const stateId = Object.keys(stateData).find(id => 
      stateData[id].name.toLowerCase() === stateName.toLowerCase()
    );
    
    return stateId ? stateData[stateId] : null;
  };

  const onEachFeature = (feature: any, layer: any) => {
    const stateName = feature.properties.NAME || feature.properties.name;
    const state = getStateByName(stateName);
    
    if (state) {
      layer.bindPopup(`
        <div style="font-family: Inter, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${state.name}</h3>
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background-color: ${getStatusColor(state.status)}; margin-right: 8px; border: 1px solid var(--color-black);"></span>
            <strong>${getStatusLabel(state.status)}</strong>
          </div>
          ${state.billNumber ? `<div style="margin-bottom: 4px;"><strong>Bill:</strong> ${state.billNumber}</div>` : ''}
          ${state.sponsor ? `<div style="margin-bottom: 4px;"><strong>Sponsor:</strong> ${state.sponsor}</div>` : ''}
          <div style="margin-bottom: 8px; font-size: 12px; color: var(--color-gray-600);">
            Updated: ${new Date(state.lastUpdated).toLocaleDateString()}
          </div>
          <button onclick="window.selectState('${state.id}')" style="background: var(--color-black); color: var(--color-white); border: none; padding: 8px 16px; font-weight: bold; cursor: pointer; width: 100%;">
            VIEW DETAILS
          </button>
        </div>
      `);
    }

    layer.on({
      click: () => {
        if (state) {
          setSelectedState(state);
        }
      },
      mouseover: (e: any) => {
        e.target.setStyle({
          weight: 3,
          color: '#000',
          fillOpacity: 0.8
        });
      },
      mouseout: (e: any) => {
        e.target.setStyle({
          weight: 1,
          color: '#666',
          fillOpacity: 0.6
        });
      }
    });
  };

  const style = (feature: any) => {
    const stateName = feature.properties.NAME || feature.properties.name;
    const state = getStateByName(stateName);
    
    return {
      fillColor: state ? getStatusColor(state.status) : 'var(--color-gray-100)',
      weight: stateName === 'North Carolina' ? 3 : 1,
      opacity: 1,
      color: stateName === 'North Carolina' ? 'var(--color-black)' : 'var(--color-gray-600)',
      fillOpacity: 0.6
    };
  };

  // Summary statistics
  const stats = {
    signed: statesProgress.filter(s => s.status === 'signed').length,
    inProgress: statesProgress.filter(s => ['committee', 'introduced', 'passed_chamber', 'passed_both'].includes(s.status)).length,
    studying: statesProgress.filter(s => s.status === 'studying').length,
    noActivity: statesProgress.filter(s => s.status === 'no_activity').length
  };

  if (!isClient) {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-white border-2 border-black p-6">
          <div className="h-96 border border-black bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto mb-2"></div>
              <span className="text-sm font-bold">Loading Geographic Map...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-white border-2 border-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black">UNITED STATES PROGRESS</h3>
          <div className="text-sm text-content-secondary">
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

        {/* Real Geographic Map */}
        <div className="relative h-96 border-2 border-border-primary">
          {geoData && (
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON
                data={geoData}
                style={style}
                onEachFeature={onEachFeature}
              />
            </MapContainer>
          )}
          
          {!geoData && (
            <div className="absolute inset-0 flex items-center justify-center bg-earth-sand-100">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin mx-auto mb-2"></div>
                <span className="text-sm font-bold">Loading Map Data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6">
          <div className="text-xs text-content-secondary mb-3 text-center">
            Hover over each status to learn more
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="Bill has been signed into law and is now enforceable"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('signed') }}></div>
              <span className="font-medium">Signed into Law</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">Signed into Law</div>
                <div className="text-xs leading-relaxed">Bill has been signed into law and is now enforceable. Implementation guidelines may still be in development.</div>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="Bill has passed both legislative chambers"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('passed_both') }}></div>
              <span className="font-medium">Passed Legislature</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">Passed Legislature</div>
                <div className="text-xs leading-relaxed">Bill has passed both legislative chambers and is awaiting governor or executive signature.</div>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="Bill is being reviewed by a legislative committee"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('committee') }}></div>
              <span className="font-medium">In Committee</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">In Committee</div>
                <div className="text-xs leading-relaxed">Bill is being reviewed by a legislative committee. Public hearings and amendments may occur before a committee vote.</div>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="Legislation has been formally introduced"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('introduced') }}></div>
              <span className="font-medium">Bill Introduced</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">Bill Introduced</div>
                <div className="text-xs leading-relaxed">Legislation has been formally introduced and assigned a bill number. Next step is typically committee referral.</div>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="Preliminary research or feasibility study underway"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('studying') }}></div>
              <span className="font-medium">Under Study</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">Under Study</div>
                <div className="text-xs leading-relaxed">Preliminary research or feasibility study underway. No legislation has been drafted yet.</div>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 group relative cursor-help p-2 rounded hover:bg-earth-sand-50 transition-colors"
              title="No known single-stair legislation or study"
            >
              <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('no_activity') }}></div>
              <span className="font-medium">No Activity</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs p-3 rounded shadow-lg w-64 z-10">
                <div className="font-bold mb-1">No Activity</div>
                <div className="text-xs leading-relaxed">No known single-stair legislation or study in this jurisdiction. Contact your representatives to get started!</div>
              </div>
            </div>
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
              className="bg-surface-primary border border-border-primary p-6 max-w-lg mx-4 shadow-soft"
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
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-6 h-6 border border-black"
                      style={{ backgroundColor: getStatusColor(selectedState.status) }}
                    ></div>
                    <span className="font-bold text-lg">{getStatusLabel(selectedState.status)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedState.billNumber && (
                      <div>
                        <span className="font-bold">Bill Number:</span>
                        <br />
                        <span className="bg-gray-100 px-2 py-1 font-mono">{selectedState.billNumber}</span>
                      </div>
                    )}

                    {selectedState.sponsor && (
                      <div>
                        <span className="font-bold">Sponsor:</span>
                        <br />
                        {selectedState.sponsor}
                      </div>
                    )}

                    <div>
                      <span className="font-bold">Last Updated:</span>
                      <br />
                      {new Date(selectedState.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {selectedState.description && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Description</h4>
                    <p className="text-sm leading-relaxed bg-gray-50 p-3 border border-gray-200">
                      {selectedState.description}
                    </p>
                  </div>
                )}

                {selectedState.nextStep && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Next Steps</h4>
                    <p className="text-sm leading-relaxed bg-blue-50 p-3 border border-blue-200">
                      {selectedState.nextStep}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button className="btn-primary w-full">
                    CONTACT STATE REPRESENTATIVES
                  </button>
                  <button className="btn-secondary w-full">
                    GET UPDATES ON {selectedState.name.toUpperCase()}
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







