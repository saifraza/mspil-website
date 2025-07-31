import React from 'react';
import { motion } from 'framer-motion';

// Subtle animated gradient background that moves slowly
export const SubtleGradientBackground = ({ 
  colors = ['rgba(34, 197, 94, 0.03)', 'rgba(132, 204, 22, 0.03)', 'rgba(163, 230, 53, 0.03)'],
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse at 0% 0%, ${colors[0]} 0%, transparent 70%)`,
            `radial-gradient(ellipse at 100% 0%, ${colors[1]} 0%, transparent 70%)`,
            `radial-gradient(ellipse at 100% 100%, ${colors[2]} 0%, transparent 70%)`,
            `radial-gradient(ellipse at 0% 100%, ${colors[0]} 0%, transparent 70%)`,
            `radial-gradient(ellipse at 0% 0%, ${colors[0]} 0%, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Very subtle floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [
              `${20 + i * 15}%`,
              `${30 + i * 15}%`,
              `${20 + i * 15}%`,
            ],
            y: [
              `${20 + i * 10}%`,
              `${60 + i * 5}%`,
              `${20 + i * 10}%`,
            ],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Subtle grid pattern that adds texture
export const SubtleGridPattern = ({ opacity = 0.03 }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(34, 197, 94, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 197, 94, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  );
};

// Combined subtle background effect
export const SubtleBackground = ({ type = 'gradient', colors, className = '' }) => {
  switch (type) {
    case 'grid':
      return <SubtleGridPattern />;
    case 'both':
      return (
        <>
          <SubtleGradientBackground colors={colors} className={className} />
          <SubtleGridPattern opacity={0.02} />
        </>
      );
    default:
      return <SubtleGradientBackground colors={colors} className={className} />;
  }
};