import React, { Suspense } from 'react';

// Chart loading fallback
const ChartLoader = () => (
  <div className="bg-gray-800/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl animate-pulse">
    <div className="h-6 w-48 mb-4 bg-gray-700/50 rounded"></div>
    <div className="w-full bg-gray-700/30 rounded" style={{ height: '250px' }}></div>
  </div>
);

// Wrapper component to handle chart initialization
export const ChartWrapper = ({ children }) => {
  return (
    <Suspense fallback={<ChartLoader />}>
      {children}
    </Suspense>
  );
};

export default ChartWrapper;