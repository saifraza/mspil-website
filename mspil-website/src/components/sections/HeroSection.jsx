import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/AnimatedCounter';
import { TrendingUp, BarChart2, Leaf as LeafIcon, Zap, Droplets, ShoppingBag, Factory, Sprout, Wind } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { pageBackgrounds } from '@/utils/backgroundStyles';

// Detect mobile devices for performance optimizations
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

// Preload critical hero image for instant LCP
const HERO_IMAGE_URL = '/images/hero/hero-bg-optimized.webp';
const HERO_VIDEO_URL = '/videos/hero/hero_background_video.mp4';
const VIDEO_POSTER_URL = '/videos/hero/hero_video_thumbnail.jpg';


// Animated gradient background
const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 opacity-90"
      animate={{
        background: [
          'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(132, 204, 22, 0.9) 50%, rgba(163, 230, 53, 0.85) 100%)',
          'linear-gradient(135deg, rgba(132, 204, 22, 0.95) 0%, rgba(163, 230, 53, 0.9) 50%, rgba(34, 197, 94, 0.85) 100%)',
          'linear-gradient(135deg, rgba(163, 230, 53, 0.95) 0%, rgba(34, 197, 94, 0.9) 50%, rgba(132, 204, 22, 0.85) 100%)',
          'linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(132, 204, 22, 0.9) 50%, rgba(163, 230, 53, 0.85) 100%)',
        ]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const HeroSection = () => {
  const t = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
  const [videoPosterUrl, setVideoPosterUrl] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroData = useMemo(() => ({
    taglinePart1Key: "heroTagline1",
    taglinePart2Key: "heroTagline2",
    introKey: "heroIntro",
    // Available video sources (using only existing files)
    videoSources: {
      original: "/videos/hero/hero_background_video.mp4"
    },
    videoPosterPath: "/videos/hero/hero_video_thumbnail.jpg",
    videoAltKey: "heroVideoAlt",
    ctaButtons: [
      { 
        textKey: "heroCtaInvestors", 
        to: "/investor-relations", 
        variant: "default", 
        icon: <TrendingUp className="mr-2 h-5 w-5" /> 
      },
      { 
        textKey: "heroCtaDataInsights", 
        to: "/investor-relations", 
        variant: "secondary", 
        icon: <BarChart2 className="mr-2 h-5 w-5" /> 
      },
      { 
        textKey: "heroCtaSustainability", 
        to: "/sustainability", 
        variant: "outline", 
        icon: <LeafIcon className="mr-2 h-5 w-5" /> 
      },
    ],
    stats: [
      { id: 1, value: 8000, labelKey: 'heroStatSugar', suffix: ' TCD', icon: <ShoppingBag />, link: '/businesses#sugar' },
      { id: 2, value: 350, labelKey: 'heroStatEthanol', suffix: ' KLPD', icon: <Droplets />, link: '/businesses#ethanol' },
      { id: 3, value: 35, labelKey: 'heroStatPower', suffix: ' MW', icon: <Zap />, link: '/businesses#power' },
    ]
  }), []);

  useEffect(() => {
    // Detect mobile device
    setIsMobileDevice(isMobile());
    
    // AGGRESSIVE LCP OPTIMIZATION: Prioritize static image over video
    const loadOptimizedMedia = () => {
      // Always set poster first for immediate LCP
      setVideoPosterUrl(heroData.videoPosterPath);
      
      // OPTIMIZED MOBILE VIDEO LOADING: Load video but with smart performance strategies
      const isFastConnection = navigator.connection?.effectiveType === '4g' || !navigator.connection;
      const hasEnoughMemory = navigator.deviceMemory ? navigator.deviceMemory >= 2 : true;
      
      // Load video for all devices but with different strategies
      if (isFastConnection && hasEnoughMemory && !prefersReducedMotion) {
        // Desktop: Load immediately after page load
        const delay = isMobileDevice ? 8000 : 2000; // 8s for mobile, 2s for desktop
        const timer = setTimeout(() => {
          setBackgroundVideoUrl(heroData.videoSources.original);
        }, delay);
        
        return () => clearTimeout(timer);
      } else if (isMobileDevice) {
        // Mobile with slow connection: Load after user interaction
        const handleInteraction = () => {
          setBackgroundVideoUrl(heroData.videoSources.original);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('scroll', handleInteraction);
        };
        
        document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
        document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
        
        return () => {
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('scroll', handleInteraction);
        };
      }
    };
    
    loadOptimizedMedia();
  }, [heroData, isMobileDevice, prefersReducedMotion]);

  // Smart preload optimization - only preload what will be used, and only when component is about to use it
  useEffect(() => {
    let preloadLink = null;
    
    // Add a small delay to ensure we're actually going to use the resource
    const preloadTimer = setTimeout(() => {
      if (isMobileDevice && heroData?.backgroundImage) {
        // Mobile: preload critical hero image for LCP optimization
        preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = HERO_IMAGE_URL;
        preloadLink.fetchPriority = 'high';
        document.head.appendChild(preloadLink);
      } else if (videoPosterUrl && !isMobileDevice) {
        // Desktop: only preload poster if we have it and will use it
        preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = videoPosterUrl;
        preloadLink.fetchPriority = 'high';
        document.head.appendChild(preloadLink);
      }
    }, 100); // Small delay to ensure component is actually being used

    return () => {
      clearTimeout(preloadTimer);
      if (preloadLink && document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, [isMobileDevice, videoPosterUrl, heroData]);

  return (
    <section ref={heroRef} className={`relative min-h-[100vh] sm:h-[80vh] flex items-center justify-center overflow-hidden ${pageBackgrounds.hero} pt-20`}>
      {/* Enhanced animated gradient background */}
      {/* <AnimatedGradient /> */}
      
      {/* Additional ambient glow effects */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y, opacity }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-bio-green-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [-30, 30, -30],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-eco-lime-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [50, -50, 50],
            y: [30, -30, 30],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <AnimatePresence mode="wait">
          {!isVideoLoaded && videoPosterUrl && (
            <motion.img
              key="poster"
              src={videoPosterUrl}
              alt={t(heroData.videoAltKey) || "Company operations poster image"}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
        {backgroundVideoUrl && (
          <motion.video
            key={backgroundVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload={isMobileDevice ? "metadata" : "auto"} // Load only metadata on mobile
            poster={videoPosterUrl}
            className={`w-full h-full object-cover hero-background-video ${isMobileDevice ? 'samsung-safe' : ''}`}
            style={{ 
              willChange: 'opacity',
              // Reduce video quality on mobile for better performance
              filter: isMobileDevice ? 'brightness(1.1) contrast(0.9)' : 'none'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.5 : 0 }}
            transition={{ duration: isMobileDevice ? 0.3 : 1 }}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={(e) => {
              console.warn('Video failed to load, falling back to poster image');
              setIsVideoLoaded(false);
            }}
            aria-label={t(heroData.videoAltKey) || "Background video of company operations"}
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
            {t('heroVideoNotSupported') || 'Your browser does not support the video tag.'}
          </motion.video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-bio-green-900/10 via-transparent to-eco-lime-900/10"></div>
      </motion.div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-8 md:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.8 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
              }
            }
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
        >
          <motion.span 
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-600 to-teal-500 dark:from-primary dark:via-green-400 dark:to-teal-300"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            {t(heroData.taglinePart1Key)}
          </motion.span>
          <motion.span 
            className="block text-3xl sm:text-4xl md:text-5xl text-foreground/80 dark:text-foreground/70 mt-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t(heroData.taglinePart2Key)}
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-lg sm:text-xl text-foreground/70 dark:text-foreground/60 mb-10"
        >
          {t(heroData.introKey)}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                staggerChildren: 0.1
              }
            }
          }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {heroData.ctaButtons.map((button, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button 
                variant={button.variant} 
                size="lg" 
                asChild 
                className="shadow-lg hover:shadow-xl transform transition-all duration-300 relative overflow-hidden group"
              >
                <Link to={button.to}>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  {button.icon} {t(button.textKey)}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Key Metrics with Glass Morphism - Mobile Optimized */}
        <motion.div 
          className={`relative ${isMobileDevice ? 'bg-white/20 samsung-safe' : 'bg-white/10 backdrop-blur-md'} rounded-2xl p-4 mx-4 sm:mx-auto sm:max-w-2xl border border-white/20 shadow-lg overflow-hidden mt-6 mb-8`}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }
            }
          }}
        >
          
          <motion.h3 
            className="text-white/80 text-center text-xs sm:text-sm font-semibold mb-4 relative z-10 uppercase tracking-wider"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {t('heroMetricsTitle') || 'Our Operational Excellence'}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 md:gap-3 relative z-10">
            {heroData.stats.map((stat, index) => (
              <Link to={stat.link} key={stat.id}>
                <motion.div 
                  className={`group relative flex flex-col sm:flex-row items-center sm:space-x-2 space-y-1 sm:space-y-0 ${isMobileDevice ? 'bg-black/40 border-white/20' : 'bg-white/10 backdrop-blur-sm border-white/10'} rounded-xl p-4 sm:p-2 hover:bg-white/20 transition-all duration-300 border cursor-pointer shadow-lg`}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                <div className="flex-shrink-0 relative z-10 sm:mb-0 mb-2">
                  {React.cloneElement(stat.icon, { className: `w-6 h-6 sm:w-5 sm:h-5 ${isMobileDevice ? 'text-white' : 'text-white/80'}` })}
                </div>
                <div className="text-center sm:text-left relative z-10 flex-1">
                  <AnimatedCounter 
                    to={stat.value} 
                    suffix={stat.suffix}
                    className={`text-2xl sm:text-xl md:text-2xl font-bold ${isMobileDevice ? 'text-white' : 'text-white/90'} block`}
                  />
                  <motion.p 
                    className={`${isMobileDevice ? 'text-white/90' : 'text-white/70'} text-sm sm:text-xs font-medium`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {t(stat.labelKey)}
                  </motion.p>
                  {stat.subtext && (
                    <motion.p 
                      className="text-white/70 text-xs mt-1 px-2 py-0.5 bg-white/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {stat.subtext}
                    </motion.p>
                  )}
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;