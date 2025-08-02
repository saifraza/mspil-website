import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

// Simple data visualization component without heavy dependencies
const SimpleChart = ({ data, dataKey, name, type = 'line', fill = '#22c55e', stroke = '#22c55e' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center text-gray-500">
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
    <div className="w-full h-[300px] p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>
      
      <div className="relative h-full">
        {/* Simple bar chart visualization */}
        <div className="flex items-end justify-between h-5/6 border-b border-l border-gray-300">
          {data.map((item, index) => {
            const height = ((item[dataKey] - minValue) / range) * 100;
            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 group"
                style={{ maxWidth: `${100 / data.length}%` }}
              >
                <div className="relative w-full px-1">
                  <div
                    className="bg-green-500 rounded-t-md transition-all duration-300 hover:bg-green-600 cursor-pointer"
                    style={{ 
                      height: `${Math.max(height, 5)}%`,
                      backgroundColor: fill
                    }}
                    title={`${item.year}: ${item[dataKey]}`}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center">
                  {item.year}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-5/6 flex flex-col justify-between text-xs text-gray-500 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{minValue}</span>
        </div>
      </div>
    </div>
  );
};

export const LineChartLazy = (props) => <SimpleChart {...props} type="line" />;
export const BarChartLazy = (props) => <SimpleChart {...props} type="bar" />;