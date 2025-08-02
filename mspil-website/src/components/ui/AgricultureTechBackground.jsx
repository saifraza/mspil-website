import React from 'react';
import { motion } from 'framer-motion';

// Main AgricultureTechBackground component for MSPIL
export const AgricultureTechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Technology Grid Pattern */}
      <TechGrid />
      
      {/* Animated Sugarcane Stalks */}
      <SugarcaneField />
      
      {/* Production Data Points */}
      <ProductionMetrics />
      
      {/* Processing Flow Lines */}
      <ProcessingFlow />
      
      {/* Green Gradient Overlays */}
      <GreenGradients />
      
      {/* Floating Agriculture Particles */}
      <AgricultureParticles />
    </div>
  );
};

// Technology grid pattern for industrial tech theme
const TechGrid = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5">
      <defs>
        <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path 
            d="M 60 0 L 0 0 0 60" 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="1" 
          />
          <circle cx="0" cy="0" r="2" fill="#22c55e" opacity="0.3" />
          <circle cx="60" cy="60" r="2" fill="#84cc16" opacity="0.3" />
        </pattern>
        <pattern id="techGridSecondary" width="30" height="30" patternUnits="userSpaceOnUse">
          <path 
            d="M 30 0 L 0 0 0 30" 
            fill="none" 
            stroke="#a3e635" 
            strokeWidth="0.5" 
            opacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGrid)" />
      <rect width="100%" height="100%" fill="url(#techGridSecondary)" />
    </svg>
  );
};

// Animated sugarcane stalks swaying
const SugarcaneField = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stalk-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${12 + i * 11}%`,
            height: `${80 + Math.random() * 40}px`,
            width: '4px',
            background: 'linear-gradient(to top, #22c55e, #84cc16)',
            borderRadius: '2px',
            transformOrigin: 'bottom center',
          }}
          animate={{
            rotate: [0, 3, -3, 0],
            scaleY: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {/* Sugarcane leaves */}
          <motion.div
            className="absolute top-2 -left-1"
            style={{
              width: '6px',
              height: '12px',
              background: '#84cc16',
              borderRadius: '0 6px 6px 0',
              transformOrigin: 'left bottom',
            }}
            animate={{
              rotate: [0, 5, -2, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
          <motion.div
            className="absolute top-6 -right-1"
            style={{
              width: '6px',
              height: '12px',
              background: '#a3e635',
              borderRadius: '6px 0 0 6px',
              transformOrigin: 'right bottom',
            }}
            animate={{
              rotate: [0, -5, 2, 0],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Data points representing production metrics
const ProductionMetrics = () => {
  const metrics = [
    { label: 'Sugar', value: '8000 TCD', x: 15, y: 20 },
    { label: 'Ethanol', value: '350 KLPD', x: 70, y: 15 },
    { label: 'Power', value: '24 MW', x: 25, y: 70 },
    { label: 'DDGS', value: '200 MT/day', x: 85, y: 65 },
  ];

  return (
    <>
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="absolute"
          style={{
            left: `${metric.x}%`,
            top: `${metric.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          {/* Data point circle */}
          <motion.div
            className="w-6 h-6 bg-green-500/30 rounded-full border-2 border-green-400/50 relative"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                '0 0 0 10px rgba(34, 197, 94, 0)',
                '0 0 0 0 rgba(34, 197, 94, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          >
            {/* Data label */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-green-400/70 whitespace-nowrap"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            >
              {metric.label}
            </motion.div>
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-green-500/60 whitespace-nowrap"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5 + 0.5,
              }}
            >
              {metric.value}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

// Flowing lines representing processing
const ProcessingFlow = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20">
      {/* Main processing flow lines */}
      <motion.path
        d="M 10,50 Q 30,30 50,50 T 90,50"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        strokeDasharray="10,5"
        animate={{
          strokeDashoffset: [0, -15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.path
        d="M 20,70 Q 40,50 60,70 T 80,70"
        fill="none"
        stroke="url(#flowGradient2)"
        strokeWidth="2"
        strokeDasharray="8,4"
        animate={{
          strokeDashoffset: [0, -12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />
      
      <motion.path
        d="M 15,30 Q 35,10 55,30 T 85,30"
        fill="none"
        stroke="url(#flowGradient3)"
        strokeWidth="1.5"
        strokeDasharray="6,3"
        animate={{
          strokeDashoffset: [0, -9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
          <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0" />
          <stop offset="50%" stopColor="#84cc16" stopOpacity="1" />
          <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
          <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Green gradient overlays
const GreenGradients = () => {
  return (
    <>
      {/* Primary gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 40% 80%, rgba(163, 230, 53, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 60% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Secondary gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, transparent 30%, rgba(132, 204, 22, 0.05) 70%, transparent 100%)',
            'linear-gradient(45deg, rgba(132, 204, 22, 0.05) 0%, transparent 30%, rgba(163, 230, 53, 0.05) 70%, transparent 100%)',
            'linear-gradient(225deg, rgba(163, 230, 53, 0.05) 0%, transparent 30%, rgba(34, 197, 94, 0.05) 70%, transparent 100%)',
            'linear-gradient(315deg, rgba(34, 197, 94, 0.05) 0%, transparent 30%, rgba(132, 204, 22, 0.05) 70%, transparent 100%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </>
  );
};

// Floating agriculture particles
const AgricultureParticles = () => {
  return (
    <>
      {/* Large floating particles representing crops/seeds */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            background: `rgba(${i % 3 === 0 ? '34, 197, 94' : i % 3 === 1 ? '132, 204, 22' : '163, 230, 53'}, ${0.2 + Math.random() * 0.3})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 20, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Small dust particles for atmosphere */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-green-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -15, 15, 0],
            x: [0, 8, -8, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 6,
          }}
        />
      ))}
      
      {/* Technology connection nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-3 h-3 border border-green-400/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            borderColor: [
              'rgba(34, 197, 94, 0.3)',
              'rgba(132, 204, 22, 0.6)',
              'rgba(163, 230, 53, 0.3)',
              'rgba(34, 197, 94, 0.3)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
};

export default AgricultureTechBackground;