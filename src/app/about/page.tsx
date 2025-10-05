'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'SARAH JOHNSON',
      role: 'EXECUTIVE DIRECTOR',
      bio: 'Urban planning expert with 15 years of experience in housing policy and community development.',
      expertise: ['Policy Development', 'Urban Planning', 'Community Engagement'],
    },
    {
      name: 'MICHAEL CHEN',
      role: 'POLICY DIRECTOR',
      bio: 'Former state legislator focused on building codes and housing affordability initiatives.',
      expertise: ['Legislative Affairs', 'Building Codes', 'Public Policy'],
    },
    {
      name: 'ELENA RODRIGUEZ',
      role: 'RESEARCH DIRECTOR',
      bio: 'Architecture professor and researcher specializing in sustainable housing design.',
      expertise: ['Sustainable Design', 'Research', 'Architecture'],
    },
    {
      name: 'DAVID THOMPSON',
      role: 'COMMUNICATIONS DIRECTOR',
      bio: 'Strategic communications professional with expertise in advocacy and public relations.',
      expertise: ['Communications', 'Advocacy', 'Public Relations'],
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'ORGANIZATION FOUNDED',
      description: 'Single Stair NC established to advocate for housing policy reform.',
    },
    {
      year: '2023',
      title: 'FIRST POLICY PROPOSAL',
      description: 'Submitted comprehensive single-stair building code recommendations.',
    },
    {
      year: '2023',
      title: 'COMMUNITY OUTREACH',
      description: 'Launched statewide education campaign reaching 10,000+ residents.',
    },
    {
      year: '2024',
      title: 'LEGISLATIVE PROGRESS',
      description: 'Three bills introduced in NC General Assembly with bipartisan support.',
    },
  ];

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
              ABOUT
            </h1>
            <div className="w-32 h-1 bg-black mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              WE ARE A COALITION OF ARCHITECTS, PLANNERS, POLICYMAKERS, AND 
              ADVOCATES WORKING TO TRANSFORM NORTH CAROLINA'S HOUSING LANDSCAPE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                OUR MISSION
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Single Stair North Carolina advocates for building code reforms that 
                enable single-stair residential buildings, creating more affordable, 
                livable, and sustainable housing across our state.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                We believe that thoughtful policy changes can unlock better housing 
                design, reduce construction costs, and create more vibrant communities 
                for all North Carolinians.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-sm">■</span>
                  </div>
                  <span className="font-medium">Advocate for policy reform</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-sm">■</span>
                  </div>
                  <span className="font-medium">Educate communities and stakeholders</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-sm">■</span>
                  </div>
                  <span className="font-medium">Support innovative housing projects</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-2 border-black p-8 shadow-brutal"
            >
              <h3 className="text-2xl font-black mb-6">
                WHY SINGLE STAIR?
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">MORE LIVABLE SPACE</h4>
                  <p className="text-sm">
                    Single-stair design eliminates redundant corridors, 
                    creating 20-30% more usable space.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">BETTER NATURAL LIGHT</h4>
                  <p className="text-sm">
                    Cross-ventilation and corner units provide superior 
                    lighting and air quality.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">REDUCED COSTS</h4>
                  <p className="text-sm">
                    Simplified construction reduces building costs by 
                    15-25% while maintaining safety.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              OUR TEAM
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-black mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-black text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-black mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-bold text-gray-600 mb-4">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-100 text-black px-2 py-1 font-bold border border-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              OUR JOURNEY
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-4xl font-black mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-4">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="w-4 h-4 bg-white flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              JOIN OUR MOVEMENT
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Whether you're an architect, developer, policymaker, or concerned citizen, 
              there's a place for you in our coalition. Together, we can build better 
              communities for all North Carolinians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-4 font-bold transition-colors shadow-brutal">
                GET INVOLVED
              </button>
              <button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 font-bold transition-colors shadow-brutal">
                CONTACT US
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}





