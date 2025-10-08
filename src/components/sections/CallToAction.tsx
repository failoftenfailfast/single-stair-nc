'use client';

import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="section-padding bg-black text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
          >
            READY TO MAKE A
            <br />
            <span className="border-b-4 border-nc-gold">DIFFERENCE?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            JOIN THOUSANDS OF NORTH CAROLINIANS ADVOCATING FOR BETTER HOUSING POLICY.<br />
            YOUR VOICE CAN HELP SHAPE THE FUTURE OF OUR COMMUNITIES.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -4 }}
              className="border-2 border-white p-8 text-center hover:bg-white hover:text-black transition-colors group"
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-nc-red flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-nc-red group-hover:text-white">@</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wide">CONTACT YOUR REP</h3>
              <p className="text-sm leading-relaxed">
                SEND A PERSONALIZED MESSAGE TO YOUR REPRESENTATIVES
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -4 }}
              className="border-2 border-white p-8 text-center hover:bg-white hover:text-black transition-colors group"
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-nc-blue flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-nc-blue group-hover:text-white">#</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wide">TRACK PROGRESS</h3>
              <p className="text-sm leading-relaxed">
                FOLLOW LEGISLATION PROGRESS IN REAL-TIME
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -4 }}
              className="border-2 border-white p-8 text-center hover:bg-white hover:text-black transition-colors group"
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-nc-gold flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-nc-gold group-hover:text-white">■</span>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wide">SEE EXAMPLES</h3>
              <p className="text-sm leading-relaxed">
                EXPLORE SUCCESSFUL SINGLE-STAIR BUILDINGS
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-surface-primary text-content-primary hover:bg-brand-500 hover:text-white border border-border-primary px-12 py-4 font-medium text-lg transition-colors shadow-soft"
            >
              FIND YOUR REPRESENTATIVE
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-border-primary bg-surface-inverse text-content-inverse hover:bg-surface-primary hover:text-content-primary px-12 py-4 font-medium text-lg transition-colors shadow-soft"
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
