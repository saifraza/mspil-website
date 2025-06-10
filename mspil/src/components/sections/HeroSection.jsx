import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedCounter from '@/components/AnimatedCounter';
import { TrendingUp, BarChart2, Leaf as LeafIcon, Zap, Droplets, ShoppingBag } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Floating particle component
const FloatingParticle = ({ delay = 0 }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 20;
  
  return (
    <motion.div
      className="absolute w-2 h-2 bg-primary/20 rounded-full"
      initial={{ x: `${randomX}vw`, y: '110vh' }}
      animate={{
        y: '-10vh',
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 20}vw`],
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const HeroSection = () => {
  const t = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState('');
  const [videoPosterUrl, setVideoPosterUrl] = useState('');

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
    // Use local uploaded files directly
    setBackgroundVideoUrl(heroData.backgroundVideoPath);
    setVideoPosterUrl(heroData.videoPosterPath);
  }, [heroData.backgroundVideoPath, heroData.videoPosterPath]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 dark:from-green-900 dark:via-teal-800 dark:to-blue-900 pt-20">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Floating particles - reduced for performance */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 1.5} />
          ))}
        </div>
      )}
      
      <div className="absolute inset-0 z-0">
        {backgroundVideoUrl ? (
          <video
            key={backgroundVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={videoPosterUrl}
            className="w-full h-full object-cover opacity-50 dark:opacity-30"
            aria-label={t(heroData.videoAltKey) || "Background video of company operations"}
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
            {t('heroVideoNotSupported') || 'Your browser does not support the video tag.'}
          </video>
        ) : (
          videoPosterUrl && <img src={videoPosterUrl} alt={t(heroData.videoAltKey) || "Company operations poster image"} className="w-full h-full object-cover opacity-50 dark:opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent dark:from-background/90"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 py-12 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
        >
          {heroData.ctaButtons.map((button, index) => (
            <motion.div
              key={index}
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

        {/* Key Metrics Overlay */}
        <motion.div 
          className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-6xl mx-auto border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.h3 
            className="text-white text-center text-lg font-semibold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {t('heroMetricsTitle')}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroData.stats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                className="flex items-center justify-center space-x-4 bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <AnimatedCounter 
                    to={stat.value} 
                    suffix={stat.suffix}
                    className="text-2xl md:text-3xl font-bold text-white block"
                  />
                  <p className="text-white/90 text-sm font-medium">
                    {t(stat.labelKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;