'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center surface-primary">
      <div className="container-custom text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-section">
            <h1 className="text-display-lg md:text-display-xl text-balance mb-content">
              HOW CAN A STAIRCASE MAKE HOUSING MORE AFFORDABLE IN NORTH CAROLINA?
            </h1>
            <div className="w-full h-1 bg-border-primary mb-element"></div>
          </div>
          
          <p className="text-body-lg text-content-secondary mb-section-lg max-w-3xl mx-auto text-balance">
            ADVOCATING FOR BETTER HOUSING DESIGN THROUGH SINGLE-STAIR BUILDINGS.<br />
            CREATING MORE LIVABLE, AFFORDABLE, AND SUSTAINABLE COMMUNITIES.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-element justify-center">
            <button className="btn-primary btn-large">
              EXPLORE THE EXPERIENCE
            </button>
            
            <button className="btn-secondary btn-large">
              TAKE ACTION NOW
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-section left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-content-primary">
            <span className="text-caption mb-tight">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-12 border-brutal flex justify-center"
            >
              <div className="w-1 h-4 bg-border-primary mt-2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-section w-16 h-16 border-brutal hidden lg:block"></div>
      <div className="absolute top-32 right-12 w-24 h-24 border-brutal hidden lg:block"></div>
      <div className="absolute bottom-20 left-16 w-20 h-20 border-brutal hidden lg:block"></div>
    </section>
  );
}