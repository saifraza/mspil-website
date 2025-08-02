import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Simple multi-series chart component without heavy dependencies
const EnhancedSimpleChart = ({ data, dataKeys = [], colors = [], names = [], type = 'line', stacked = false }) => {
  if (!data || data.length === 0 || dataKeys.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center text-gray-500">
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
    <div className="w-full h-[300px] p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Multi-Series Data</h3>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {dataKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[index] || defaultColors[index % defaultColors.length] }}
            />
            <span className="text-sm text-gray-600">{names[index] || key}</span>
          </div>
        ))}
      </div>
      
      <div className="relative h-full">
        {/* Simple grouped bar chart visualization */}
        <div className="flex items-end justify-between h-4/5 border-b border-l border-gray-300">
          {data.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="flex flex-col items-center flex-1"
              style={{ maxWidth: `${100 / data.length}%` }}
            >
              <div className="flex items-end justify-center w-full px-1 gap-1">
                {dataKeys.map((key, keyIndex) => {
                  const value = item[key] || 0;
                  const height = ((value - minValue) / range) * 100;
                  const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
                  
                  return (
                    <div
                      key={key}
                      className="rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer flex-1"
                      style={{ 
                        height: `${Math.max(height, 5)}%`,
                        backgroundColor: color,
                        minWidth: '8px'
                      }}
                      title={`${item.year || item.period} - ${names[keyIndex] || key}: ${value}`}
                    />
                  );
                })}
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {item.year || item.period}
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-4/5 flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
      </div>
    </div>
  );
};

export const EnhancedLineChartLazy = (props) => <EnhancedSimpleChart {...props} type="line" />;
export const EnhancedBarChartLazy = (props) => <EnhancedSimpleChart {...props} type="bar" />;