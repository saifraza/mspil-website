import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Droplets, Zap, Wheat, Download, Package, Truck, ClipboardCheck, Pipette, Layers, Waves, Sparkles, Fan, PackageCheck, Archive, FlaskConical, Flame, Recycle, Warehouse, Send, Boxes, CloudSnow, Gauge, Snowflake, Network, Tractor, Shuffle, Disc3, ShoppingBasket, Camera, Image } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import LazyImage from '@/components/LazyImage';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { useLocation } from 'react-router-dom';
import { sectionBackgrounds, cardBackgrounds } from '@/utils/backgroundStyles';
// Document paths are now handled locally

const initialBusinessesData = [
  {
    id: 'sugar',
    nameKey: 'businessSugarName',
    dataKey: 'businessSugarData',
    detailsKey: 'businessSugarDetails',
    icon: <ShoppingBag />,
    productDataFileKey: 'businessSugarDataFile',
    cycleTitleKey: 'manufacturingCycleSugarTitle',
    cycleSteps: [
      { textKey: 'manufacturingCycleSugarStep1', iconName: 'ClipboardCheck' }, 
      { textKey: 'manufacturingCycleSugarStep2', iconName: 'Pipette' },
      { textKey: 'manufacturingCycleSugarStep3', iconName: 'Layers' },
      { textKey: 'manufacturingCycleSugarStep4', iconName: 'Waves' },
      { textKey: 'manufacturingCycleSugarStep5', iconName: 'Sparkles' },
      { textKey: 'manufacturingCycleSugarStep6', iconName: 'Fan' },
      { textKey: 'manufacturingCycleSugarStep7', iconName: 'PackageCheck' },
    ],
    cycleByproductKey: 'manufacturingCycleSugarByproduct',
  },
  {
    id: 'ethanol',
    nameKey: 'businessEthanolName',
    dataKey: 'businessEthanolData',
    detailsKey: 'businessEthanolDetails',
    icon: <Droplets />,
    productDataFileKey: 'businessEthanolDataFile',
    cycleTitleKey: 'manufacturingCycleEthanolTitle',
    cycleSteps: [
      { textKey: 'manufacturingCycleEthanolStep1', iconName: 'Archive' },
      { textKey: 'manufacturingCycleEthanolStep2', iconName: 'FlaskConical' },
      { textKey: 'manufacturingCycleEthanolStep3', iconName: 'Flame' },
      { textKey: 'manufacturingCycleEthanolStep4', iconName: 'Recycle' },
      { textKey: 'manufacturingCycleEthanolStep5', iconName: 'Warehouse' },
      { textKey: 'manufacturingCycleEthanolStep6', iconName: 'Send' },
    ],
    cycleByproductKey: 'manufacturingCycleEthanolByproduct',
  },
  {
    id: 'power',
    nameKey: 'businessPowerName',
    dataKey: 'businessPowerData',
    detailsKey: 'businessPowerDetails',
    icon: <Zap />,
    productDataFileKey: 'businessPowerDataFile',
    cycleTitleKey: 'manufacturingCyclePowerTitle',
    cycleSteps: [
      { textKey: 'manufacturingCyclePowerStep1', iconName: 'Boxes' },
      { textKey: 'manufacturingCyclePowerStep2', iconName: 'CloudSnow' },
      { textKey: 'manufacturingCyclePowerStep3', iconName: 'Gauge' },
      { textKey: 'manufacturingCyclePowerStep4', iconName: 'Snowflake' },
      { textKey: 'manufacturingCyclePowerStep5', iconName: 'Network' },
    ],
    cycleByproductKey: 'manufacturingCyclePowerByproduct',
  },
  {
    id: 'feed',
    nameKey: 'businessFeedName',
    dataKey: 'businessFeedData',
    detailsKey: 'businessFeedDetails',
    icon: <Wheat />,
    productDataFileKey: 'businessFeedDataFile',
    cycleTitleKey: 'manufacturingCycleFeedTitle',
    cycleSteps: [
      { textKey: 'manufacturingCycleFeedStep1', iconName: 'Tractor' },
      { textKey: 'manufacturingCycleFeedStep2', iconName: 'Shuffle' },
      { textKey: 'manufacturingCycleFeedStep3', iconName: 'Disc3' },
      { textKey: 'manufacturingCycleFeedStep4', iconName: 'ShoppingBasket' },
    ],
    cycleByproductKey: null,
  },
];

