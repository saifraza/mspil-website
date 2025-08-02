import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const DataAnalyticsBackground = () => {
  // Generate random data points for charts
  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      value: Math.random() * 100 + 20,
      x: (i * 80) + 100,
      delay: i * 0.2
    }));
  }, []);

  // Generate floating metrics
  const metrics = useMemo(() => [
    { label: 'Sugar Production', value: '8000 TCD', unit: 'TCD' },
    { label: 'Ethanol Output', value: '350 KLPD', unit: 'KLPD' },
    { label: 'Power Generation', value: '24 MW', unit: 'MW' },
    { label: 'Revenue Growth', value: '+15.2%', unit: '%' },
    { label: 'Efficiency', value: '94.8%', unit: '%' },
    { label: 'Capacity Utilization', value: '87.5%', unit: '%' }
  ], []);

  // Generate binary code streams
  const binaryStreams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: (i * 180) + 50,
      delay: i * 0.8,
      code: Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('')
    }));
  }, []);

  // Generate network nodes for connections
  const networkNodes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 1200 + 100,
      y: Math.random() * 600 + 100,
      delay: i * 0.3
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="grid-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Animated Bar Charts */}
      <div className="absolute top-20 left-20">
        <svg width="300" height="200" className="opacity-20">
          {chartData.slice(0, 8).map((bar) => (
            <motion.rect
              key={bar.id}
              x={bar.id * 35}
              y={200 - bar.value * 1.5}
              width="25"
              height={bar.value * 1.5}
              fill="#22c55e"
              initial={{ height: 0, y: 200 }}
              animate={{ 
                height: [0, bar.value * 1.5, bar.value * 1.2, bar.value * 1.5],
                y: [200, 200 - bar.value * 1.5, 200 - bar.value * 1.2, 200 - bar.value * 1.5]
              }}
              transition={{
                duration: 2,
                delay: bar.delay,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>

      {/* Animated Line Chart */}
      <div className="absolute top-40 right-20">
        <svg width="350" height="150" className="opacity-25">
          <motion.path
            d={`M 0 75 ${chartData.map(point => `L ${point.x / 4} ${150 - point.value}`).join(' ')}`}
            fill="none"
            stroke="#84cc16"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0.8, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
          {chartData.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x / 4}
              cy={150 - point.value}
              r="4"
              fill="#a3e635"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8, 1]
              }}
              transition={{
                duration: 0.5,
                delay: point.delay + 1,
                repeat: Infinity,
                repeatDelay: 5
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Metrics */}
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="absolute bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 min-w-[140px]"
          style={{
            left: `${10 + (index * 15) % 80}%`,
            top: `${20 + (index * 12) % 60}%`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 0.8, 0.6, 0.8],
            y: [20, 0, -5, 0],
            x: [0, 10, -5, 0]
          }}
          transition={{
            duration: 6,
            delay: index * 0.8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        >
          <div className="text-green-400 text-xs font-medium">{metric.label}</div>
          <div className="text-green-300 text-lg font-bold">{metric.value}</div>
        </motion.div>
      ))}

      {/* Binary Code Streams */}
      {binaryStreams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute text-green-500/30 font-mono text-xs whitespace-nowrap"
          style={{ left: stream.x, top: -20 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: [0, 0.6, 0.3, 0]
          }}
          transition={{
            duration: 8,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {stream.code}
        </motion.div>
      ))}

      {/* Network Connections */}
      <svg className="absolute inset-0 opacity-15" width="100%" height="100%">
        {networkNodes.map((node, index) => (
          <g key={node.id}>
            {/* Connection lines to nearby nodes */}
            {networkNodes
              .filter((otherNode, otherIndex) => {
                if (otherIndex <= index) return false;
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
                );
                return distance < 200;
              })
              .map((connectedNode, lineIndex) => (
                <motion.line
                  key={`${node.id}-${connectedNode.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  stroke="#22c55e"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0.7, 1],
                    opacity: [0, 0.4, 0.2, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    delay: node.delay + lineIndex * 0.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            
            {/* Network nodes */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="#84cc16"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.3, 1],
                opacity: [0, 0.8, 0.5, 0.8]
              }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "easeOut"
              }}
            />
          </g>
        ))}
      </svg>

      {/* Dashboard Grid Overlay */}
      <div className="absolute bottom-20 left-20 opacity-20">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="w-16 h-12 border border-green-500/40 rounded bg-green-500/5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.6, 0.3, 0.6],
                scale: [0.8, 1, 0.95, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-2 bg-green-400/60 rounded-t mt-1"></div>
              <div className="w-3/4 h-1 bg-green-300/40 rounded mt-1 ml-1"></div>
              <div className="w-1/2 h-1 bg-green-300/40 rounded mt-1 ml-1"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hexadecimal Code Streams */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute text-green-400/25 font-mono text-sm"
          style={{ 
            right: 50 + (i * 120), 
            top: -30,
            transform: 'rotate(-15deg)'
          }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 50,
            opacity: [0, 0.5, 0.2, 0]
          }}
          transition={{
            duration: 12,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }, (_, j) => (
            <div key={j} className="mb-2">
              0x{Math.random().toString(16).substr(2, 6).toUpperCase()}
            </div>
          ))}
        </motion.div>
      ))}

      {/* Pulse Circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute border border-green-500/20 rounded-full"
            style={{
              width: 100 + ring * 80,
              height: 100 + ring * 80,
              left: -(50 + ring * 40),
              top: -(50 + ring * 40),
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 4,
              delay: ring * 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Data Flow Indicators */}
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={`flow-${i}`}
            className="absolute w-3 h-3 bg-green-400 rounded-full"
            style={{ left: i * 40 }}
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -30, -60, -30, 0],
              opacity: [0.8, 1, 0.6, 1, 0.8],
              scale: [1, 1.2, 0.8, 1.2, 1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DataAnalyticsBackground;