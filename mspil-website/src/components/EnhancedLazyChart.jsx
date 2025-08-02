import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Enhanced multi-series chart component without heavy dependencies
const EnhancedSimpleChart = ({ data, dataKeys = [], colors = [], names = [], type = 'line', stacked = false }) => {
  if (!data || data.length === 0 || dataKeys.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600">
        <div className="text-center text-gray-500 dark:text-gray-400">
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
  const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding
  const minValue = 0; // Always start from 0 for better visualization
  const range = maxValue - minValue || 1;

  const defaultColors = ['#059669', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  const chartHeight = 280; // Fixed height for chart area

  // Format value for display
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 px-2">
        {dataKeys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full shadow-sm" 
              style={{ backgroundColor: colors[index] || defaultColors[index % defaultColors.length] }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{names[index] || key}</span>
          </div>
        ))}
      </div>
      
      <div className="relative flex-1" style={{ minHeight: `${chartHeight}px` }}>
        {/* Chart area */}
        <div className="absolute inset-0 flex items-end justify-between px-8 pb-8 pt-4">
          {/* Y-axis lines */}
          <div className="absolute inset-0 px-8 pb-8 pt-4">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <div
                key={ratio}
                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                style={{ bottom: `${ratio * 100}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          {data.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="relative flex flex-col items-center flex-1 z-10"
              style={{ maxWidth: `${90 / data.length}%` }}
            >
              <div className="relative w-full h-full flex items-end justify-center">
                {stacked ? (
                  // Stacked bars
                  <div className="relative w-3/4 flex flex-col items-stretch">
                    {dataKeys.map((key, keyIndex) => {
                      const value = item[key] || 0;
                      const height = (value / 100) * 100; // For percentage data
                      const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
                      
                      return (
                        <div
                          key={key}
                          className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                          style={{ 
                            height: `${height}%`,
                            backgroundColor: color,
                          }}
                          title={`${item.year || item.period} - ${names[keyIndex] || key}: ${value}%`}
                        />
                      );
                    })}
                  </div>
                ) : (
                  // Grouped bars
                  <div className="flex items-end justify-center gap-1 w-full px-1">
                    {dataKeys.map((key, keyIndex) => {
                      const value = item[key] || 0;
                      const height = ((value - minValue) / range) * 100;
                      const color = colors[keyIndex] || defaultColors[keyIndex % defaultColors.length];
                      
                      return (
                        <div
                          key={key}
                          className="rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer flex-1 relative group"
                          style={{ 
                            height: `${Math.max(height, 2)}%`,
                            backgroundColor: color,
                            maxWidth: `${100 / dataKeys.length}%`
                          }}
                          title={`${item.year || item.period} - ${names[keyIndex] || key}: ${value}`}
                        >
                          {/* Value label on hover */}
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                            {formatValue(value)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {item.year || item.period}
              </div>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
          {stacked ? (
            <>
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </>
          ) : (
            <>
              <span>{formatValue(maxValue)}</span>
              <span>{formatValue(maxValue * 0.75)}</span>
              <span>{formatValue(maxValue * 0.5)}</span>
              <span>{formatValue(maxValue * 0.25)}</span>
              <span>0</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const EnhancedLineChartLazy = (props) => <EnhancedSimpleChart {...props} type="line" />;
export const EnhancedBarChartLazy = (props) => <EnhancedSimpleChart {...props} type="bar" />;