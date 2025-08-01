import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageSquare, User, Building, Linkedin, Twitter, Globe } from 'lucide-react'; // User for General, Building for Investor/HR
import EnhancedContactForm from '@/components/EnhancedContactForm';

const ContactUsSection = () => {
  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const contactDetails = [
    {
      type: "Registered Office",
      icon: <Building className="w-7 h-7 text-primary" />,
      address: "SF-11, Second Floor, Aakriti Business Center, Aakriti Eco city, Bawadiya Kalan, Bhopal-462039",
      phone: "+91 99074 94252",
      email: "saifraza@mspil.in",
      mapUrl: "https://maps.app.goo.gl/oTbMy9KMRKmNt5M66"
    },
    {
      type: "Admin Office & Factory",
      icon: <Building className="w-7 h-7 text-primary" />,
      address: "Village Bachai, Dist. Narsinghpur (M.P.) - 487001",
      phone: "+91 99074 94252",
      email: "saifraza@mspil.in",
      mapUrl: "https://maps.app.goo.gl/oTbMy9KMRKmNt5M66"
    },
    {
      type: "Company Secretary & Compliance",
      icon: <User className="w-7 h-7 text-primary" />,
      phone: "+91 98915 46422",
      email: "cs@mspil.in",
      description: "For investor relations and compliance matters"
    },
    {
      type: "Finance Department",
      icon: <User className="w-7 h-7 text-primary" />,
      phone: "+91 94258 16416",
      email: "finance@mspil.in",
      description: "For finance-related inquiries"
    },
    {
      type: "Technical & Projects",
      icon: <User className="w-7 h-7 text-primary" />,
      phone: "+91 94258 16416",
      email: "projects@mspil.in",
      description: "For technical queries and job requirements"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We're here to help. Reach out to us for inquiries, support, or partnership opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-gray-800/70 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-4 group-hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-3">
                      {detail.icon}
                      <h4 className="text-xl font-semibold text-white">{detail.type}</h4>
                    </div>
                    <div className="space-y-2">
                      {detail.address && (
                        <p className="flex items-start text-sm text-gray-300">
                          <MapPin size={15} className="mr-2 mt-0.5 shrink-0"/> 
                          {detail.mapUrl ? (
                            <a href={detail.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                              {detail.address}
                            </a>
                          ) : (
                            detail.address
                          )}
                        </p>
                      )}
                      {detail.phone && (
                        <p className="flex items-center text-sm text-gray-300">
                          <Phone size={15} className="mr-2 shrink-0"/> 
                          <a href={`tel:${detail.phone}`} className="hover:text-primary transition-colors">
                            {detail.phone}
                          </a>
                        </p>
                      )}
                      {detail.email && (
                        <p className="flex items-center text-sm text-gray-300">
                          <Mail size={15} className="mr-2 shrink-0"/> 
                          <a href={`mailto:${detail.email}`} className="hover:text-primary transition-colors">
                            {detail.email}
                          </a>
                        </p>
                      )}
                      {detail.description && (
                        <p className="text-sm text-gray-400 italic mt-2">{detail.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-gray-800/70 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6 sm:p-8">
              <div className="text-center mb-6">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-3"/>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Send Us a Message</h3>
                <p className="mt-2 text-gray-300">Fill out the form and we'll get back to you shortly.</p>
              </div>
              <EnhancedContactForm />
            </div>
          </motion.div>
        </div>
        
        {/* Social Media Section */}
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }} className="mb-12">
          <div className="bg-gray-800/60 backdrop-blur-xl border border-white/40 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Connect With Us</h3>
            <p className="text-gray-300 mb-6">Follow us on social media for updates and news</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.linkedin.com/company/mahakaushal-sugar-and-power-industries-limited" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-gray-700/40 hover:bg-gray-700/60 border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-all duration-300 group"
              >
                <Linkedin size={20} className="text-blue-400 group-hover:text-blue-300" />
                <span className="text-white">LinkedIn</span>
              </a>
              <a 
                href="https://www.mspil.in" 
                className="flex items-center space-x-2 bg-gray-700/40 hover:bg-gray-700/60 border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-all duration-300 group"
              >
                <Globe size={20} className="text-green-400 group-hover:text-green-300" />
                <span className="text-white">Website</span>
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <h3 className="text-2xl font-semibold text-white text-center mb-8">Our Locations</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Registered Office</h4>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-white/40 bg-gray-800/20 backdrop-blur-sm">
                <iframe 
                  width="100%" 
                  height="300" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=SF-11,+Second+Floor,+Aakriti+Business+Center,+Aakriti+Eco+city,+Bawadiya+Kalan,+Bhopal&output=embed&z=15"
                  title="MSPIL Registered Office Location"
                ></iframe>
              </div>
              <div className="mt-2 text-center">
                <a 
                  href="https://maps.app.goo.gl/oTbMy9KMRKmNt5M66" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Factory Location</h4>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-white/40 bg-gray-800/20 backdrop-blur-sm">
                <iframe 
                  width="100%" 
                  height="300" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=Village+Bachai,+Dist.+Narsinghpur+(M.P.)&output=embed"
                  title="MSPIL Factory Location"
                ></iframe>
              </div>
              <div className="mt-2 text-center">
                <a 
                  href="https://maps.app.goo.gl/oTbMy9KMRKmNt5M66" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactUsSection;