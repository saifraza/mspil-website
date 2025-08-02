import React from 'react';
import { motion } from 'framer-motion';

// Clean background components - all glass test components removed

// Floating gradient orbs for general use
export const FloatingOrbs = ({ colors = ['#22c55e', '#84cc16', '#a3e635'], opacity = 0.2 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            background: color,
            width: `${300 + index * 100}px`,
            height: `${300 + index * 100}px`,
            opacity: opacity,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 2,
          }}
          initial={{
            x: `${index * 30}%`,
            y: `${index * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

// Data visualization background for Data Insights
export const DataFlowBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Floating data points */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Animated gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(132, 204, 22, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(163, 230, 53, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Nature-inspired background for Sustainability
export const NatureBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated leaves */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-green-500/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            x: `+=${(Math.random() - 0.5) * 200}`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </motion.div>
      ))}
      
      {/* Subtle wind effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent 40%, rgba(34, 197, 94, 0.05) 50%, transparent 60%)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-green-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, '-20px', '20px'],
            x: [null, '-10px', '10px'],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Timeline/history background for About Us
export const TimelineBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated timeline lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <motion.line
          x1="20%"
          y1="0"
          x2="20%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
        <motion.line
          x1="80%"
          y1="0"
          x2="80%"
          y2="100%"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>
      
      {/* Floating years/milestones */}
      {['2005', '2010', '2016', '2018', '2024'].map((year, i) => (
        <motion.div
          key={year}
          className="absolute text-primary/10 font-bold text-6xl"
          initial={{
            x: `${20 + i * 15}%`,
            y: `${10 + i * 15}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.2, 0],
            y: [`${10 + i * 15}%`, `${15 + i * 15}%`, `${10 + i * 15}%`],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        >
          {year}
        </motion.div>
      ))}
      
      {/* Gradient waves */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at top left, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at bottom right, rgba(132, 204, 22, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at top right, rgba(163, 230, 53, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at bottom left, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Abstract shapes background for general use
export const AbstractShapesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-primary/10 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-primary/10"
        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        animate={{
          rotate: -360,
          borderRadius: [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '70% 30% 30% 70% / 70% 70% 30% 30%',
            '30% 70% 70% 30% / 30% 30% 70% 70%',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Floating dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, '+50px', '-50px', null],
            y: [null, '-50px', '+50px', null],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// NEW ANIMATION 1: Matrix Digital Rain
export const MatrixRainBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-green-400/20 text-xs font-mono"
          style={{ left: `${(i * 5) % 100}%` }}
          initial={{ y: -50, opacity: 1 }}
          animate={{
            y: '100vh',
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {Array.from({ length: 10 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
        </motion.div>
      ))}
    </div>
  );
};

// NEW ANIMATION 2: Pulsing Neural Network
export const NeuralNetworkBackground = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    id: i,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((otherNode, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${otherNode.x}%`}
              y2={`${otherNode.y}%`}
              stroke="rgba(34, 197, 94, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))
        )}
        
        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="rgba(34, 197, 94, 0.3)"
            animate={{
              r: [2, 6, 2],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// NEW ANIMATION 3: Floating Geometric Shapes
export const GeometricShapesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-primary/20"
          style={{
            width: `${50 + Math.random() * 100}px`,
            height: `${50 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// NEW ANIMATION 4: Energy Waves
export const EnergyWavesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + i * 10}% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [0.8, 2, 0.8],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// NEW ANIMATION 5: Constellation
export const ConstellationBackground = () => {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-green-400/40 rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          style={{
            width: '100px',
            top: `${Math.random() * 100}%`,
          }}
          initial={{ x: '-100px', opacity: 0 }}
          animate={{
            x: 'calc(100vw + 100px)',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// NEW ANIMATION 6: Liquid Morphing
export const LiquidMorphBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-green-400/10 to-blue-400/10"
          style={{
            width: '300px',
            height: '300px',
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            filter: 'blur(60px)',
          }}
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// NEW ANIMATION 7: Industrial Power Background
export const IndustrialPowerBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Green gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 60%, rgba(132, 204, 22, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 30%, rgba(163, 230, 53, 0.08) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 40%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Pulsing energy waves radiating outward */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`energy-wave-${i}`}
          className="absolute top-1/2 left-1/2 border border-green-400/20 rounded-full"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            marginTop: `-${100 + i * 75}px`,
            marginLeft: `-${100 + i * 75}px`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Circuit-like connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        {/* Horizontal lines */}
        <motion.line
          x1="0%"
          y1="25%"
          x2="100%"
          y2="25%"
          stroke="#22c55e"
          strokeWidth="1"
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
        <motion.line
          x1="0%"
          y1="75%"
          x2="100%"
          y2="75%"
          stroke="#84cc16"
          strokeWidth="1"
          strokeDasharray="10,5"
          animate={{
            strokeDashoffset: [0, -15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
        
        {/* Vertical lines */}
        <motion.line
          x1="20%"
          y1="0%"
          x2="20%"
          y2="100%"
          stroke="#a3e635"
          strokeWidth="1"
          strokeDasharray="8,4"
          animate={{
            strokeDashoffset: [0, -12],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.line
          x1="80%"
          y1="0%"
          x2="80%"
          y2="100%"
          stroke="#22c55e"
          strokeWidth="1"
          strokeDasharray="8,4"
          animate={{
            strokeDashoffset: [0, -12],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.8,
          }}
        />

        {/* Circuit nodes */}
        {[
          { x: 20, y: 25 }, { x: 80, y: 25 }, 
          { x: 20, y: 75 }, { x: 80, y: 75 },
          { x: 50, y: 50 }
        ].map((node, i) => (
          <motion.circle
            key={`circuit-node-${i}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="#22c55e"
            animate={{
              r: [2, 5, 2],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>

      {/* Power plant silhouettes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`power-plant-${i}`}
          className="absolute bottom-0 opacity-5"
          style={{
            left: `${15 + i * 35}%`,
            width: '80px',
            height: '120px',
          }}
          animate={{
            opacity: [0.02, 0.1, 0.02],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        >
          <svg width="80" height="120" viewBox="0 0 80 120" fill="currentColor" className="text-green-500">
            {/* Cooling towers */}
            <path d="M10 120 L10 80 Q10 60 20 60 Q30 60 30 80 L30 120 Z" />
            <path d="M35 120 L35 75 Q35 55 45 55 Q55 55 55 75 L55 120 Z" />
            {/* Smoke stacks */}
            <rect x="15" y="40" width="4" height="40" />
            <rect x="40" y="35" width="4" height="45" />
            {/* Main building */}
            <rect x="5" y="90" width="60" height="30" />
            {/* Power lines */}
            <line x1="70" y1="80" x2="80" y2="85" stroke="currentColor" strokeWidth="1" />
            <line x1="70" y1="85" x2="80" y2="90" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Electrical spark effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-green-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: Math.random() * 4,
            repeatDelay: Math.random() * 6 + 2,
          }}
        />
      ))}

      {/* Rotating gear elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`gear-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="currentColor" className="text-green-500">
            <path d="M50,10 L60,20 L90,20 L90,30 L80,40 L90,50 L90,60 L80,70 L90,80 L90,90 L60,90 L50,100 L40,90 L10,90 L10,80 L20,70 L10,60 L10,50 L20,40 L10,30 L10,20 L40,20 Z">
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
            </path>
          </svg>
        </motion.div>
      ))}

      {/* Floating energy particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`energy-particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-green-400/60 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, '-20px', '20px'],
            x: [null, '-15px', '15px'],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Power transmission lines */}
      <svg className="absolute inset-0 w-full h-full opacity-8">
        <motion.path
          d="M0,60 Q25,50 50,60 T100,60"
          stroke="#84cc16"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,3"
          animate={{
            strokeDashoffset: [0, -8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.path
          d="M0,40 Q30,30 60,40 T100,40"
          stroke="#a3e635"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,2"
          animate={{
            strokeDashoffset: [0, -6],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
            delay: 0.3,
          }}
        />
      </svg>
    </div>
  );
};