import React from 'react';
import { motion } from 'framer-motion';

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