import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Zap, Users, Target, Award, Clock, CalendarDays, Factory, Droplets } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useImages } from '@/contexts/ImageContext';

const AboutUsSection = () => {
  const t = useTranslation();
  const { getImage } = useImages();
  const [companyHistoryWithImages, setCompanyHistoryWithImages] = useState([]);

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const companyHistoryData = useMemo(() => [
    {
      year: '2005',
      titleKey: 'aboutHistory2005Title',
      descriptionKey: 'aboutHistory2005Desc',
      imageAltKey: 'aboutHistory2005Alt',
      imagePath: 'about-us/2005_inception.jpg',
      imageUrl: getImage('timeline-images', '/images/about-us/2005_inception.jpg', 0),
      icon: <CalendarDays className="w-8 h-8 text-primary" />,
      side: 'left'
    },
    {
      year: '2010',
      titleKey: 'aboutHistory2010Title',
      descriptionKey: 'aboutHistory2010Desc',
      imageAltKey: 'aboutHistory2010Alt',
      imagePath: 'about-us/2010_expansion.jpg',
      imageUrl: getImage('timeline-images', '/images/about-us/2010_expansion.jpg', 1),
      icon: <Building className="w-8 h-8 text-primary" />,
      side: 'right'
    },
    {
      year: '2016',
      titleKey: 'aboutHistory2016Title',
      descriptionKey: 'aboutHistory2016Desc',
      imageAltKey: 'aboutHistory2016Alt',
      imagePath: 'about-us/2016_cogeneration.jpg',
      imageUrl: getImage('timeline-images', '/images/about-us/2016_cogeneration.jpg', 2),
      icon: <Zap className="w-8 h-8 text-primary" />,
      side: 'left'
    },
    {
      year: '2018',
      titleKey: 'aboutHistory2018Title',
      descriptionKey: 'aboutHistory2018Desc',
      imageAltKey: 'aboutHistory2018Alt',
      imagePath: 'about-us/2018_sugar_capacity.jpg',
      imageUrl: getImage('timeline-images', '/images/about-us/2018_sugar_capacity.jpg', 3),
      icon: <Factory className="w-8 h-8 text-primary" />,
      side: 'right'
    },
    {
      year: '2023',
      titleKey: 'aboutHistory2023Title',
      descriptionKey: 'aboutHistory2023Desc',
      imageAltKey: 'aboutHistory2023Alt',
      imagePath: 'about-us/2023_ethanol_plant.jpg',
      imageUrl: getImage('timeline-images', '/images/about-us/2023_ethanol_plant.jpg', 4),
      icon: <Droplets className="w-8 h-8 text-primary" />,
      side: 'left'
    }
  ], []);

  useEffect(() => {
    // Use the uploaded timeline images directly
    setCompanyHistoryWithImages(companyHistoryData);
  }, [companyHistoryData]);

  const coreValues = useMemo(() => [
    { icon: <Target className="w-10 h-10 text-primary mb-3" />, titleKey: 'aboutValueIntegrity', descKey: 'aboutValueIntegrityDesc' },
    { icon: <Award className="w-10 h-10 text-primary mb-3" />, titleKey: 'aboutValueExcellence', descKey: 'aboutValueExcellenceDesc' },
    { icon: <Users className="w-10 h-10 text-primary mb-3" />, titleKey: 'aboutValueCollaboration', descKey: 'aboutValueCollaborationDesc' },
    { icon: <Clock className="w-10 h-10 text-primary mb-3" />, titleKey: 'aboutValueSustainability', descKey: 'aboutValueSustainabilityDesc' },
  ], []);


  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(139, 195, 74, 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          y
        }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-background/90 dark:bg-muted/95 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInProps} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('aboutSubtitle')}
          </p>
        </motion.div>

        {/* New Image Carousel */}
        <motion.div 
          {...fadeInProps} 
          transition={{ ...fadeInProps.transition, delay: 0.1 }} 
          className="mb-20 overflow-hidden"
        >
          <h3 className="text-3xl font-semibold text-foreground text-center mb-8">{t('aboutHistoryTitle') || 'Our Journey'}</h3>
          
          <div className="relative">
            {/* Horizontal scroll container */}
            <div className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              <div className="flex space-x-6">
                {companyHistoryWithImages.map((event, index) => (
                  <motion.div
                    key={event.year}
                    className="flex-shrink-0 w-80 snap-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {event.imageUrl ? (
                          <motion.img 
                            src={event.imageUrl} 
                            alt={t(`aboutHistory${event.year}Alt`) || `${event.year} - ${t(event.titleKey)}`} 
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">{t('imageLoading')}</p>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <span className="text-white font-bold text-lg">{event.year}</span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{t(event.titleKey)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{t(event.descriptionKey)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll indicators */}
            <div className="absolute left-0 right-0 bottom-0 flex justify-center space-x-2">
              {companyHistoryWithImages.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-primary/30"
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1.5 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          {...fadeInProps} 
          transition={{ ...fadeInProps.transition, delay: 0.4 }} 
          className="mb-20"
        >
          <h3 className="text-3xl font-semibold text-foreground text-center mb-10">{t('aboutCoreValuesTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div 
                key={t(value.titleKey)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center">{value.icon}</div>
                    <CardTitle className="text-xl">{t(value.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default AboutUsSection;