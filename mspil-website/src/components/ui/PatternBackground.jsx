import React from 'react';
import { motion } from 'framer-motion';

const PatternBackground = ({ variant = 'dots' }) => {
  if (variant === 'dots') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <motion.rect
                x="0"
                y="0"
                width="1"
                height="60"
                fill="currentColor"
                className="text-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{
                  duration: 4,
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
                className="text-green-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    );
  }

  if (variant === 'waves') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 50 Q 150 20 300 50 T 600 50 L 600 100 L 0 100 Z"
            fill="url(#wave-gradient)"
            initial={{ d: "M0 50 Q 150 20 300 50 T 600 50 L 600 100 L 0 100 Z" }}
            animate={{
              d: [
                "M0 50 Q 150 20 300 50 T 600 50 L 600 100 L 0 100 Z",
                "M0 50 Q 150 80 300 50 T 600 50 L 600 100 L 0 100 Z",
                "M0 50 Q 150 20 300 50 T 600 50 L 600 100 L 0 100 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default PatternBackground;