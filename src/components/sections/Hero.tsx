'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="container-custom text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-4 leading-none">
              SINGLE
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-4 leading-none">
              STAIR
            </h1>
            <div className="w-full h-1 bg-black mb-4"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              NORTH CAROLINA
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-black mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            ADVOCATING FOR BETTER HOUSING DESIGN THROUGH SINGLE-STAIR BUILDINGS.<br />
            CREATING MORE LIVABLE, AFFORDABLE, AND SUSTAINABLE COMMUNITIES.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-12 py-4 shadow-brutal">
              EXPLORE THE EXPERIENCE
            </button>
            
            <button className="btn-secondary text-lg px-12 py-4 shadow-brutal">
              TAKE ACTION NOW
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-black">
            <span className="text-sm font-bold mb-3 tracking-wider">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-12 border-2 border-black flex justify-center"
            >
              <div className="w-1 h-4 bg-black mt-2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-16 h-16 border-2 border-black hidden lg:block"></div>
      <div className="absolute top-32 right-12 w-24 h-24 border-2 border-black hidden lg:block"></div>
      <div className="absolute bottom-20 left-16 w-20 h-20 border-2 border-black hidden lg:block"></div>
    </section>
  );
}