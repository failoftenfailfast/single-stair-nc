'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, queries } from '@/lib/sanity';

interface SiteSettingsData {
  title?: string;
  description?: string;
}

export default function Hero() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    client
      .fetch(queries.siteSettings)
      .then((data: SiteSettingsData) => setSiteSettings(data))
      .catch(() => {});
  }, []);

  const heroTitle = siteSettings?.title || 'Fewer stairs, cheaper housing?';
  const heroSubtitle = siteSettings?.description || "Discover how single-stair buildings can transform North Carolina's housing landscape.";

  return (
    <section className="relative min-h-screen flex items-center justify-center surface-primary">
      <div className="container-custom text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-section">
            <h1 className="text-display-lg md:text-display-xl text-balance mb-content">
              {heroTitle}
            </h1>
            <div className="w-full h-1 bg-gradient-to-r from-brand-500 via-earth-sand-300 to-earth-sage-500/80 mb-element"></div>
          </div>
          
          <p className="text-body-lg text-content-secondary mb-section-lg max-w-3xl mx-auto text-balance font-serif normal-case">
            {heroSubtitle}
          </p>

          {/* Stair Placeholder Image */}
          <div className="mb-section-lg">
            <div className="max-w-2xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-earth-sand-100 to-earth-sand-200 border border-border-primary shadow-soft flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4 text-brand-500">🏠</div>
                  <div className="text-lg font-bold text-content-primary mb-2">
                    SINGLE STAIR BUILDING
                  </div>
                  <div className="text-sm text-content-secondary">
                    Visual representation placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-section left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-content-primary">
            <span className="text-caption mb-tight">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-12 border border-border-primary flex justify-center"
            >
              <div className="w-1 h-4 bg-brand-600 mt-2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements removed to de-brutalize the homepage */}
    </section>
  );
}