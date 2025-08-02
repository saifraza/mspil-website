import React from 'react';
import { motion } from 'framer-motion';

const SustainableEnergyBackground = () => {
  // Generate particle positions for leaves
  const leafParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
  }));

  // Generate solar panel positions
  const solarPanels = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 40,
    delay: i * 0.5,
  }));

  // Generate floating eco symbols
  const ecoSymbols = ['🌱', '♻️', '🌿', '🍃', '🌾', '💚'];
  const floatingSymbols = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    symbol: ecoSymbols[i % ecoSymbols.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 60% 20%, rgba(163, 230, 53, 0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(132, 204, 22, 0.02) 100%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.08) 0%, transparent 50%),
             radial-gradient(circle at 60% 20%, rgba(163, 230, 53, 0.06) 0%, transparent 50%),
             linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(132, 204, 22, 0.02) 100%)`,
            `radial-gradient(circle at 30% 40%, rgba(132, 204, 22, 0.12) 0%, transparent 50%),
             radial-gradient(circle at 70% 60%, rgba(163, 230, 53, 0.08) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
             linear-gradient(135deg, rgba(132, 204, 22, 0.03) 0%, rgba(163, 230, 53, 0.02) 100%)`,
            `radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.08) 0%, transparent 50%),
             radial-gradient(circle at 60% 20%, rgba(163, 230, 53, 0.06) 0%, transparent 50%),
             linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(132, 204, 22, 0.02) 100%)`
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Organic Flowing Shapes */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'linear-gradient(45deg, #22c55e, #84cc16)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-8"
        style={{
          background: 'linear-gradient(225deg, #84cc16, #a3e635)',
          filter: 'blur(35px)'
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Flowing Leaf Particles */}
      {leafParticles.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute w-2 h-2 rounded-full opacity-30"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            background: 'linear-gradient(45deg, #22c55e, #84cc16)',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -5, 0],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Solar Panel Reflections */}
      {solarPanels.map((panel) => (
        <motion.div
          key={panel.id}
          className="absolute w-8 h-6 opacity-20"
          style={{
            left: `${panel.x}%`,
            top: `${panel.y}%`,
            background: 'linear-gradient(135deg, #22c55e 0%, #84cc16 50%, #a3e635 100%)',
            borderRadius: '2px',
            transform: 'perspective(100px) rotateX(15deg)',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 4,
            delay: panel.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Wind Turbine Rotation Effects */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-24 h-24 opacity-15"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, #22c55e, transparent, #84cc16, transparent, #a3e635, transparent)`
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/5 w-16 h-16 opacity-12"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(from 45deg, transparent, #84cc16, transparent, #a3e635, transparent)`
          }}
        />
      </motion.div>

      {/* Nature-Inspired Pattern Waves */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-8"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.path
          d="M0,20 Q25,10 50,20 T100,20 L100,25 Q75,35 50,25 T0,25 Z"
          fill="url(#greenGradient1)"
          animate={{
            d: [
              "M0,20 Q25,10 50,20 T100,20 L100,25 Q75,35 50,25 T0,25 Z",
              "M0,25 Q25,15 50,25 T100,25 L100,30 Q75,40 50,30 T0,30 Z",
              "M0,20 Q25,10 50,20 T100,20 L100,25 Q75,35 50,25 T0,25 Z"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,60 Q25,50 50,60 T100,60 L100,65 Q75,75 50,65 T0,65 Z"
          fill="url(#greenGradient2)"
          animate={{
            d: [
              "M0,60 Q25,50 50,60 T100,60 L100,65 Q75,75 50,65 T0,65 Z",
              "M0,55 Q25,45 50,55 T100,55 L100,60 Q75,70 50,60 T0,60 Z",
              "M0,60 Q25,50 50,60 T100,60 L100,65 Q75,75 50,65 T0,65 Z"
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="greenGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#84cc16" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#a3e635" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Floating Eco-Friendly Symbols */}
      {floatingSymbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute text-lg opacity-20"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            filter: 'hue-rotate(90deg) saturate(150%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: symbol.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {symbol.symbol}
        </motion.div>
      ))}

      {/* Energy Flow Lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M10,30 Q30,20 50,30 Q70,40 90,30"
            stroke="#22c55e"
            strokeWidth="0.2"
            fill="none"
            strokeDasharray="2,2"
            animate={{
              strokeDashoffset: [0, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.path
            d="M10,70 Q30,60 50,70 Q70,80 90,70"
            stroke="#84cc16"
            strokeWidth="0.2"
            fill="none"
            strokeDasharray="2,2"
            animate={{
              strokeDashoffset: [0, 10],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>

      {/* Subtle Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default SustainableEnergyBackground;