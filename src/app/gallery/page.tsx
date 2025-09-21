'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'ALL PROJECTS' },
    { id: 'residential', label: 'RESIDENTIAL' },
    { id: 'mixed-use', label: 'MIXED USE' },
    { id: 'adaptive', label: 'ADAPTIVE REUSE' },
  ];

  const projects = [
    {
      id: 1,
      title: 'CHARLOTTE COMMONS',
      location: 'Charlotte, NC',
      category: 'residential',
      architect: 'Smith & Associates',
      year: '2023',
      units: 48,
      floors: 6,
      description: 'Modern single-stair residential building featuring cross-ventilation and abundant natural light.',
      image: '/placeholder-building-1.jpg',
      features: ['Cross Ventilation', 'Natural Light', 'Community Spaces', 'Green Roof'],
    },
    {
      id: 2,
      title: 'DOWNTOWN LOFTS',
      location: 'Raleigh, NC',
      category: 'mixed-use',
      architect: 'Urban Design Co.',
      year: '2024',
      units: 32,
      floors: 8,
      description: 'Mixed-use development combining residential units with ground-floor retail.',
      image: '/placeholder-building-2.jpg',
      features: ['Retail Integration', 'Transit Access', 'Sustainable Design', 'Public Plaza'],
    },
    {
      id: 3,
      title: 'HISTORIC MILL CONVERSION',
      location: 'Durham, NC',
      category: 'adaptive',
      architect: 'Heritage Builders',
      year: '2023',
      units: 24,
      floors: 4,
      description: 'Adaptive reuse of historic textile mill using single-stair design principles.',
      image: '/placeholder-building-3.jpg',
      features: ['Historic Preservation', 'Industrial Character', 'Loft Living', 'Art Studios'],
    },
    {
      id: 4,
      title: 'RIVERSIDE RESIDENCES',
      location: 'Asheville, NC',
      category: 'residential',
      architect: 'Mountain View Architects',
      year: '2024',
      units: 36,
      floors: 5,
      description: 'Sustainable housing development with mountain views and river access.',
      image: '/placeholder-building-4.jpg',
      features: ['Mountain Views', 'River Access', 'Solar Panels', 'Native Landscaping'],
    },
    {
      id: 5,
      title: 'INNOVATION DISTRICT',
      location: 'Winston-Salem, NC',
      category: 'mixed-use',
      architect: 'Future Living Design',
      year: '2024',
      units: 60,
      floors: 10,
      description: 'High-density mixed-use tower in the heart of the innovation district.',
      image: '/placeholder-building-5.jpg',
      features: ['Tech Hub', 'Co-working Spaces', 'Rooftop Garden', 'Smart Building'],
    },
    {
      id: 6,
      title: 'UNIVERSITY HOUSING',
      location: 'Chapel Hill, NC',
      category: 'residential',
      architect: 'Campus Design Group',
      year: '2023',
      units: 120,
      floors: 7,
      description: 'Student housing complex designed for community living and study spaces.',
      image: '/placeholder-building-6.jpg',
      features: ['Study Lounges', 'Recreation Center', 'Bike Storage', 'Sustainable Materials'],
    },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-none">
              GALLERY
            </h1>
            <div className="w-32 h-1 bg-black mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              EXPLORE SUCCESSFUL SINGLE-STAIR BUILDINGS ACROSS NORTH CAROLINA. 
              SEE HOW INNOVATIVE DESIGN CREATES BETTER COMMUNITIES.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 font-bold text-sm border-2 border-black transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-black shadow-brutal hover:shadow-none transition-all"
              >
                {/* Placeholder Image */}
                <div className="h-64 bg-gray-200 border-b-2 border-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-black text-xl">■</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      PROJECT IMAGE
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-black mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {project.location}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-bold">{project.year}</div>
                      <div className="text-gray-600">{project.floors} floors</div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold">
                      {project.units} UNITS
                    </span>
                    <span className="text-sm text-gray-600">
                      {project.architect}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-black text-white px-2 py-1 font-bold"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="text-xs bg-gray-200 text-black px-2 py-1 font-bold">
                        +{project.features.length - 3}
                      </span>
                    )}
                  </div>

                  <button className="w-full border-2 border-black text-black hover:bg-black hover:text-white py-2 font-bold text-sm transition-colors">
                    VIEW DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              IMPACT BY THE NUMBERS
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black mb-4">
                320
              </div>
              <p className="text-sm font-bold tracking-wide">
                TOTAL UNITS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black mb-4">
                18
              </div>
              <p className="text-sm font-bold tracking-wide">
                COMPLETED PROJECTS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black mb-4">
                8
              </div>
              <p className="text-sm font-bold tracking-wide">
                CITIES SERVED
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black mb-4">
                25%
              </div>
              <p className="text-sm font-bold tracking-wide">
                COST SAVINGS
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