const LucideIcons = { ShoppingBag, Droplets, Zap, Wheat, Download, Package, Truck, ClipboardCheck, Pipette, Layers, Waves, Sparkles, Fan, PackageCheck, Archive, FlaskConical, Flame, Recycle, Warehouse, Send, Boxes, CloudSnow, Gauge, Snowflake, Network, Tractor, Shuffle, Disc3, ShoppingBasket, Camera, Image };

// Image gallery data for each business vertical
const businessImageGalleries = {
  sugar: [
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-1.jpg',
      altKey: 'sugarFacility1Alt'
    },
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-2.jpg',
      altKey: 'sugarFacility2Alt'
    },
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-3.jpg',
      altKey: 'sugarFacility3Alt'
    },
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-4.jpg',
      altKey: 'sugarFacility4Alt'
    },
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-5.jpg',
      altKey: 'sugarFacility5Alt'
    },
    {
      srcUrl: '/images/infrastructure/sugar/sugar-facility-6.jpg',
      altKey: 'sugarFacility6Alt'
    }
  ],
  ethanol: [
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-1.jpg',
      altKey: 'ethanolFacility1Alt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-2.jpg',
      altKey: 'ethanolFacility2Alt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-3.jpg',
      altKey: 'ethanolFacility3Alt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-4.jpg',
      altKey: 'ethanolFacility4Alt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-5.jpg',
      altKey: 'ethanolFacility5Alt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol/ethanol-facility-6.jpg',
      altKey: 'ethanolFacility6Alt'
    }
  ],
  power: [
    {
      srcUrl: '/images/infrastructure/power-plant.jpg',
      altKey: 'powerPlantFacilityAlt'
    },
    {
      srcUrl: '/images/infrastructure/power_plant.jpg',
      altKey: 'powerGenerationUnitAlt'
    },
    {
      srcUrl: '/images/about-us/2016_cogeneration.jpg',
      altKey: 'cogenerationPlantAlt'
    },
    {
      srcUrl: '/images/about/factory-overview.jpg',
      altKey: 'powerFactoryOverviewAlt'
    }
  ],
  feed: [
    {
      srcUrl: '/images/about/factory-overview.jpg',
      altKey: 'feedFactoryOverviewAlt'
    },
    {
      srcUrl: '/images/infrastructure/sugar-mill.jpg',
      altKey: 'feedProcessingFacilityAlt'
    }
  ]
};

const getIcon = (iconName, props) => {
  const IconComponent = LucideIcons[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};

// Simple fade-in effect for manufacturing steps
const fadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 }
};

