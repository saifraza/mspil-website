import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, valueLabel = 'Value' }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-lg mb-2">{label}</p>
        <p className="text-primary font-bold text-xl">
          {valueLabel}: {payload[0].value}
        </p>
        {data.note && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
            {data.note}
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Lazy load the charts to reduce initial bundle size
const LazyLineChart = lazy(async () => {
  const recharts = await import('recharts');
  return { 
    default: ({ data, dataKey, stroke, name }) => (
      <recharts.ResponsiveContainer width="100%" height={300}>
        <recharts.LineChart data={data}>
          <recharts.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <recharts.XAxis dataKey="year" stroke="#6b7280" />
          <recharts.YAxis stroke="#6b7280" />
          <recharts.Tooltip 
            content={<CustomTooltip valueLabel={name} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <recharts.Legend />
          <recharts.Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={stroke} 
            name={name} 
            strokeWidth={3}
            dot={{ fill: stroke, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7 }}
            connectNulls={true}
          />
        </recharts.LineChart>
      </recharts.ResponsiveContainer>
    )
  };
});

const LazyBarChart = lazy(async () => {
  const recharts = await import('recharts');
  return { 
    default: ({ data, dataKey, fill, name }) => (
      <recharts.ResponsiveContainer width="100%" height={300}>
        <recharts.BarChart data={data}>
          <recharts.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <recharts.XAxis dataKey="year" stroke="#6b7280" />
          <recharts.YAxis stroke="#6b7280" />
          <recharts.Tooltip 
            content={<CustomTooltip valueLabel={name} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <recharts.Legend />
          <recharts.Bar dataKey={dataKey} fill={fill} name={name} />
        </recharts.BarChart>
      </recharts.ResponsiveContainer>
    )
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

export const LineChartLazy = (props) => (
  <Suspense fallback={<ChartLoader />}>
    <LazyLineChart {...props} />
  </Suspense>
);

export const BarChartLazy = (props) => (
  <Suspense fallback={<ChartLoader />}>
    <LazyBarChart {...props} />
  </Suspense>
);