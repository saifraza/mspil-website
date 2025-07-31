import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Zap, Users, Target, Award, Clock, CalendarDays, Factory, Droplets, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { sectionBackgrounds, cardBackgrounds } from '@/utils/backgroundStyles';

const AboutUsSection = () => {
  const t = useTranslation();
  
  const [companyHistoryWithImages, setCompanyHistoryWithImages] = useState([]);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

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
      imageUrl: '/images/about-us/2005_inception.jpg',
      icon: <CalendarDays className="w-8 h-8 text-primary" />,
      side: 'left'
    },
    {
      year: '2010',
      titleKey: 'aboutHistory2010Title',
      descriptionKey: 'aboutHistory2010Desc',
      imageAltKey: 'aboutHistory2010Alt',
      imagePath: 'about-us/2010_expansion.jpg',
      imageUrl: '/images/about-us/2010_expansion.jpg',
      icon: <Building className="w-8 h-8 text-primary" />,
      side: 'right'
    },
    {
      year: '2016',
      titleKey: 'aboutHistory2016Title',
      descriptionKey: 'aboutHistory2016Desc',
      imageAltKey: 'aboutHistory2016Alt',
      imagePath: 'about-us/2016_cogeneration.jpg',
      imageUrl: '/images/about-us/2016_cogeneration.jpg',
      icon: <Zap className="w-8 h-8 text-primary" />,
      side: 'left'
    },
    {
      year: '2018',
      titleKey: 'aboutHistory2018Title',
      descriptionKey: 'aboutHistory2018Desc',
      imageAltKey: 'aboutHistory2018Alt',
      imagePath: 'about-us/2018_sugar_capacity.jpg',
      imageUrl: '/images/about-us/2018_sugar_capacity.jpg',
      icon: <Factory className="w-8 h-8 text-primary" />,
      side: 'right'
    },
    {
      year: '2024',
      titleKey: 'aboutHistory2024Title',
      descriptionKey: 'aboutHistory2024Desc',
      imageAltKey: 'aboutHistory2024Alt',
      imagePath: 'about-us/2024_future.jpg',
      imageUrl: '/images/about-us/2024_future.jpg',
      icon: <Droplets className="w-8 h-8 text-primary" />,
      side: 'left'
    }
  ], []);

  useEffect(() => {
    // Use the uploaded timeline images directly
    setCompanyHistoryWithImages(companyHistoryData);
  }, [companyHistoryData]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || companyHistoryWithImages.length === 0) return;

    const container = scrollContainerRef.current;
    let currentIndex = 0;
    let scrollTimeout;

    const scrollToCard = (index) => {
      const cardWidth = 408; // w-96 (384px) + gap-6 (24px)
      const targetScroll = index * cardWidth;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    };

    const autoScroll = () => {
      // Move to next card
      currentIndex = (currentIndex + 1) % companyHistoryWithImages.length;
      scrollToCard(currentIndex);
      setActiveIndex(currentIndex);
      
      // Schedule next scroll
      scrollTimeout = setTimeout(autoScroll, 4000); // 4 seconds per card (including scroll time)
    };

    // Start auto-scroll after initial delay
    scrollTimeout = setTimeout(() => {
      autoScroll();
    }, 2000);

    // Stop auto-scroll on user interaction
    const handleUserInteraction = (e) => {
      // Only stop if the interaction is on the timeline container itself
      if (e.currentTarget === container) {
        setIsAutoScrolling(false);
        setShowScrollHint(false);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      }
    };

    // Only listen to direct interactions on the timeline container
    container.addEventListener('mouseenter', handleUserInteraction);
    container.addEventListener('touchstart', handleUserInteraction);
    
    // For wheel events, check if it's actually on the timeline
    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && 
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        handleUserInteraction(e);
      }
    };
    window.addEventListener('wheel', handleWheel);
    const handleScroll = () => {
      // Update active indicator based on scroll position
      const scrollLeft = container.scrollLeft;
      const cardWidth = 408;
      const newIndex = Math.round(scrollLeft / cardWidth);
      currentIndex = newIndex;
      setActiveIndex(newIndex);
    };
    
    container.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      container.removeEventListener('mouseenter', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [isAutoScrolling, companyHistoryWithImages]);

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
    <section id="about" className="section-padding-compact relative overflow-hidden bg-transparent">
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
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInProps} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('aboutSubtitle')}
          </p>
        </motion.div>

        {/* New Image Carousel */}
        <motion.div 
          {...fadeInProps} 
          transition={{ ...fadeInProps.transition, delay: 0.1 }} 
          className="mb-12 overflow-hidden"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-6">{t('aboutHistoryTitle') || 'Our Journey Through Time'}</h3>
          
          <div className="relative">
            {/* Scroll hint animation */}
            {showScrollHint && (
              <motion.div 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full p-3 shadow-lg border border-white/40 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [0, 0, 20, 20]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </motion.div>
            )}

            {/* Navigation buttons */}
            <button
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollLeft -= 408;
                  setIsAutoScrolling(false);
                  setShowScrollHint(false);
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full p-2 shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all hidden md:block border border-white/40"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            
            <button
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollLeft += 408;
                  setIsAutoScrolling(false);
                  setShowScrollHint(false);
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full p-2 shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all hidden md:block border border-white/40"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>

            {/* Horizontal scroll container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              onScroll={() => {
                if (showScrollHint) setShowScrollHint(false);
              }}
            >
              <div className="flex space-x-6">
                {companyHistoryWithImages.map((event, index) => (
                  <motion.div
                    key={event.year}
                    className="flex-shrink-0 w-96 snap-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <Card className={`h-full ${cardBackgrounds.glass} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
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
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-bold leading-tight">{t(event.titleKey)}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{t(event.descriptionKey)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll progress indicator */}
            <div className="mt-6 flex justify-center items-center space-x-4">
              <div className="flex space-x-2">
                {companyHistoryWithImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (container) {
                        container.scrollLeft = index * 408;
                        setIsAutoScrolling(false);
                        setShowScrollHint(false);
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Auto-scroll indicator */}
              {isAutoScrolling && (
                <motion.div
                  className="text-xs text-muted-foreground flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span>Auto-scrolling</span>
                  <motion.div
                    className="w-1 h-1 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          {...fadeInProps} 
          transition={{ ...fadeInProps.transition, delay: 0.4 }} 
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">{t('aboutCoreValuesTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div 
                key={t(value.titleKey)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className={`text-center h-full hover:shadow-xl transition-all duration-300 ${cardBackgrounds.glass}`}>
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