// Step animation variants
const stepVariants = {
  hidden: { opacity: 0, y: 20, x: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Auto-scrolling image gallery component
const AutoScrollingGallery = ({ images, businessName }) => {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslation();
  
  // Handle manual scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollLeft = container.scrollLeft;
    const imageWidth = 400; // w-96 + gap
    const newIndex = Math.round(scrollLeft / imageWidth);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || images.length === 0) return;

    const container = scrollContainerRef.current;
    let currentIndex = 0;
    let scrollTimeout;

    const scrollToImage = (index) => {
      const imageWidth = 384 + 16; // w-96 (384px) + gap-4 (16px)
      const targetScroll = index * imageWidth;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    };

    const autoScroll = () => {
      currentIndex = (currentIndex + 1) % images.length;
      scrollToImage(currentIndex);
      setActiveIndex(currentIndex);
      scrollTimeout = setTimeout(autoScroll, 3000); // 3 seconds per image
    };

    scrollTimeout = setTimeout(autoScroll, 2000); // Initial delay

    const handleUserInteraction = () => {
      setIsAutoScrolling(false);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

    container.addEventListener('mouseenter', handleUserInteraction);
    container.addEventListener('touchstart', handleUserInteraction);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      container.removeEventListener('mouseenter', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isAutoScrolling, images]);

  return (
    <div>
      {/* Image gallery */}
      <div className="relative">
        <style>{`
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
        `}</style>
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ overscrollBehavior: 'contain' }}
          onScroll={handleScroll}
          onWheel={(e) => {
            // Prevent vertical scroll from affecting the page
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
              e.stopPropagation();
            }
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full md:w-96 snap-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <LazyImage
                  src={image.srcUrl}
                  alt={t(image.altKey) || `${businessName} facility ${index + 1}`}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    {t(image.altKey) || `${businessName} Facility`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  container.scrollLeft = index * 400;
                  setIsAutoScrolling(false);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const OurBusinessesSection = () => {
  const t = useTranslation();
  const location = useLocation();
  const [processedBusinessesData, setProcessedBusinessesData] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentBusinessName, setCurrentBusinessName] = useState('');
  const [activeTab, setActiveTab] = useState('sugar');

  const openGallery = (businessId, businessNameKey) => {
    // Use static images only
    const staticImages = businessImageGalleries[businessId] || [];
    
    setCurrentGalleryImages(staticImages);
    setCurrentBusinessName(t(businessNameKey));
    setIsGalleryOpen(true);
  };

  // Business images are now fetched via ImageContext

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the # symbol
      if (['sugar', 'ethanol', 'power', 'feed'].includes(elementId)) {
        setActiveTab(elementId);
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
          }
        }, 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const processBusinessesData = () => {
      const updatedBusinesses = initialBusinessesData.map((business) => {
        // Use the public download endpoint that serves real uploaded files
        let publicUrl = '#';
        if (business.id === 'sugar') {
          publicUrl = 'https://mspil-mcp-production.up.railway.app/api/public/download/sugar-data';
        } else if (business.id === 'ethanol') {
          publicUrl = 'https://mspil-mcp-production.up.railway.app/api/public/download/ethanol-data';
        } else if (business.id === 'power') {
          publicUrl = 'https://mspil-mcp-production.up.railway.app/api/public/download/power-data';
        } else if (business.id === 'feed') {
          publicUrl = 'https://mspil-mcp-production.up.railway.app/api/public/download/feed-data';
        }
        
        const resolvedCycleSteps = business.cycleSteps.map(step => ({
          ...step,
          iconElement: getIcon(step.iconName, { className: "w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" })
        }));
        
        return {
          ...business,
          iconElement: React.cloneElement(business.icon, { className: "w-10 h-10" }),
          productDataPublicUrl: publicUrl,
          resolvedCycleSteps,
        };
      });
      setProcessedBusinessesData(updatedBusinesses);
    };

    processBusinessesData();
  }, [t]);

  return (
    <section id="businesses" className={`section-padding-compact ${sectionBackgrounds.secondary}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('businessesTitle')}</h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {t('businessesSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-6 h-auto">
              {processedBusinessesData.map((business) => (
                <TabsTrigger key={business.id} value={business.id} className="flex flex-col items-center justify-center p-3 h-full text-center group">
                  {business.iconElement ? React.cloneElement(business.iconElement, { className: "w-8 h-8 mb-2 text-primary group-data-[state=active]:text-primary-foreground" }) : null}
                  {t(business.nameKey)}
                </TabsTrigger>
              ))}
            </TabsList>

            {processedBusinessesData.map((business) => (
              <TabsContent key={business.id} value={business.id} id={business.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:bg-white/70 dark:hover:bg-gray-800/70">
                    <CardHeader className="items-center text-center p-4">
                      <div className="mx-auto mb-2">
                        {business.iconElement ? React.cloneElement(business.iconElement, { className: "w-12 h-12 text-primary" }) : null}
                      </div>
                      <CardTitle className="text-2xl md:text-3xl">{t(business.nameKey)}</CardTitle>
                      <CardDescription className="text-base text-primary font-semibold">{t(business.dataKey)}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                        {/* Column 1: Image Gallery on the left */}
                        <div>
                          {businessImageGalleries[business.id] && (
                            <AutoScrollingGallery 
                              images={businessImageGalleries[business.id]} 
                              businessName={t(business.nameKey)}
                            />
                          )}
                        </div>

                        {/* Column 2: Manufacturing Cycle on the right */}
                        <div className="w-full">
                          {business.resolvedCycleSteps && business.resolvedCycleSteps.length > 0 ? (
                            <>
                            {/* Manufacturing Cycle for {business.id} */}
                            <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                              {t(business.cycleTitleKey) || t('businessTabProcessFlowTitle')}
                            </h3>
                            <div className="relative max-w-2xl mx-auto">
                              {/* Animated background line */}
                              <motion.div
                                className="absolute left-5 top-5 w-0.5 bg-gradient-to-b from-primary/20 to-primary/5 overflow-hidden"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${(business.resolvedCycleSteps.length - 1) * 20}px` }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                              />
                              
                              {business.resolvedCycleSteps.map((step, index, arr) => (
                                <motion.div
                                  key={index}
                                  className="relative flex items-start group mb-1"
                                  variants={stepVariants}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ 
                                    once: true, 
                                    amount: 0.5,
                                    margin: "-50px"
                                  }}
                                >
                                  <div className="flex flex-col items-center mr-4 z-10">
                                    <motion.div 
                                      className="flex items-center justify-center w-10 h-10 rounded-full bg-background group-hover:bg-primary transition-all duration-300 border-2 border-primary/30 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20"
                                      initial={{ scale: 0, rotate: -180 }}
                                      whileInView={{ scale: 1, rotate: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ 
                                        delay: 0.3, 
                                        type: "spring", 
                                        stiffness: 200,
                                        damping: 15
                                      }}
                                    >
                                      <div className="text-primary group-hover:text-primary-foreground transition-colors">
                                        {step.iconElement}
                                      </div>
                                    </motion.div>
                                    {index < arr.length - 1 && (
                                      <div className="w-0.5 h-5 bg-primary/30 group-hover:bg-primary transition-all duration-300 mt-1" />
                                    )}
                                  </div>
                                  <motion.div 
                                    className="pt-1.5 flex-1"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                  >
                                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {t('stepLabelPrefix') || 'Step'} {index + 1}: {t(step.textKey)}
                                    </p>
                                    {(business.id === 'sugar' && step.textKey === 'manufacturingCycleSugarStep7' && business.cycleByproductKey) &&
                                      <p className="text-sm text-muted-foreground italic mt-1">
                                        {t(business.cycleByproductKey)}
                                      </p>}
                                    {(business.id === 'power' && step.textKey === 'manufacturingCyclePowerStep5' && business.cycleByproductKey) &&
                                      <p className="text-sm text-muted-foreground italic mt-1">
                                        {t(business.cycleByproductKey)}
                                      </p>}
                                    {(business.id === 'ethanol' && step.textKey === 'manufacturingCycleEthanolStep6' && business.cycleByproductKey) && 
                                      <p className="text-sm text-muted-foreground italic mt-1">
                                        {t(business.cycleByproductKey)}
                                      </p>}
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Download Button at bottom of cycle */}
                            <div className="mt-4">
                              <Button asChild variant="secondary" className="w-full md:w-fit">
                                <a href={business.productDataPublicUrl || '#'} download target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" /> {t('downloadDataButton') || 'Download Data'}
                                </a>
                              </Button>
                            </div>
                            </>
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <p>Production cycle information coming soon</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        setIsOpen={setIsGalleryOpen}
        images={currentGalleryImages}
        businessName={currentBusinessName}
      />
    </section>
  );
};

export default OurBusinessesSection;