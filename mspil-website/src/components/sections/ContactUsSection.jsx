import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedCard, GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/animated-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare, User, Building } from 'lucide-react'; // User for General, Building for Investor/HR
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
    <section id="contact" className="section-padding-compact bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            We're here to help. Reach out to us for inquiries, support, or partnership opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6 items-start">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
            <div className="space-y-4">
              {contactDetails.map((detail, index) => (
                <AnimatedCard key={index} variant="slide" delay={index * 0.1} className="shadow-sm hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    {detail.icon}
                    <CardTitle className="text-xl">{detail.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {detail.address && (
                      <p className="flex items-start text-sm text-muted-foreground mb-1">
                        <MapPin size={15} className="mr-2 mt-0.5 shrink-0"/> 
                        {detail.mapUrl ? (
                          <a href={detail.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            {detail.address}
                          </a>
                        ) : (
                          detail.address
                        )}
                      </p>
                    )}
                    {detail.phone && <p className="flex items-center text-sm text-muted-foreground mb-1"><Phone size={15} className="mr-2 shrink-0"/> <a href={`tel:${detail.phone}`} className="hover:text-primary">{detail.phone}</a></p>}
                    {detail.email && <p className="flex items-center text-sm text-muted-foreground mb-1"><Mail size={15} className="mr-2 shrink-0"/> <a href={`mailto:${detail.email}`} className="hover:text-primary">{detail.email}</a></p>}
                    {detail.description && <p className="text-sm text-muted-foreground italic mt-2">{detail.description}</p>}
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <GlassCard className="shadow-xl p-6 sm:p-8" blur="md" opacity="10">
              <CardHeader className="text-center p-0 mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-3"/>
                </motion.div>
                <CardTitle className="text-2xl md:text-3xl">Send Us a Message</CardTitle>
                <CardDescription className="mt-2">Fill out the form and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <EnhancedContactForm />
              </CardContent>
            </GlassCard>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <h3 className="text-2xl font-semibold text-foreground text-center mb-4">Our Locations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-3">Registered Office</h4>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-primary/20">
                <iframe 
                  width="100%" 
                  height="300" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=SF-11,+Second+Floor,+Aakriti+Business+Center,+Aakriti+Eco+city,+Bawadiya+Kalan,+Bhopal&output=embed"
                  title="MSPIL Registered Office Location"
                ></iframe>
              </div>
              <div className="mt-2 text-center">
                <a 
                  href="https://maps.app.goo.gl/oTbMy9KMRKmNt5M66" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Factory Location</h4>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-primary/20">
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
                  className="text-primary hover:underline text-sm"
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