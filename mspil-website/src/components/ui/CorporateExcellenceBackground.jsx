import React from 'react';
import { motion } from 'framer-motion';

const CorporateExcellenceBackground = () => {
  // Animation variants
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const connectionLineVariants = {
    animate: {
      pathLength: [0, 1, 0],
      opacity: [0, 0.6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  const geometricShapeVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.05, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-lime-50/30" />
      
      {/* Sophisticated geometric patterns */}
      <div className="absolute inset-0">
        {/* Large geometric shapes */}
        <motion.div
          variants={geometricShapeVariants}
          animate="animate"
          className="absolute top-20 left-20 w-32 h-32 border border-green-200/30"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
        />
        
        <motion.div
          variants={geometricShapeVariants}
          animate="animate"
          className="absolute top-40 right-32 w-24 h-24 border border-lime-300/40 rounded-full"
          style={{ animationDelay: '2s' }}
        />
        
        <motion.div
          variants={geometricShapeVariants}
          animate="animate"
          className="absolute bottom-32 left-40 w-28 h-28 border border-emerald-200/35"
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            animationDelay: '4s'
          }}
        />
        
        <motion.div
          variants={geometricShapeVariants}
          animate="animate"
          className="absolute bottom-20 right-20 w-20 h-20 border border-green-300/30"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animationDelay: '6s'
          }}
        />
      </div>

      {/* Excellence badges floating */}
      <div className="absolute inset-0">
        {/* ISO Quality Badge */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 left-1/4"
          style={{ animationDelay: '0s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <div className="text-white text-xs font-bold text-center leading-tight">
                ISO<br/>9001
              </div>
            </motion.div>
            <div className="absolute -inset-2 bg-green-200/20 rounded-full blur-sm" />
          </div>
        </motion.div>

        {/* Excellence Star */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/3"
          style={{ animationDelay: '1s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-lg"
              style={{
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              }}
            >
              <div className="text-white text-lg font-bold">★</div>
            </motion.div>
            <div className="absolute -inset-2 bg-lime-200/20 blur-sm" style={{
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
            }} />
          </div>
        </motion.div>

        {/* Leadership Crown */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 left-1/6"
          style={{ animationDelay: '2s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-14 h-10 bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg"
              style={{
                clipPath: "polygon(0% 100%, 20% 0%, 40% 100%, 60% 0%, 80% 100%, 100% 20%, 100% 100%)"
              }}
            >
              <div className="text-white text-xs font-bold">♔</div>
            </motion.div>
            <div className="absolute -inset-2 bg-emerald-200/20 blur-sm" />
          </div>
        </motion.div>

        {/* Trust Shield */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/3 right-1/4"
          style={{ animationDelay: '3s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-14 h-16 bg-gradient-to-br from-green-500 to-lime-600 flex items-center justify-center shadow-lg"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}
            >
              <div className="text-white text-lg font-bold">🛡</div>
            </motion.div>
            <div className="absolute -inset-2 bg-green-200/20 blur-sm" />
          </div>
        </motion.div>

        {/* Innovation Diamond */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 left-1/3"
          style={{ animationDelay: '4s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg transform rotate-45"
            >
              <div className="text-white text-sm font-bold transform -rotate-45">💎</div>
            </motion.div>
            <div className="absolute -inset-2 bg-lime-200/20 rounded-full blur-sm" />
          </div>
        </motion.div>

        {/* Quality Seal */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-2/3 right-1/6"
          style={{ animationDelay: '5s' }}
        >
          <div className="relative">
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-green-300/50"
            >
              <div className="text-white text-xs font-bold text-center leading-tight">
                QUALITY<br/>✓
              </div>
            </motion.div>
            <div className="absolute -inset-2 bg-emerald-200/20 rounded-full blur-sm" />
          </div>
        </motion.div>
      </div>

      {/* Professional connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0" />
            <stop offset="50%" stopColor="#a3e635" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Connection lines between excellence badges */}
        <motion.path
          d="M 200 150 Q 400 200 600 180"
          stroke="url(#connectionGradient1)"
          strokeWidth="2"
          fill="none"
          variants={connectionLineVariants}
          animate="animate"
          style={{ animationDelay: '0s' }}
        />
        
        <motion.path
          d="M 150 300 Q 350 250 550 320"
          stroke="url(#connectionGradient2)"
          strokeWidth="2"
          fill="none"
          variants={connectionLineVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        
        <motion.path
          d="M 300 450 Q 500 350 700 400"
          stroke="url(#connectionGradient1)"
          strokeWidth="2"
          fill="none"
          variants={connectionLineVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        
        <motion.path
          d="M 100 400 Q 300 500 500 450"
          stroke="url(#connectionGradient2)"
          strokeWidth="1.5"
          fill="none"
          variants={connectionLineVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
        />
      </svg>

      {/* Corporate hierarchy structures */}
      <div className="absolute inset-0 opacity-30">
        {/* Organizational grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-12 grid-rows-8 h-full gap-1 p-8">
            {Array.from({ length: 96 }, (_, i) => (
              <motion.div
                key={i}
                className="border border-green-200/20"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                  backgroundColor: ['rgba(34, 197, 94, 0)', 'rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0)']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prestige indicators - subtle accent elements */}
      <div className="absolute inset-0">
        {/* Corporate corner accents */}
        <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-green-300/40" />
        <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-emerald-300/40" />
        <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-lime-300/40" />
        <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-green-300/40" />
        
        {/* Central excellence focal point */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-2 h-2 bg-green-400/60 rounded-full" />
          <div className="absolute inset-0 w-4 h-4 border border-green-300/40 rounded-full -translate-x-1 -translate-y-1" />
          <div className="absolute inset-0 w-6 h-6 border border-emerald-200/30 rounded-full -translate-x-2 -translate-y-2" />
        </motion.div>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5" />
    </div>
  );
};

export default CorporateExcellenceBackground;