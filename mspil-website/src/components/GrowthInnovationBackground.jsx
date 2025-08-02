import React from 'react';
import { motion } from 'framer-motion';

const GrowthInnovationBackground = () => {
  // Animation variants
  const arrowVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: [-20, -40, -20], 
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.5, 0],
      opacity: [0, 0.6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { 
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const networkVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: [0, 1, 0],
      opacity: [0, 0.7, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const timelineVariants = {
    initial: { width: 0 },
    animate: { 
      width: ["0%", "100%", "0%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const metricsVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: [0, 100, 0],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeOut",
        delay: 1
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Upward Arrow Patterns */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`arrow-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 12}%`,
            top: `${60 + (i % 2) * 20}%`,
          }}
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.3 }}
        >
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
            <path
              d="M12 2L20 10H16V30H8V10H4L12 2Z"
              fill="#22c55e"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}

      {/* Expanding Growth Circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border-2"
          style={{
            left: `${20 + i * 15}%`,
            top: `${25 + i * 10}%`,
            width: '80px',
            height: '80px',
            borderColor: i % 2 === 0 ? '#22c55e' : '#84cc16',
          }}
          variants={circleVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: i * 0.8 }}
        />
      ))}

      {/* Innovation Icons Morphing */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#a3e635" strokeWidth="2" fill="none" />
          <path
            d="M20 8V12M20 28V32M32 20H28M12 20H8M28.28 11.72L25.86 14.14M14.14 25.86L11.72 28.28M28.28 28.28L25.86 25.86M14.14 14.14L11.72 11.72"
            stroke="#a3e635"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="6" fill="#22c55e" opacity="0.7" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/4"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="6" y="6" width="24" height="24" rx="4" stroke="#84cc16" strokeWidth="2" fill="none" />
          <path
            d="M12 18L16 22L24 14"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="2" fill="#a3e635" />
        </svg>
      </motion.div>

      {/* Network Connections Spreading */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Horizontal connections */}
        <motion.path
          d="M 10 30 Q 30 25 50 30 T 90 30"
          stroke="#22c55e"
          strokeWidth="0.5"
          fill="none"
          variants={networkVariants}
          initial="initial"
          animate="animate"
          opacity="0.5"
        />
        <motion.path
          d="M 10 50 Q 25 45 40 50 Q 60 55 80 50"
          stroke="#84cc16"
          strokeWidth="0.5"
          fill="none"
          variants={networkVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          opacity="0.5"
        />
        <motion.path
          d="M 20 70 Q 40 65 60 70 T 90 70"
          stroke="#a3e635"
          strokeWidth="0.5"
          fill="none"
          variants={networkVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          opacity="0.5"
        />

        {/* Vertical connections */}
        <motion.path
          d="M 25 10 Q 22 30 25 50 Q 28 70 25 90"
          stroke="#22c55e"
          strokeWidth="0.5"
          fill="none"
          variants={networkVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          opacity="0.4"
        />
        <motion.path
          d="M 75 10 Q 78 30 75 50 Q 72 70 75 90"
          stroke="#84cc16"
          strokeWidth="0.5"
          fill="none"
          variants={networkVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.5 }}
          opacity="0.4"
        />
      </svg>

      {/* Network nodes */}
      {[
        { x: 25, y: 30 }, { x: 50, y: 30 }, { x: 75, y: 30 },
        { x: 25, y: 50 }, { x: 40, y: 50 }, { x: 60, y: 50 }, { x: 75, y: 50 },
        { x: 25, y: 70 }, { x: 60, y: 70 }, { x: 75, y: 70 }
      ].map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            backgroundColor: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#84cc16' : '#a3e635',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Timeline Progress Elements */}
      <div className="absolute bottom-1/4 left-1/4 right-1/4">
        <div className="relative h-2 bg-gray-200 bg-opacity-20 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-lime-400 rounded-full"
            variants={timelineVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        
        {/* Timeline markers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`marker-${i}`}
            className="absolute w-3 h-3 rounded-full bg-green-500 border-2 border-white"
            style={{
              left: `${i * 25}%`,
              top: '-5px',
            }}
            animate={{
              scale: [1, 1.3, 1],
              backgroundColor: ['#22c55e', '#84cc16', '#22c55e'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Success Metrics Visualization - Bar Charts */}
      <div className="absolute top-1/2 right-12">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`metric-${i}`}
            className="w-4 bg-gradient-to-t from-green-500 to-lime-400 mb-2 rounded-t"
            style={{
              marginLeft: i * 6,
            }}
            variants={metricsVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Corporate Growth Symbols */}
      <motion.div
        className="absolute top-12 right-1/4"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M8 40V32L16 24L24 32L32 20L40 28V40H8Z"
            fill="#22c55e"
            opacity="0.6"
          />
          <path
            d="M8 32L16 24L24 32L32 20L40 28"
            stroke="#84cc16"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="28" r="2" fill="#a3e635" />
          <motion.path
            d="M35 23L39 19L43 23"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-12"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="18" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.7" />
          <circle cx="22" cy="22" r="12" stroke="#84cc16" strokeWidth="2" fill="none" opacity="0.8" />
          <circle cx="22" cy="22" r="6" fill="#a3e635" opacity="0.9" />
          <path
            d="M22 4V8M22 36V40M40 22H36M8 22H4"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Floating Innovation Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#22c55e', '#84cc16', '#a3e635'][i % 3],
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Growth Trend Lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 5 85 Q 25 75 45 65 Q 65 55 85 45"
          stroke="url(#growthGradient)"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GrowthInnovationBackground;