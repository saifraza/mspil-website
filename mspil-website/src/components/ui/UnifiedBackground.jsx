import React from 'react';
import { motion } from 'framer-motion';
import { 
  FloatingOrbs, 
  MatrixRainBackground, 
  NeuralNetworkBackground, 
  GeometricShapesBackground, 
  EnergyWavesBackground, 
  ConstellationBackground, 
  LiquidMorphBackground 
} from './AnimatedBackgrounds';

const UnifiedBackground = ({ animationType = 'default' }) => {
  // Render different animations based on animationType prop
  const renderAnimation = () => {
    switch (animationType) {
      case 'matrix':
        return <MatrixRainBackground />;
      case 'neural':
        return <NeuralNetworkBackground />;
      case 'geometric':
        return <GeometricShapesBackground />;
      case 'energy':
        return <EnergyWavesBackground />;
      case 'constellation':
        return <ConstellationBackground />;
      case 'liquid':
        return <LiquidMorphBackground />;
      case 'orbs':
        return <FloatingOrbs />;
      case 'default':
      default:
        return null; // Use the default animation below
    }
  };

  // If custom animation is selected, render it instead of default
  if (animationType !== 'default') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-lime-50/40 dark:from-green-950/30 dark:via-emerald-950/20 dark:to-lime-950/25" />
        {renderAnimation()}
      </div>
    );
  }
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient layer with color shifts */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.08), rgba(132, 204, 22, 0.06))',
            'linear-gradient(to bottom right, rgba(132, 204, 22, 0.1), rgba(34, 197, 94, 0.08), rgba(16, 185, 129, 0.06))',
            'linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(132, 204, 22, 0.08), rgba(34, 197, 94, 0.06))',
            'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.08), rgba(132, 204, 22, 0.06))',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Fast moving orbs */}
      <motion.div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-gradient-to-br from-green-400/35 to-emerald-400/35 rounded-full blur-3xl"
        animate={{
          x: [0, 200, -100, 0],
          y: [0, 150, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-gradient-to-br from-lime-400/35 to-green-400/35 rounded-full blur-3xl"
        animate={{
          x: [0, -200, 100, 0],
          y: [0, -150, -50, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 0.8, 1],
          rotate: [0, 270, 360],
          x: [0, 100, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Rapid pulsing grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="dynamic-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <motion.rect
              x="0"
              y="0"
              width="1"
              height="60"
              fill="currentColor"
              className="text-green-600"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x="0"
              y="0"
              width="60"
              height="1"
              fill="currentColor"
              className="text-green-600"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dynamic-grid)" />
      </svg>

      {/* Fast floating particles */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-green-400/70 to-emerald-400/70 rounded-full"
            style={{
              left: `${(i * 2.86) % 100}%`,
              top: `${(i * 3.14) % 100}%`,
            }}
            animate={{
              y: [0, -60, 20, 0],
              x: [0, i % 2 ? 30 : -30, 0],
              opacity: [0.3, 0.9, 0.1, 0.3],
              scale: [0.5, 1.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dynamic wave overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            fill="url(#wave-gradient-dynamic)"
            animate={{
              d: [
                "M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,128C1120,107,1280,117,1360,133.3L1440,149L1440,320L0,320Z",
                "M0,128L80,149.3C160,171,320,213,480,208C640,203,800,149,960,144C1120,139,1280,181,1360,197.3L1440,213L1440,320L0,320Z",
                "M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,170.7C1120,149,1280,139,1360,154.7L1440,171L1440,320L0,320Z",
                "M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,128C1120,107,1280,117,1360,133.3L1440,149L1440,320L0,320Z"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <defs>
            <linearGradient id="wave-gradient-dynamic" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default UnifiedBackground;