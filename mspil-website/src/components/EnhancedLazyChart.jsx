import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Custom tooltip component for multiple series
const MultiSeriesToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-lg mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.name}:</span>
            <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Enhanced Line Chart with multiple series support
const EnhancedLazyLineChart = lazy(async () => {
  const recharts = await import('recharts');
  return { 
    default: ({ data, dataKey, dataKeys, stroke, colors, name, names }) => {
      // Support both single and multiple data keys
      const isMultiple = dataKeys && dataKeys.length > 0;
      const keys = isMultiple ? dataKeys : [dataKey];
      const strokes = isMultiple ? (colors || keys.map(() => stroke || 'hsl(var(--primary))')) : [stroke || 'hsl(var(--primary))'];
      const labels = isMultiple ? (names || keys) : [name || dataKey];
      
      return (
        <recharts.ResponsiveContainer width="100%" height={300}>
          <recharts.LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <recharts.CartesianGrid strokeDasharray="3 3" />
            <recharts.XAxis dataKey="year" />
            <recharts.YAxis />
            <recharts.Tooltip content={<MultiSeriesToolTip />} />
            <recharts.Legend />
            {keys.map((key, index) => (
              <recharts.Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={strokes[index]} 
                name={labels[index]} 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </recharts.LineChart>
        </recharts.ResponsiveContainer>
      );
    }
  };
});

// Enhanced Bar Chart with stacking and multiple series support
const EnhancedLazyBarChart = lazy(async () => {
  const recharts = await import('recharts');
  return { 
    default: ({ data, dataKey, dataKeys, fill, colors, name, names, stacked }) => {
      // Support both single and multiple data keys
      const isMultiple = dataKeys && dataKeys.length > 0;
      const keys = isMultiple ? dataKeys : [dataKey];
      const fills = isMultiple ? (colors || keys.map(() => fill || 'hsl(var(--primary))')) : [fill || 'hsl(var(--primary))'];
      const labels = isMultiple ? (names || keys) : [name || dataKey];
      
      return (
        <recharts.ResponsiveContainer width="100%" height={300}>
          <recharts.BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <recharts.CartesianGrid strokeDasharray="3 3" />
            <recharts.XAxis dataKey="year" />
            <recharts.YAxis />
            <recharts.Tooltip content={<MultiSeriesToolTip />} />
            <recharts.Legend />
            {keys.map((key, index) => (
              <recharts.Bar 
                key={key}
                dataKey={key} 
                fill={fills[index]} 
                name={labels[index]}
                stackId={stacked ? "stack" : undefined}
              />
            ))}
          </recharts.BarChart>
        </recharts.ResponsiveContainer>
      );
    }
  };
});

const ChartLoader = () => (
  <div className="flex items-center justify-center h-[300px]">
    <div className="flex flex-col items-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading chart...</p>
    </div>
  </div>
);

export const EnhancedLineChartLazy = (props) => (
  <Suspense fallback={<ChartLoader />}>
    <EnhancedLazyLineChart {...props} />
  </Suspense>
);

export const EnhancedBarChartLazy = (props) => (
  <Suspense fallback={<ChartLoader />}>
    <EnhancedLazyBarChart {...props} />
  </Suspense>
);