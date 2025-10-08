'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ncCountiesProgress, getStatusColor, getStatusLabel, PolicyProgress } from '@/data/policyProgress';

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

interface GeographicNCCountiesMapProps {
  className?: string;
}

export default function GeographicNCCountiesMap({ className = '' }: GeographicNCCountiesMapProps) {
  const [selectedCounty, setSelectedCounty] = useState<PolicyProgress | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Create a lookup for county data
  const countyData = ncCountiesProgress.reduce((acc, county) => {
    acc[county.id] = county;
    acc[county.name] = county;
    return acc;
  }, {} as Record<string, PolicyProgress>);

  useEffect(() => {
    setIsClient(true);
    
    // Load NC counties GeoJSON data (filtered from US counties data)
    fetch('/geojson/nc-counties.json')
      .then(response => response.json())
      .then(data => {
        // Filter for NC counties only (STATE code 37)
        const ncCounties = {
          ...data,
          features: data.features.filter((feature: any) => 
            feature.properties.STATE === '37' || 
            feature.properties.STATEFP === '37'
          )
        };
        setGeoData(ncCounties);
      })
      .catch(error => {
        console.error('Error loading NC counties GeoJSON data:', error);
      });
  }, []);

  const getCountyByName = (countyName: string): PolicyProgress | null => {
    // Clean county name (remove "County" suffix if present)
    const cleanName = countyName.replace(/\s+County$/i, '').trim();
    
    // Try exact match first
    let county = countyData[cleanName];
    if (county) return county;
    
    // Try partial match
    const countyKey = Object.keys(countyData).find(key => 
      countyData[key].name.toLowerCase().includes(cleanName.toLowerCase()) ||
      cleanName.toLowerCase().includes(countyData[key].name.toLowerCase().replace(/\s+county$/i, ''))
    );
    
    return countyKey ? countyData[countyKey] : null;
  };

  const onEachFeature = (feature: any, layer: any) => {
    const countyName = feature.properties.NAME || feature.properties.name;
    const county = getCountyByName(countyName);
    
    if (county) {
      layer.bindPopup(`
        <div style="font-family: Inter, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${county.name}</h3>
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background-color: ${getStatusColor(county.status)}; margin-right: 8px; border: 1px solid var(--color-black);"></span>
            <strong>${getStatusLabel(county.status)}</strong>
          </div>
          ${county.billNumber ? `<div style="margin-bottom: 4px;"><strong>Bill:</strong> ${county.billNumber}</div>` : ''}
          ${county.sponsor ? `<div style="margin-bottom: 4px;"><strong>Sponsor:</strong> ${county.sponsor}</div>` : ''}
          <div style="margin-bottom: 8px; font-size: 12px; color: var(--color-gray-600);">
            Updated: ${new Date(county.lastUpdated).toLocaleDateString()}
          </div>
          <button onclick="window.selectCounty('${county.id}')" style="background: var(--color-black); color: var(--color-white); border: none; padding: 8px 16px; font-weight: bold; cursor: pointer; width: 100%;">
            VIEW DETAILS
          </button>
        </div>
      `);
    } else {
      layer.bindPopup(`
        <div style="font-family: Inter, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${countyName}</h3>
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; width: 12px; height: 12px; background-color: #9ca3af; margin-right: 8px; border: 1px solid var(--color-black);"></span>
            <strong>No Activity</strong>
          </div>
          <div style="font-size: 12px; color: var(--color-gray-600);">
            No current single-stair legislation
          </div>
        </div>
      `);
    }

    layer.on({
      click: () => {
        if (county) {
          setSelectedCounty(county);
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
    const countyName = feature.properties.NAME || feature.properties.name;
    const county = getCountyByName(countyName);
    
    return {
      fillColor: county ? getStatusColor(county.status) : 'var(--color-gray-100)',
      weight: 1,
      opacity: 1,
      color: 'var(--color-gray-600)',
      fillOpacity: 0.6
    };
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
          <h3 className="text-xl font-black">NORTH CAROLINA COUNTIES</h3>
          <div className="text-sm text-content-secondary">
            Click counties for details
          </div>
        </div>

        {/* Real Geographic Map */}
        <div className="relative h-96 border-2 border-border-primary">
          {geoData && (
            <MapContainer
              center={[35.7596, -79.0193]}
              zoom={7}
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
                <span className="text-sm font-bold">Loading County Data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('signed') }}></div>
            <span className="font-medium">Signed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('committee') }}></div>
            <span className="font-medium">In Committee</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('studying') }}></div>
            <span className="font-medium">Under Study</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border border-border-primary" style={{ backgroundColor: getStatusColor('no_activity') }}></div>
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
              className="bg-surface-primary border border-border-primary p-6 max-w-lg mx-4 shadow-soft"
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
                  <div className="flex items-center space-x-3 mb-3">
                    <div 
                      className="w-6 h-6 border border-black"
                      style={{ backgroundColor: getStatusColor(selectedCounty.status) }}
                    ></div>
                    <span className="font-bold text-lg">{getStatusLabel(selectedCounty.status)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedCounty.billNumber && (
                      <div>
                        <span className="font-bold">Bill Number:</span>
                        <br />
                    <span className="bg-earth-sand-100 px-2 py-1 font-mono">{selectedCounty.billNumber}</span>
                      </div>
                    )}

                    {selectedCounty.sponsor && (
                      <div>
                        <span className="font-bold">Sponsor:</span>
                        <br />
                        {selectedCounty.sponsor}
                      </div>
                    )}

                    <div>
                      <span className="font-bold">Last Updated:</span>
                      <br />
                      {new Date(selectedCounty.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {selectedCounty.description && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Description</h4>
                    <p className="text-sm leading-relaxed bg-earth-sand-100 p-3 border border-border-secondary">
                      {selectedCounty.description}
                    </p>
                  </div>
                )}

                {selectedCounty.nextStep && (
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Next Steps</h4>
                    <p className="text-sm leading-relaxed bg-brand-50 p-3 border border-brand-200">
                      {selectedCounty.nextStep}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button className="btn-primary w-full">
                    CONTACT LOCAL REPRESENTATIVES
                  </button>
                  <button className="btn-secondary w-full">
                    GET UPDATES ON {selectedCounty.name.toUpperCase()}
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







