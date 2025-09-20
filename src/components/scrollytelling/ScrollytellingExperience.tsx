'use client';

import { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';

interface ScrollytellingExperienceProps {
  sections?: any[]; // Will be typed properly with Sanity types
}

export default function ScrollytellingExperience({ sections }: ScrollytellingExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const currentSections = sections || defaultSections;

  return (
    <div ref={containerRef} className="relative">
      {/* 3D Animation Placeholder */}
      <div className="fixed inset-0 z-0 bg-white">
        <div className="flex items-center justify-center h-full">
          <motion.div
            style={{ opacity: scrollYProgress }}
            className="text-center"
          >
            <div className="w-96 h-96 bg-black mx-auto mb-8 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">3D ANIMATION</span>
            </div>
            <p className="text-black text-lg">Scroll to explore the experience</p>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10">
        {currentSections.map((section, index) => (
          <div
            key={section._id}
            className="min-h-screen flex items-center justify-end pr-8 lg:pr-16"
            style={{
              background: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-20%" }}
              className="max-w-md lg:max-w-lg p-8 bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000000]"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="h-0.5 flex-1 bg-black" />
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                  {section.title}
                </h2>
                
                <div className="text-black leading-relaxed">
                  {Array.isArray(section.content) && section.content[0]?.children?.[0]?.text ? (
                    <p>{section.content[0].children[0].text}</p>
                  ) : (
                    <p>Content loading...</p>
                  )}
                </div>
                
                {/* Section-specific call to action */}
                {index === currentSections.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 space-y-3"
                  >
                    <button className="w-full bg-black text-white py-3 px-6 font-bold hover:bg-gray-800 transition-colors">
                      CONTACT YOUR REPRESENTATIVE
                    </button>
                    <button className="w-full border-2 border-black text-black py-3 px-6 font-bold hover:bg-black hover:text-white transition-colors">
                      LEARN MORE ABOUT SINGLE STAIR
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Default sections for development
const defaultSections = [
  {
    _id: '1',
    title: 'Introduction to Single Stair Design',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'Discover how single-stair buildings revolutionize urban housing with better design, more space, and enhanced livability.',
          },
        ],
      },
    ],
    animationTrigger: 'fadeIn',
    cameraPosition: { x: 10, y: 5, z: 15 },
    duration: 2,
    models: ['singleStairBuilding'],
  },
  {
    _id: '2',
    title: 'Comparing Floor Plans',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'See the dramatic difference in usable space between single-stair and traditional double-egress designs.',
          },
        ],
      },
    ],
    animationTrigger: 'cameraMove',
    cameraPosition: { x: 0, y: 15, z: 10 },
    duration: 3,
    models: ['singleStairBuilding', 'doubleEgressBuilding'],
  },
  {
    _id: '3',
    title: 'Natural Light & Ventilation',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'Experience how single-stair design maximizes natural light and cross-ventilation for healthier living spaces.',
          },
        ],
      },
    ],
    animationTrigger: 'morph',
    cameraPosition: { x: -5, y: 8, z: 12 },
    duration: 2.5,
    models: ['singleStairBuilding', 'lightRays', 'ventilation'],
  },
  {
    _id: '4',
    title: 'Modern Fire Safety',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'Modern fire safety systems make single-stair buildings as safe as traditional designs, with better outcomes.',
          },
        ],
      },
    ],
    animationTrigger: 'slideUp',
    cameraPosition: { x: 8, y: 6, z: 18 },
    duration: 3,
    models: ['singleStairBuilding', 'fireSystem'],
  },
  {
    _id: '5',
    title: 'Take Action',
    content: [
      {
        _type: 'block',
        children: [
          {
            text: 'Ready to advocate for better housing design in North Carolina? Contact your representatives today.',
          },
        ],
      },
    ],
    animationTrigger: 'scale',
    cameraPosition: { x: -10, y: 8, z: 20 },
    duration: 2,
    models: ['singleStairBuilding'],
  },
];
