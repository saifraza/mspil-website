import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Simple data visualization component with glassmorphism design
const SimpleChart = ({ data, dataKey, name, type = 'line', fill = '#22c55e', stroke = '#22c55e' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20">
        <div className="text-center text-gray-400">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item[dataKey] || 0));
  const minValue = Math.min(...data.map(item => item[dataKey] || 0));
  const range = maxValue - minValue || 1;

  return (
    <div className="w-full h-[300px] p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <TrendingUp className="h-5 w-5 text-green-400" />
      </div>
      
      <div className="relative h-[220px]">
        {/* Chart area with glass effect */}
        <div className="relative h-[200px] bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          {/* Grid lines for better visualization */}
          <div className="absolute inset-4 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-px bg-white/5" />
            ))}
          </div>
          
          {/* Bar container */}
          <div className="absolute inset-4 flex items-end justify-between">
            {data.map((item, index) => {
              const value = item[dataKey] || 0;
              const height = ((value - minValue) / range) * 100;
              const barHeight = Math.max(height, 2);
              
              return (
                <div
                  key={index}
                  className="flex-1 px-1 h-full flex items-end group"
                >
                  <div className="relative w-full">
                    {/* Bar with gradient and glass effect */}
                    <div
                      className="w-full rounded-t-md transition-all duration-300 relative overflow-hidden cursor-pointer"
                      style={{ 
                        height: `${barHeight}%`,
                        background: `linear-gradient(180deg, ${fill}dd 0%, ${fill}99 100%)`,
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                      title={`${item.year}: ${value}`}
                    >
                      {/* Glowing effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Value label on hover */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/20">
                        {value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
              {item.year}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Line chart with glassmorphism
const LineChart = ({ data, dataKey, name, stroke = '#22c55e' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20">
        <div className="text-center text-gray-400">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item[dataKey] || 0));
  const minValue = Math.min(...data.map(item => item[dataKey] || 0));
  const range = maxValue - minValue || 1;
  
  // Calculate points for the line
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item[dataKey] - minValue) / range) * 100;
    return { x, y, value: item[dataKey], year: item.year };
  });
  
  // Create SVG path
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  // Create area path
  const areaPath = `${pathData} L 100 100 L 0 100 Z`;

  return (
    <div className="w-full h-[300px] p-4 bg-gray-800/50 backdrop-blur-md rounded-lg border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <TrendingUp className="h-5 w-5 text-green-400" />
      </div>
      
      <div className="relative h-[220px]">
        {/* Chart area with glass effect */}
        <div className="relative h-[200px] bg-gray-900/30 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          {/* Grid lines */}
          <div className="absolute inset-4 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-px bg-white/5" />
            ))}
          </div>
          
          {/* SVG for line chart */}
          <svg className="absolute inset-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Area fill with gradient */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
                <stop offset="100%" stopColor={stroke} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Area */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
              className="transition-all duration-300"
            />
            
            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              className="transition-all duration-300 filter drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 8px ${stroke}66)`
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
                  fill={stroke}
                  fillOpacity="0.2"
                  className="transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
                {/* Inner circle */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={stroke}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
                {/* Tooltip */}
                <foreignObject x={point.x - 30} y={point.y - 40} width="60" height="30" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs text-white text-center border border-white/20">
                    {point.value}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
          
          {/* Y-axis labels */}
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
              {item.year}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LineChartLazy = (props) => <LineChart {...props} />;
export const BarChartLazy = (props) => <SimpleChart {...props} type="bar" />;