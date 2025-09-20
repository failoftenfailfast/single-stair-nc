'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GeographicUSStatesMap from './GeographicUSStatesMap';
import GeographicNCCountiesMap from './GeographicNCCountiesMap';
import SimpleProgressMaps from './SimpleProgressMaps';

interface GeographicProgressMapsProps {
  className?: string;
}

export default function GeographicProgressMaps({ className = '' }: GeographicProgressMapsProps) {
  const [mapType, setMapType] = useState<'geographic' | 'list'>('geographic');

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Map Type Toggle */}
      <div className="flex justify-center">
        <div className="border-2 border-black inline-flex">
          <button
            onClick={() => setMapType('geographic')}
            className={`px-6 py-3 font-bold text-sm transition-colors ${
              mapType === 'geographic' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            🗺️ GEOGRAPHIC MAPS
          </button>
          <button
            onClick={() => setMapType('list')}
            className={`px-6 py-3 font-bold text-sm transition-colors border-l-2 border-black ${
              mapType === 'list' 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            📋 ORGANIZED LISTS
          </button>
        </div>
      </div>

      {mapType === 'geographic' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Geographic Maps */}
          <div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black mb-2">REAL GEOGRAPHIC DATA</h3>
              <p className="text-sm text-gray-600">
                Interactive maps using OpenStreetMap and US Census Bureau data
              </p>
            </div>
            
            <div className="space-y-8">
              <GeographicUSStatesMap />
              <GeographicNCCountiesMap />
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-gray-50 border border-gray-300 p-4 text-center">
            <h4 className="font-bold text-sm mb-2">DATA SOURCES</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <span className="font-bold">Geographic Boundaries:</span>
                <br />
                US Census Bureau (Public Domain)
              </div>
              <div>
                <span className="font-bold">Map Tiles:</span>
                <br />
                OpenStreetMap Contributors (Free)
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SimpleProgressMaps />
        </motion.div>
      )}
    </div>
  );
}
