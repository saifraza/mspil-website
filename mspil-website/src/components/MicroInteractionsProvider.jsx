import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Create context for micro-interactions
const MicroInteractionsContext = createContext({});

export const useMicroInteractions = () => {
  const context = useContext(MicroInteractionsContext);
  if (!context) {
    throw new Error('useMicroInteractions must be used within MicroInteractionsProvider');
  }
  return context;
};

// Cursor trail component
const CursorTrail = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setTrails(prev => [...prev.slice(-10), newTrail]);
      
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          initial={{ x: trail.x - 4, y: trail.y - 4, scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Click effect component
const ClickEffect = () => {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setClicks(prev => [...prev, newClick]);
      
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            className="absolute"
            style={{ left: click.x, top: click.y }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-10 h-10 -ml-5 -mt-5 border-2 border-primary rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9997]"
      style={{ transformOrigin: '0 0' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
};

// Page transition wrapper
export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Link hover effect
export const LinkHoverEffect = ({ children, className }) => {
  return (
    <motion.span
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: 'inline-block' }}
    >
      {children}
      <motion.span
        className="block h-0.5 bg-current"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '0 0' }}
      />
    </motion.span>
  );
};

// Smooth scroll behavior
const enableSmoothScroll = () => {
  if (typeof window !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
};

// Main provider component
export const MicroInteractionsProvider = ({ 
  children, 
  enableCursorTrail = false,
  enableClickEffects = true,
  enableScrollProgress = true,
  enableSmoothScroll = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (enableSmoothScroll) {
      enableSmoothScroll();
    }
  }, [enableSmoothScroll]);

  const contextValue = {
    enableCursorTrail,
    enableClickEffects,
    enableScrollProgress,
    enableSmoothScroll,
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <MicroInteractionsContext.Provider value={contextValue}>
      {enableCursorTrail && <CursorTrail />}
      {enableClickEffects && <ClickEffect />}
      {enableScrollProgress && <ScrollProgress />}
      {children}
    </MicroInteractionsContext.Provider>
  );
};

// Export utility functions for direct use
export const microAnimations = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4 }
  },
  
  // Scale animations
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.4 }
  },
  
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.4 }
  },
  
  // Hover effects
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  
  hoverLift: {
    whileHover: { y: -5 },
    whileTap: { y: 0 }
  },
  
  hoverGlow: {
    whileHover: { 
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
      transition: { duration: 0.3 }
    }
  }
};

export default MicroInteractionsProvider;