import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FullPageBackground = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to gradient positions
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const gradientX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed background that spans entire page */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient that shifts with scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.2, 0.4, 0.6, 0.8, 1],
              [
                'radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse at 40% 40%, rgba(132, 204, 22, 0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse at 60% 50%, rgba(163, 230, 53, 0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse at 80% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse at 50% 70%, rgba(132, 204, 22, 0.15) 0%, transparent 60%)',
                'radial-gradient(ellipse at 20% 80%, rgba(163, 230, 53, 0.15) 0%, transparent 60%)'
              ]
            ),
          }}
        />

        {/* Animated mesh overlay that morphs with scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]),
          }}
        >
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="animated-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <motion.rect
                  x="0"
                  y="0"
                  width="1"
                  height="100"
                  fill="currentColor"
                  className="text-green-500"
                  style={{
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
                  }}
                />
                <motion.rect
                  x="0"
                  y="0"
                  width="100"
                  height="1"
                  fill="currentColor"
                  className="text-green-500"
                  style={{
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="2"
                  fill="currentColor"
                  className="text-green-600"
                  style={{
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
                  }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#animated-grid)" />
          </svg>
        </motion.div>

        {/* Large floating ambient orbs that move with scroll */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
            top: '-20%',
            left: '-10%',
            x: gradientX,
            y: gradientY,
            scale: scale,
          }}
        />
        
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
            bottom: '-10%',
            right: '-10%',
            x: useTransform(gradientX, x => -x * 0.7),
            y: useTransform(gradientY, y => -y * 0.5),
            scale: scale,
          }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
            top: '40%',
            left: '40%',
            x: useTransform(gradientX, x => x * 0.5),
            y: useTransform(gradientY, y => y * 0.5),
            rotate: rotation,
            scale: scale,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 50%)',
            filter: 'blur(60px)',
            top: '60%',
            right: '20%',
            x: useTransform(gradientX, x => -x * 0.3),
            y: gradientY,
            scale: scale,
          }}
        />

        {/* Animated floating dots that respond to scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]),
          }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full"
              style={{
                left: `${(i * 2) % 100}%`,
                top: `${(i * 3) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, i % 2 ? 20 : -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8 + (i % 5),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Morphing geometric shapes */}
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 border border-green-500/10"
          style={{
            borderRadius: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              ['10%', '30%', '50%', '30%', '10%']
            ),
            rotate: rotation,
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 border border-lime-500/10"
          style={{
            borderRadius: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              ['50%', '30%', '10%', '30%', '50%']
            ),
            rotate: useTransform(rotation, r => -r * 0.5),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]),
          }}
        />
        {/* Flowing wave patterns at different scroll positions */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.05)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(132, 204, 22, 0.05)" />
              <stop offset="100%" stopColor="rgba(132, 204, 22, 0)" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,100 Q200,50 400,100 T800,100 L800,300 L0,300 Z"
            fill="url(#wave-gradient-1)"
            style={{
              d: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [
                  'M0,100 Q200,50 400,100 T800,100 L800,300 L0,300 Z',
                  'M0,150 Q200,100 400,150 T800,150 L800,300 L0,300 Z',
                  'M0,100 Q200,50 400,100 T800,100 L800,300 L0,300 Z'
                ]
              ),
            }}
          />
          
          <motion.path
            d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z"
            fill="url(#wave-gradient-2)"
            style={{
              d: useTransform(
                scrollYProgress,
                [0, 0.5, 1],
                [
                  'M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z',
                  'M0,250 Q300,200 600,250 T1200,250 L1200,400 L0,400 Z',
                  'M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z'
                ]
              ),
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FullPageBackground;