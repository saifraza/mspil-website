import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Droplets, Zap, Wheat, Download, Package, Truck, ClipboardCheck, Pipette, Layers, Waves, Sparkles, Fan, PackageCheck, Archive, FlaskConical, Flame, Recycle, Warehouse, Send, Boxes, CloudSnow, Gauge, Snowflake, Network, Tractor, Shuffle, Disc3, ShoppingBasket, Camera, Image } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useImages } from '@/contexts/ImageContext';
import LazyImage from '@/components/LazyImage';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { useLocation } from 'react-router-dom';
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
      srcUrl: '/images/infrastructure/sugar-mill.jpg',
      altKey: 'sugarMillFacilityAlt'
    },
    {
      srcUrl: '/images/infrastructure/sugar_mill.jpg',
      altKey: 'sugarMillProcessingAlt'
    },
    {
      srcUrl: '/images/about-us/2018_sugar_capacity.jpg',
      altKey: 'sugarCapacityExpansionAlt'
    },
    {
      srcUrl: '/images/about/factory-overview.jpg',
      altKey: 'factoryOverviewAlt'
    }
  ],
  ethanol: [
    {
      srcUrl: '/images/infrastructure/ethanol-plant.jpg',
      altKey: 'ethanolPlantFacilityAlt'
    },
    {
      srcUrl: '/images/infrastructure/ethanol_plant.jpg',
      altKey: 'ethanolDistilleryAlt'
    },
    {
      srcUrl: '/images/infrastructure/2023_ethanol_plant.jpg',
      altKey: 'ethanolPlant2023Alt'
    },
    {
      srcUrl: '/images/about-us/2023_ethanol_plant.jpg',
      altKey: 'ethanolPlantExpansionAlt'
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

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.08 + 0.1,
      duration: 0.4,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

const lineVariants = {
  hidden: { height: 0 },
  visible: (i) => ({
    height: "100%",
    transition: {
      delay: i * 0.08 + 0.2,
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

const OurBusinessesSection = () => {
  const t = useTranslation();
  const { getCategoryImages } = useImages();
  const location = useLocation();
  const [processedBusinessesData, setProcessedBusinessesData] = useState([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentBusinessName, setCurrentBusinessName] = useState('');
  const [activeTab, setActiveTab] = useState('sugar');

  const openGallery = (businessId, businessNameKey) => {
    // Combine static images with uploaded images from CMS
    const staticImages = businessImageGalleries[businessId] || [];
    const uploadedImages = getCategoryImages(`${businessId}-images`);
    
    // Convert uploaded images to the format expected by gallery
    const convertedUploadedImages = uploadedImages.map(img => ({
      srcUrl: img.url,
      altKey: `${businessId}UploadedImageAlt`,
      isUploaded: true
    }));
    
    // Combine both sets of images
    const allImages = [...convertedUploadedImages, ...staticImages];
    
    setCurrentGalleryImages(allImages);
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
    <section id="businesses" className="section-padding bg-muted/30 dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t('businessesTitle')}</h2>
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
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-8 h-auto">
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
                  <Card className="shadow-xl border-primary/20 overflow-hidden">
                    <CardHeader className="items-center text-center p-6 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10">
                      {business.iconElement ? React.cloneElement(business.iconElement, { className: "w-16 h-16 text-primary mb-4" }) : null}
                      <CardTitle className="text-3xl md:text-4xl">{t(business.nameKey)}</CardTitle>
                      <CardDescription className="text-lg text-primary font-semibold">{t(business.dataKey)}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Column 1: Business Details & Download Button */}
                        <div className="prose dark:prose-invert max-w-none flex flex-col justify-between h-full">
                          <div>
                            <p className="text-foreground/80 leading-relaxed mb-6">
                              {t(business.detailsKey)}
                            </p>
                          </div>
                          <div className="mt-auto space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button 
                                variant="outline" 
                                className="flex-1 sm:flex-none"
                                onClick={() => openGallery(business.id, business.nameKey)}
                              >
                                <Camera className="mr-2 h-4 w-4" />
                                {t('viewFacilityImages') || 'View Facility Images'}
                              </Button>
                              <Button asChild variant="secondary" className="flex-1 sm:flex-none">
                                <a href={business.productDataPublicUrl || '#'} download target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" /> {t('downloadDataButton') || 'Download Data'}
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Manufacturing Cycle */}
                        {business.resolvedCycleSteps && business.resolvedCycleSteps.length > 0 && (
                          <div className="md:pl-8 md:border-l md:border-border">
                            <motion.h3 
                              className="text-2xl font-semibold text-primary mb-10 text-center"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              {t(business.cycleTitleKey) || t('businessTabProcessFlowTitle')}
                            </motion.h3>
                            <div className="relative max-w-2xl mx-auto">
                              {/* Animated background line */}
                              <motion.div
                                className="absolute left-5 top-5 w-0.5 bg-gradient-to-b from-primary/20 to-primary/5"
                                initial={{ height: 0 }}
                                animate={{ height: `${(business.resolvedCycleSteps.length - 1) * 56}px` }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                              />
                              
                              {business.resolvedCycleSteps.map((step, index, arr) => (
                                <motion.div
                                  key={index}
                                  className="relative flex items-start group mb-4"
                                  variants={stepVariants}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, amount: 0.3 }}
                                  custom={index}
                                >
                                  <div className="flex flex-col items-center mr-4 z-10">
                                    <motion.div 
                                      className="flex items-center justify-center w-10 h-10 rounded-full bg-background group-hover:bg-primary transition-all duration-300 border-2 border-primary/30 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20"
                                      variants={iconVariants}
                                      initial="hidden"
                                      whileInView="visible"
                                      viewport={{ once: true }}
                                      custom={index}
                                      whileHover={{ scale: 1.1, rotate: 360 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <motion.div
                                        className="text-primary group-hover:text-primary-foreground transition-colors"
                                        whileHover={{ scale: 1.2 }}
                                      >
                                        {step.iconElement}
                                      </motion.div>
                                    </motion.div>
                                    {index < arr.length - 1 && (
                                      <motion.div 
                                        className="w-0.5 bg-primary/30 group-hover:bg-primary transition-all duration-300 mt-1"
                                        variants={lineVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        custom={index}
                                      />
                                    )}
                                  </div>
                                  <motion.div 
                                    className="pt-1.5 flex-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 + 0.15, duration: 0.3 }}
                                  >
                                    <motion.p 
                                      className="font-semibold text-foreground group-hover:text-primary transition-colors"
                                      whileHover={{ x: 5 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      {t('stepLabelPrefix') || 'Step'} {index + 1}: {t(step.textKey)}
                                    </motion.p>
                                    {(business.id === 'sugar' && step.textKey === 'manufacturingCycleSugarStep7' && business.cycleByproductKey) &&
                                      <motion.p 
                                        className="text-sm text-muted-foreground italic mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                      >
                                        {t(business.cycleByproductKey)}
                                      </motion.p>}
                                    {(business.id === 'power' && step.textKey === 'manufacturingCyclePowerStep5' && business.cycleByproductKey) &&
                                      <motion.p 
                                        className="text-sm text-muted-foreground italic mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                      >
                                        {t(business.cycleByproductKey)}
                                      </motion.p>}
                                    {(business.id === 'ethanol' && step.textKey === 'manufacturingCycleEthanolStep6' && business.cycleByproductKey) && 
                                      <motion.p 
                                        className="text-sm text-muted-foreground italic mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                      >
                                        {t(business.cycleByproductKey)}
                                      </motion.p>}
                                  </motion.div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
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