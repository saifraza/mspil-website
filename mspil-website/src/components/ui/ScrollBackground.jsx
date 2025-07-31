import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollBackground = ({ children }) => {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform values based on scroll
  const gradientY = useTransform(scrollY, [0, windowHeight * 2], [0, 100]);
  const gradientX = useTransform(scrollY, [0, windowHeight * 2], [0, 50]);
  const scale = useTransform(scrollY, [0, windowHeight], [1, 1.2]);
  const rotate = useTransform(scrollY, [0, windowHeight * 2], [0, 180]);
  const opacity = useTransform(scrollY, [0, windowHeight], [0.4, 0.1]);

  return (
    <div className="relative">
      {/* Dynamic gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              scrollY,
              [0, windowHeight, windowHeight * 2, windowHeight * 3],
              [
                'radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 80% 50%, rgba(132, 204, 22, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 50% 80%, rgba(163, 230, 53, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)'
              ]
            ),
          }}
        />

        {/* Animated blob 1 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            x: gradientX,
            y: gradientY,
            scale: scale,
          }}
        />

        {/* Animated blob 2 */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80"
          style={{
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            x: useTransform(gradientX, (x) => -x),
            y: useTransform(gradientY, (y) => -y * 0.5),
            scale: scale,
          }}
        />

        {/* Animated blob 3 */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
            x: useTransform(gradientX, (x) => -x * 0.5),
            y: gradientY,
            rotate: rotate,
          }}
        />

        {/* Geometric shapes that morph */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-green-500/20"
          style={{
            borderRadius: useTransform(
              scrollY,
              [0, windowHeight, windowHeight * 2],
              ['10%', '50%', '10%']
            ),
            rotate: rotate,
            scale: useTransform(scrollY, [0, windowHeight], [1, 0.8]),
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 border-2 border-lime-500/20"
          style={{
            borderRadius: useTransform(
              scrollY,
              [0, windowHeight, windowHeight * 2],
              ['50%', '10%', '50%']
            ),
            rotate: useTransform(rotate, (r) => -r),
            scale: useTransform(scrollY, [0, windowHeight], [0.8, 1.2]),
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 ? 15 : -15), 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Wave effect at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-32 text-green-500/10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="currentColor"
            d={useTransform(
              scrollY,
              [0, windowHeight],
              [
                'M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
                'M0,64L48,85.3C96,107,192,149,288,154.7C384,160,480,128,576,122.7C672,117,768,139,864,128C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
              ]
            )}
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

// Section-specific animated background
export const SectionScrollBackground = ({ variant = 'default' }) => {
  const { scrollY } = useScroll();
  const [isInView, setIsInView] = useState(false);

  const variants = {
    default: {
      colors: ['rgba(34, 197, 94, 0.15)', 'rgba(132, 204, 22, 0.15)', 'rgba(163, 230, 53, 0.15)'],
    },
    investor: {
      colors: ['rgba(59, 130, 246, 0.15)', 'rgba(139, 92, 246, 0.15)', 'rgba(6, 182, 212, 0.15)'],
    },
    news: {
      colors: ['rgba(251, 146, 60, 0.15)', 'rgba(250, 204, 21, 0.15)', 'rgba(254, 240, 138, 0.15)'],
    },
    csr: {
      colors: ['rgba(236, 72, 153, 0.15)', 'rgba(232, 121, 249, 0.15)', 'rgba(167, 139, 250, 0.15)'],
    }
  };

  const config = variants[variant] || variants.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Morphing gradient mesh */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
          </filter>
        </defs>
        
        {config.colors.map((color, i) => (
          <motion.circle
            key={i}
            r="100"
            fill={color}
            filter="url(#goo)"
            initial={{ cx: `${20 + i * 30}%`, cy: `${30 + i * 20}%` }}
            animate={{
              cx: [`${20 + i * 30}%`, `${50 + i * 20}%`, `${20 + i * 30}%`],
              cy: [`${30 + i * 20}%`, `${60 + i * 15}%`, `${30 + i * 20}%`],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};