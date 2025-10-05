'use client';

import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';

interface ScrollytellingContentProps {
  sections: any[];
  currentSection: number;
  sectionRefs: (HTMLDivElement | null)[];
}

export default function ScrollytellingContent({ 
  sections, 
  currentSection, 
  sectionRefs 
}: ScrollytellingContentProps) {
  
  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    if (sectionRefs) {
      sectionRefs[index] = el;
    }
  };

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div
          key={section._id}
          ref={setRef(index)}
          className="min-h-screen flex items-center justify-end pr-8 lg:pr-16"
          style={{
            background: index % 2 === 0 
              ? 'linear-gradient(135deg, rgba(75, 156, 211, 0.08), rgba(62, 131, 178, 0.1))' // brand blues
              : 'linear-gradient(135deg, rgba(120, 157, 129, 0.08), rgba(95, 139, 101, 0.1))' // sage greens
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-20%" }}
            className={`max-w-md lg:max-w-lg p-8 rounded-2xl shadow-soft ${
              currentSection === index 
                ? 'glass border-brand-200' 
                : 'bg-white/70 backdrop-blur-sm'
            }`}
          >
            <motion.div
              animate={{
                scale: currentSection === index ? 1.05 : 1,
                borderColor: currentSection === index ? '#4b9cd3' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentSection === index 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {index + 1}
                </div>
                <div className={`h-0.5 flex-1 ${
                  currentSection >= index ? 'bg-brand-600' : 'bg-neutral-200'
                }`} />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                {section.title}
              </h2>
              
              <div className="prose prose-lg text-content-secondary">
                {section.content && Array.isArray(section.content) ? (
                  <PortableText 
                    value={section.content}
                    components={{
                      block: {
                        normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                      },
                    }}
                  />
                ) : (
                  <p className="mb-4 leading-relaxed">
                    {typeof section.content === 'string' ? section.content : 'Content loading...'}
                  </p>
                )}
              </div>
              
              {/* Section-specific call to action */}
              {index === sections.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 space-y-3"
                >
                  <button className="btn-primary w-full">
                    Contact Your Representative
                  </button>
                  <button className="btn-ghost w-full">
                    Learn More About Single Stair
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      ))}
      
      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-2">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-8 rounded-full ${
                currentSection >= index ? 'bg-brand-600' : 'bg-neutral-300'
              }`}
              animate={{
                backgroundColor: currentSection >= index ? '#4b9cd3' : '#D1D5DB',
                scale: currentSection === index ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


