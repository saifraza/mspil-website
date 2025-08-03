import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Enhanced multi-series chart component with glassmorphism design
const EnhancedSimpleChart = ({ data, dataKeys = [], colors = [], names = [], type = 'line', stacked = false }) => {
  if (!data || data.length === 0 || dataKeys.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20">
        <div className="text-center text-gray-400">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  // Calculate max value across all series
  const allValues = data.flatMap(item => 
    dataKeys.map(key => item[key] || 0)
  );
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;

  const defaultColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="w-full h-[300px] p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Multi-Series Data</h3>
        <TrendingUp className="h-5 w-5 text-green-400" />
      </div>
      
      {/* Legend with glass effect */}
      <div className="flex flex-wrap gap-4 mb-4">
        {dataKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2 bg-gray-900/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <div 
              className="w-3 h-3 rounded-full shadow-lg" 
              style={{ 
                backgroundColor: colors[index] || defaultColors[index % defaultColors.length],
                boxShadow: `0 0 8px ${colors[index] || defaultColors[index % defaultColors.length]}66`
              }}
            />
            <span className="text-sm text-gray-300">{names[index] || key}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-[200px]">
        {/* Chart area with glass effect */}
        <div className="relative h-full bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          {/* Grid lines */}
          <div className="absolute inset-4 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-px bg-white/5" />
            ))}
          </div>
          
          {/* Bar container */}
          <div className="absolute inset-4 flex items-end justify-between">
            {data.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex-1 flex items-end justify-center px-1 gap-1 h-full"
              >
                <div className="flex items-end justify-center w-full gap-0.5">
                  {dataKeys.map((key, keyIndex) => {
                    const value = item[key] || 0;
                    const height = ((value - minValue) / range) * 100;
                    const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
                    
                    return (
                      <div
                        key={key}
                        className="flex-1 group relative"
                        style={{ minWidth: '8px' }}
                      >
                        <div
                          className="w-full rounded-t-md transition-all duration-300 relative overflow-hidden cursor-pointer"
                          style={{ 
                            height: `${Math.max(height, 5)}%`,
                            background: `linear-gradient(180deg, ${color}dd 0%, ${color}99 100%)`,
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 8px ${color}33`
                          }}
                          title={`${item.year || item.period} - ${names[keyIndex] || key}: ${value}`}
                        >
                          {/* Glowing effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Value label on hover */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/20 z-10">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Y-axis labels with glass background */}
          <div className="absolute -left-12 top-4 h-[calc(100%-32px)] flex flex-col justify-between text-xs text-gray-400">
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{maxValue}</span>
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{Math.round((maxValue + minValue) / 2)}</span>
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{minValue}</span>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-3 px-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center text-xs text-gray-400">
              {item.year || item.period}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Line Chart with glassmorphism
const EnhancedLineChart = ({ data, dataKeys = [], colors = [], names = [] }) => {
  if (!data || data.length === 0 || dataKeys.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20">
        <div className="text-center text-gray-400">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const allValues = data.flatMap(item => 
    dataKeys.map(key => item[key] || 0)
  );
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;

  const defaultColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="w-full h-[300px] p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Multi-Series Trend</h3>
        <TrendingUp className="h-5 w-5 text-green-400" />
      </div>
      
      {/* Legend with glass effect */}
      <div className="flex flex-wrap gap-4 mb-4">
        {dataKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2 bg-gray-900/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <div 
              className="w-3 h-3 rounded-full shadow-lg" 
              style={{ 
                backgroundColor: colors[index] || defaultColors[index % defaultColors.length],
                boxShadow: `0 0 8px ${colors[index] || defaultColors[index % defaultColors.length]}66`
              }}
            />
            <span className="text-sm text-gray-300">{names[index] || key}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-[200px]">
        {/* Chart area with glass effect */}
        <div className="relative h-full bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          {/* Grid lines */}
          <div className="absolute inset-4 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-px bg-white/5" />
            ))}
          </div>
          
          {/* SVG for line charts */}
          <svg className="absolute inset-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {dataKeys.map((key, keyIndex) => {
                const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
                return (
                  <linearGradient key={`gradient-${key}`} id={`gradient-${key}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                  </linearGradient>
                );
              })}
            </defs>
            
            {/* Render lines for each data key */}
            {dataKeys.map((key, keyIndex) => {
              const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
              
              // Calculate points for this line
              const points = data.map((item, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((item[key] - minValue) / range) * 100;
                return { x, y, value: item[key] };
              });
              
              // Create SVG path
              const pathData = points.map((point, index) => 
                `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
              ).join(' ');
              
              // Create area path
              const areaPath = `${pathData} L 100 100 L 0 100 Z`;
              
              return (
                <g key={key}>
                  {/* Area */}
                  <path
                    d={areaPath}
                    fill={`url(#gradient-${key})`}
                    className="transition-all duration-300"
                  />
                  
                  {/* Line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    className="transition-all duration-300"
                    style={{
                      filter: `drop-shadow(0 0 8px ${color}66)`
                    }}
                  />
                  
                  {/* Data points */}
                  {points.map((point, index) => (
                    <g key={index} className="group">
                      {/* Outer glow circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill={color}
                        fillOpacity="0.2"
                        className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                      />
                      {/* Inner circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill={color}
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="1"
                        className="transition-all duration-300"
                      />
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
          
          {/* Y-axis labels with glass background */}
          <div className="absolute -left-12 top-4 h-[calc(100%-32px)] flex flex-col justify-between text-xs text-gray-400">
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{maxValue}</span>
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{Math.round((maxValue + minValue) / 2)}</span>
            <span className="bg-gray-900/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">{minValue}</span>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-3 px-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center text-xs text-gray-400">
              {item.year || item.period}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const EnhancedLineChartLazy = (props) => <EnhancedLineChart {...props} />;
export const EnhancedBarChartLazy = (props) => <EnhancedSimpleChart {...props} type="bar" />;