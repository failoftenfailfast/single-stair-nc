'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      title: 'GENERAL INQUIRIES',
      email: 'info@singlestair-nc.org',
      description: 'Questions about our mission, programs, or how to get involved.',
    },
    {
      title: 'MEDIA & PRESS',
      email: 'press@singlestair-nc.org',
      description: 'Media inquiries, interview requests, and press materials.',
    },
    {
      title: 'POLICY & RESEARCH',
      email: 'policy@singlestair-nc.org',
      description: 'Technical questions, research collaboration, and policy analysis.',
    },
    {
      title: 'PARTNERSHIPS',
      email: 'partnerships@singlestair-nc.org',
      description: 'Collaboration opportunities with organizations and businesses.',
    },
  ];

  const offices = [
    {
      city: 'CHARLOTTE',
      address: '123 Trade Street\nCharlotte, NC 28202',
      phone: '(704) 555-0123',
      hours: 'Mon-Fri: 9AM-5PM',
    },
    {
      city: 'RALEIGH',
      address: '456 Hillsborough St\nRaleigh, NC 27605',
      phone: '(919) 555-0456',
      hours: 'Mon-Fri: 9AM-5PM',
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
              CONTACT
            </h1>
            <div className="w-32 h-1 bg-black mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              GET IN TOUCH WITH OUR TEAM. WE'RE HERE TO ANSWER QUESTIONS, 
              DISCUSS PARTNERSHIPS, AND HELP YOU GET INVOLVED.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 pb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="border-2 border-black p-8 shadow-brutal">
              <h2 className="text-2xl font-black mb-6">
                SEND US A MESSAGE
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border-2 border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border-2 border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    ORGANIZATION
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    INQUIRY TYPE *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-black focus:outline-none bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="media">Media & Press</option>
                    <option value="partnership">Partnership</option>
                    <option value="policy">Policy & Research</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 border-2 border-black focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 py-4 font-bold text-lg transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-black mb-6">
                CONTACT INFORMATION
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="border-l-4 border-black pl-4">
                    <h3 className="font-bold mb-2">{info.title}</h3>
                    <a 
                      href={`mailto:${info.email}`}
                      className="text-black hover:underline font-medium block mb-2"
                    >
                      {info.email}
                    </a>
                    <p className="text-sm text-gray-600">
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-6">
                OFFICE LOCATIONS
              </h2>
              
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.city} className="border-2 border-black p-6">
                    <h3 className="font-black text-lg mb-3">{office.city}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-bold">Address:</span>
                        <br />
                        {office.address.split('\n').map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                      <div>
                        <span className="font-bold">Phone:</span> {office.phone}
                      </div>
                      <div>
                        <span className="font-bold">Hours:</span> {office.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-black text-white">
              <h3 className="font-black text-lg mb-4">
                FOLLOW OUR WORK
              </h3>
              <p className="text-sm mb-4">
                Stay updated on our advocacy efforts and policy developments.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                >
                  T
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                >
                  F
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                >
                  L
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}





