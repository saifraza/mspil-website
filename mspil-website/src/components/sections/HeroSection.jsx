import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/AnimatedCounter';
import { TrendingUp, BarChart2, Leaf as LeafIcon, Zap, Droplets, ShoppingBag, Factory, Sprout, Wind } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { pageBackgrounds } from '@/utils/backgroundStyles';

// Enhanced floating particle component with varied sizes and opacity
const FloatingParticle = ({ delay = 0, type = 'dot' }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 20;
  const randomSize = 0.5 + Math.random() * 1.5;
  
  const particleTypes = {
    dot: 'w-2 h-2 bg-gradient-to-r from-bio-green-400/30 to-eco-lime-400/20 rounded-full',
    leaf: 'w-4 h-4 text-bio-green-400/30',
    sprout: 'w-3 h-3 text-eco-lime-400/25'
  };
  
  return (
    <motion.div
      className={`absolute ${type === 'dot' ? particleTypes.dot : ''}`}
      initial={{ 
        x: `${randomX}vw`, 
        y: '110vh',
        scale: randomSize,
        rotate: 0
      }}
      animate={{
        y: '-10vh',
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 20}vw`],
        rotate: type !== 'dot' ? 360 : 0
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {type === 'leaf' && <LeafIcon className="w-full h-full" />}
      {type === 'sprout' && <Sprout className="w-full h-full" />}
    </motion.div>
  );
};

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
  //  // Not needed for static files
  const prefersReducedMotion = useReducedMotion();
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
  const [videoPosterUrl, setVideoPosterUrl] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
    backgroundVideoPath: "/videos/hero/hero_background_video.mp4", 
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
        to: "/data-insights", 
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
      { id: 1, value: 8000, labelKey: 'heroStatSugar', suffix: ' TCD', icon: <ShoppingBag className="w-6 h-6 text-white" /> },
      { id: 2, value: 24, labelKey: 'heroStatPower', suffix: ' MW', icon: <Zap className="w-6 h-6 text-white" /> },
      { id: 3, value: 350, labelKey: 'heroStatEthanol', suffix: ' KLPD', icon: <Droplets className="w-6 h-6 text-white" /> },
    ]
  }), []);

  useEffect(() => {
    // Use static video files directly for better performance
    setBackgroundVideoUrl(heroData.backgroundVideoPath);
    setVideoPosterUrl(heroData.videoPosterPath);
  }, [heroData.backgroundVideoPath, heroData.videoPosterPath]);

  return (
    <section ref={heroRef} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${pageBackgrounds.hero} pt-20`}>
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
      
      {/* Enhanced floating particles with variety */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FloatingParticle key={`dot-${i}`} delay={i * 1.5} type="dot" />
          ))}
          {[...Array(3)].map((_, i) => (
            <FloatingParticle key={`leaf-${i}`} delay={i * 2 + 0.5} type="leaf" />
          ))}
          {[...Array(2)].map((_, i) => (
            <FloatingParticle key={`sprout-${i}`} delay={i * 3 + 1} type="sprout" />
          ))}
        </div>
      )}
      
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
            poster={videoPosterUrl}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.8 : 0 }}
            transition={{ duration: 1 }}
            onLoadedData={() => setIsVideoLoaded(true)}
            aria-label={t(heroData.videoAltKey) || "Background video of company operations"}
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
            {t('heroVideoNotSupported') || 'Your browser does not support the video tag.'}
          </motion.video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent dark:from-background/80"></div>
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
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
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

        {/* Enhanced Key Metrics with Glass Morphism */}
        <motion.div 
          className="relative bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-sm rounded-3xl p-6 max-w-5xl mx-auto border border-white/20 shadow-xl overflow-hidden"
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
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundImage: [
                'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(132, 204, 22, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(163, 230, 53, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.h3 
            className="text-white/90 text-center text-xl font-bold mb-6 relative z-10"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {t('heroMetricsTitle') || 'Our Production Capacity'}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {heroData.stats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                className="group relative flex items-center justify-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl overflow-hidden"
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
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-bio-green-400/10 to-eco-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                <div className="flex-shrink-0 relative z-10">
                  <motion.div
                    className="p-3 bg-white/15 rounded-full backdrop-blur-md"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <div className="text-center relative z-10">
                  <AnimatedCounter 
                    to={stat.value} 
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold text-white/95 block drop-shadow-lg"
                  />
                  <motion.p 
                    className="text-white/90 text-sm font-semibold mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {t(stat.labelKey)}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;