import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare, User, Building } from 'lucide-react'; // User for General, Building for Investor/HR

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
    <section id="contact" className="section-padding bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            We're here to help. Reach out to us for inquiries, support, or partnership opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }}>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {contactDetails.map((detail, index) => (
                <Card key={index} className="shadow-sm">
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
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.4 }}>
            <Card className="shadow-xl p-6 sm:p-8">
              <CardHeader className="text-center p-0 mb-6">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-3"/>
                <CardTitle className="text-2xl md:text-3xl">Send Us a Message</CardTitle>
                <CardDescription className="mt-2">Fill out the form and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input id="contact-name" type="text" placeholder="Your Name" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input id="contact-email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-inquiry-type">Type of Inquiry</Label>
                    <select id="contact-inquiry-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>General Inquiry</option>
                      <option>Company Secretary / Compliance</option>
                      <option>Finance</option>
                      <option>Technical / Projects</option>
                      <option>Product Information</option>
                      <option>Partnerships</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" placeholder="Your message..." rows={5} />
                  </div>
                  <Button type="submit" className="w-full" size="lg">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.6 }}>
          <h3 className="text-2xl font-semibold text-foreground text-center mb-6">Our Locations</h3>
          <div className="grid md:grid-cols-2 gap-6">
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