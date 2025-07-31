import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load the charts to reduce initial bundle size
const LazyLineChart = lazy(async () => {
  const recharts = await import('recharts');
  return { 
    default: ({ data, dataKey, stroke, name }) => (
      <recharts.ResponsiveContainer width="100%" height={300}>
        <recharts.LineChart data={data}>
          <recharts.CartesianGrid strokeDasharray="3 3" />
          <recharts.XAxis dataKey="year" />
          <recharts.YAxis />
          <recharts.Tooltip />
          <recharts.Legend />
          <recharts.Line type="monotone" dataKey={dataKey} stroke={stroke} name={name} strokeWidth={3} />
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
          <recharts.CartesianGrid strokeDasharray="3 3" />
          <recharts.XAxis dataKey="year" />
          <recharts.YAxis />
          <recharts.Tooltip />
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