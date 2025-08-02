import React from 'react';
import { motion } from 'framer-motion';

const ManufacturingProcessBackground = () => {
  // Animation variants for different elements
  const conveyorVariants = {
    animate: {
      x: [-100, 100],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const steamVariants = {
    animate: {
      y: [0, -50],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pipeFlowVariants = {
    animate: {
      pathLength: [0, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        className="absolute inset-0"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background Factory Outline */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Main Factory Building */}
          <rect
            x="100"
            y="400"
            width="800"
            height="300"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="10,5"
          />
          
          {/* Chimney Stacks */}
          <rect x="200" y="300" width="30" height="100" fill="none" stroke="#22c55e" strokeWidth="2" />
          <rect x="300" y="280" width="30" height="120" fill="none" stroke="#22c55e" strokeWidth="2" />
          <rect x="400" y="320" width="30" height="80" fill="none" stroke="#22c55e" strokeWidth="2" />
          
          {/* Storage Silos */}
          <circle cx="1200" cy="500" r="60" fill="none" stroke="#84cc16" strokeWidth="2" />
          <circle cx="1320" cy="500" r="60" fill="none" stroke="#84cc16" strokeWidth="2" />
          <circle cx="1440" cy="500" r="60" fill="none" stroke="#84cc16" strokeWidth="2" />
          
          {/* Processing Units */}
          <rect x="600" y="450" width="150" height="100" fill="none" stroke="#a3e635" strokeWidth="2" />
          <rect x="780" y="450" width="150" height="100" fill="none" stroke="#a3e635" strokeWidth="2" />
        </motion.g>

        {/* Conveyor Belt System */}
        <motion.g>
          {/* Main Conveyor Line */}
          <line
            x1="50"
            y1="600"
            x2="1000"
            y2="600"
            stroke="#22c55e"
            strokeWidth="4"
            strokeDasharray="20,10"
          />
          
          {/* Conveyor Items */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={`conveyor-${i}`}
              cx={150 + i * 150}
              cy="600"
              r="8"
              fill="#84cc16"
              variants={conveyorVariants}
              animate="animate"
              style={{ originX: 0.5, originY: 0.5 }}
              transition={{ delay: i * 0.5 }}
            />
          ))}
          
          {/* Secondary Conveyor */}
          <line
            x1="1000"
            y1="600"
            x2="1500"
            y2="500"
            stroke="#84cc16"
            strokeWidth="3"
            strokeDasharray="15,8"
          />
        </motion.g>

        {/* Pipe Network System */}
        <motion.g>
          {/* Main Processing Pipes */}
          <motion.path
            d="M 600 400 Q 800 350 1000 400 T 1400 450"
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeDasharray="100"
            variants={pipeFlowVariants}
            animate="animate"
          />
          
          <motion.path
            d="M 650 500 Q 850 450 1050 500 T 1450 550"
            fill="none"
            stroke="#84cc16"
            strokeWidth="4"
            strokeDasharray="80"
            variants={pipeFlowVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          
          {/* Vertical Pipes */}
          <line x1="700" y1="300" x2="700" y2="500" stroke="#a3e635" strokeWidth="3" />
          <line x1="850" y1="320" x2="850" y2="520" stroke="#a3e635" strokeWidth="3" />
          
          {/* Pipe Joints */}
          <circle cx="700" cy="400" r="8" fill="#22c55e" />
          <circle cx="850" cy="420" r="8" fill="#84cc16" />
          <circle cx="1000" cy="400" r="8" fill="#a3e635" />
        </motion.g>

        {/* Steam and Vapor Effects */}
        <motion.g>
          {/* Steam from Chimneys */}
          {[...Array(3)].map((_, i) => (
            <motion.g key={`steam-${i}`}>
              <motion.ellipse
                cx={215 + i * 100}
                cy={280 - i * 20}
                rx="15"
                ry="25"
                fill="#22c55e"
                opacity="0.3"
                variants={steamVariants}
                animate="animate"
                transition={{ delay: i * 0.5 }}
              />
              <motion.ellipse
                cx={220 + i * 100}
                cy={260 - i * 20}
                rx="20"
                ry="30"
                fill="#84cc16"
                opacity="0.2"
                variants={steamVariants}
                animate="animate"
                transition={{ delay: i * 0.5 + 0.3 }}
              />
            </motion.g>
          ))}
          
          {/* Processing Steam */}
          <motion.ellipse
            cx="675"
            cy="430"
            rx="30"
            ry="40"
            fill="#a3e635"
            opacity="0.4"
            variants={steamVariants}
            animate="animate"
          />
          
          <motion.ellipse
            cx="855"
            cy="430"
            rx="25"
            ry="35"
            fill="#22c55e"
            opacity="0.3"
            variants={steamVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
        </motion.g>

        {/* Mechanical Gears */}
        <motion.g>
          {/* Large Processing Gear */}
          <motion.g
            variants={gearVariants}
            animate="animate"
            style={{ originX: 675, originY: 475 }}
          >
            <circle cx="675" cy="475" r="25" fill="none" stroke="#22c55e" strokeWidth="3" />
            {[...Array(8)].map((_, i) => (
              <line
                key={`gear-tooth-${i}`}
                x1={675 + 22 * Math.cos(i * Math.PI / 4)}
                y1={475 + 22 * Math.sin(i * Math.PI / 4)}
                x2={675 + 28 * Math.cos(i * Math.PI / 4)}
                y2={475 + 28 * Math.sin(i * Math.PI / 4)}
                stroke="#22c55e"
                strokeWidth="3"
              />
            ))}
          </motion.g>
          
          {/* Medium Gear */}
          <motion.g
            variants={gearVariants}
            animate="animate"
            style={{ originX: 855, originY: 475 }}
            transition={{ direction: "reverse" }}
          >
            <circle cx="855" cy="475" r="20" fill="none" stroke="#84cc16" strokeWidth="2" />
            {[...Array(6)].map((_, i) => (
              <line
                key={`gear-tooth-med-${i}`}
                x1={855 + 18 * Math.cos(i * Math.PI / 3)}
                y1={475 + 18 * Math.sin(i * Math.PI / 3)}
                x2={855 + 23 * Math.cos(i * Math.PI / 3)}
                y2={475 + 23 * Math.sin(i * Math.PI / 3)}
                stroke="#84cc16"
                strokeWidth="2"
              />
            ))}
          </motion.g>
          
          {/* Small Gears */}
          <motion.g
            variants={gearVariants}
            animate="animate"
            style={{ originX: 750, originY: 525 }}
          >
            <circle cx="750" cy="525" r="15" fill="none" stroke="#a3e635" strokeWidth="2" />
            {[...Array(4)].map((_, i) => (
              <line
                key={`gear-tooth-small-${i}`}
                x1={750 + 13 * Math.cos(i * Math.PI / 2)}
                y1={525 + 13 * Math.sin(i * Math.PI / 2)}
                x2={750 + 18 * Math.cos(i * Math.PI / 2)}
                y2={525 + 18 * Math.sin(i * Math.PI / 2)}
                stroke="#a3e635"
                strokeWidth="2"
              />
            ))}
          </motion.g>
        </motion.g>

        {/* Quality Control Checkpoints */}
        <motion.g>
          {/* Checkpoint Stations */}
          <motion.rect
            x="480"
            y="580"
            width="40"
            height="40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            variants={pulseVariants}
            animate="animate"
          />
          
          <motion.rect
            x="720"
            y="580"
            width="40"
            height="40"
            fill="none"
            stroke="#84cc16"
            strokeWidth="2"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
          />
          
          <motion.rect
            x="960"
            y="580"
            width="40"
            height="40"
            fill="none"
            stroke="#a3e635"
            strokeWidth="2"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          
          {/* Checkpoint Indicators */}
          <motion.circle
            cx="500"
            cy="600"
            r="5"
            fill="#22c55e"
            variants={pulseVariants}
            animate="animate"
          />
          
          <motion.circle
            cx="740"
            cy="600"
            r="5"
            fill="#84cc16"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
          />
          
          <motion.circle
            cx="980"
            cy="600"
            r="5"
            fill="#a3e635"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
        </motion.g>

        {/* Processing Flow Arrows */}
        <motion.g>
          {/* Main Flow Direction */}
          <motion.path
            d="M 400 620 L 440 620 L 430 610 M 440 620 L 430 630"
            stroke="#22c55e"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          <motion.path
            d="M 640 620 L 680 620 L 670 610 M 680 620 L 670 630"
            stroke="#84cc16"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
          />
          
          <motion.path
            d="M 880 620 L 920 620 L 910 610 M 920 620 L 910 630"
            stroke="#a3e635"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
          />
        </motion.g>

        {/* Sugar Crystals Animation */}
        <motion.g>
          {[...Array(15)].map((_, i) => (
            <motion.polygon
              key={`crystal-${i}`}
              points={`${300 + i * 80},${650 + Math.sin(i) * 20} ${305 + i * 80},${645 + Math.sin(i) * 20} ${310 + i * 80},${650 + Math.sin(i) * 20} ${305 + i * 80},${655 + Math.sin(i) * 20}`}
              fill="#84cc16"
              opacity="0.6"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>

        {/* Ethanol Molecules */}
        <motion.g>
          {[...Array(8)].map((_, i) => (
            <motion.circle
              key={`molecule-${i}`}
              cx={1100 + i * 40}
              cy={480 + Math.sin(i * 0.5) * 30}
              r="4"
              fill="#22c55e"
              opacity="0.7"
              animate={{
                x: [0, 20, 0],
                y: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default ManufacturingProcessBackground;