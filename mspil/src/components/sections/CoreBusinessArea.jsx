import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Droplets, Zap, Wheat } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useThrottle } from '@/hooks/useThrottle';
// Removed supabaseImages dependency

const businessData = [
  {
    id: 'sugar',
    nameKey: 'businessSugarName',
    descriptionKey: 'businessSugarData',
    icon: ShoppingBag,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    tags: ['Manufacturing', 'Export', 'B2B'],
    image: '/images/infrastructure/sugar-mill.jpg'
  },
  {
    id: 'ethanol',
    nameKey: 'businessEthanolName',
    descriptionKey: 'businessEthanolData',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    tags: ['Renewable', 'Energy', 'Sustainable'],
    image: '/images/infrastructure/ethanol-plant.jpg'
  },
  {
    id: 'power',
    nameKey: 'businessPowerName',
    descriptionKey: 'businessPowerData',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50',
    tags: ['Green Energy', 'Grid Supply', 'Cogeneration'],
    image: '/images/infrastructure/power-plant.jpg'
  },
  {
    id: 'feed',
    nameKey: 'businessFeedName',
    descriptionKey: 'businessFeedData',
    icon: Wheat,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    tags: ['Agriculture', 'Livestock', 'Nutrition'],
    image: '/images/about/factory-overview.jpg'
  }
];

const CoreBusinessArea = () => {
  const t = useTranslation(); // Fixed: useTranslation returns the t function directly
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const throttledCheckScrollButtons = useThrottle(checkScrollButtons, 100);

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', throttledCheckScrollButtons);
      window.addEventListener('resize', throttledCheckScrollButtons);
      
      return () => {
        container.removeEventListener('scroll', throttledCheckScrollButtons);
        window.removeEventListener('resize', throttledCheckScrollButtons);
      };
    }
  }, [checkScrollButtons, throttledCheckScrollButtons]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 400; // Approximate card width including gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update active index
      const newIndex = direction === 'left' 
        ? Math.max(0, activeIndex - 1)
        : Math.min(businessData.length - 1, activeIndex + 1);
      setActiveIndex(newIndex);
    }
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = 400;
      scrollContainerRef.current.scrollTo({ 
        left: index * cardWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            {t('coreBusinessAreaTitle', 'Our Core Business Areas')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('coreBusinessAreaSubtitle', 'Discover our integrated business ecosystem driving sustainable growth')}
          </p>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {businessData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex === index 
                  ? "w-8 bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to business ${index + 1}`}
            />
          ))}
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <motion.button
            onClick={() => scroll('left')}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg",
              "transition-all duration-200",
              canScrollLeft 
                ? "opacity-100 hover:scale-110" 
                : "opacity-0 pointer-events-none"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Right Scroll Button */}
          <motion.button
            onClick={() => scroll('right')}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg",
              "transition-all duration-200",
              canScrollRight 
                ? "opacity-100 hover:scale-110" 
                : "opacity-0 pointer-events-none"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Business Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {businessData.map((business, index) => {
              const Icon = business.icon;
              
              return (
                <motion.div
                  key={business.id}
                  className="flex-shrink-0 w-[380px] scroll-snap-align-start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05
                  }}
                >
                  <motion.div
                    className={cn(
                      "relative h-[450px] rounded-2xl overflow-hidden",
                      "bg-card border shadow-lg cursor-pointer",
                      "group"
                    )}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Background Gradient */}
                    <div className={cn(
                      "absolute inset-0 opacity-5",
                      `bg-gradient-to-br ${business.color}`
                    )} />

                    {/* Content */}
                    <div className="relative h-full flex flex-col p-6">
                      {/* Icon and Title */}
                      <div className="mb-6">
                        <motion.div 
                          className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
                            "bg-gradient-to-br shadow-lg",
                            business.color
                          )}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold mb-2">
                          {t(business.nameKey)}
                        </h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {business.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                business.bgColor,
                                "text-foreground/80"
                              )}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + tagIndex * 0.05 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground flex-grow line-clamp-4">
                        {t(business.descriptionKey)}
                      </p>

                      {/* Image Preview */}
                      <motion.div 
                        className="mt-4 h-40 rounded-lg overflow-hidden bg-muted"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                          <Icon className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      </motion.div>

                      {/* Hover Effect Overlay */}
                      <motion.div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent",
                          "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          "pointer-events-none"
                        )}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {[
            { label: 'Years of Excellence', value: '50+' },
            { label: 'Business Verticals', value: '4' },
            { label: 'Annual Production', value: '500K MT' },
            { label: 'Green Energy', value: '100 MW' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div 
                className="text-3xl font-bold text-primary mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreBusinessArea;
