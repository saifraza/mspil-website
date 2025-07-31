import { useEffect } from 'react';

// Hook to monitor Core Web Vitals
export const useWebVitals = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    const reportWebVital = ({ name, value, id }) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vital: ${name}`, value);
      }

      // Send to analytics in production
      if (window.gtag) {
        window.gtag('event', name, {
          value: Math.round(name === 'CLS' ? value * 1000 : value),
          metric_id: id,
          metric_value: value,
          metric_delta: value,
        });
      }
    };

    // Dynamically import web-vitals to reduce bundle size
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportWebVital);
      onFID(reportWebVital);
      onFCP(reportWebVital);
      onLCP(reportWebVital);
      onTTFB(reportWebVital);
    });
  }, []);
};

// Performance marks for custom metrics
export const markPerformance = (markName) => {
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(markName);
  }
};

// Measure performance between marks
export const measurePerformance = (measureName, startMark, endMark) => {
  if ('performance' in window && 'measure' in window.performance) {
    try {
      window.performance.measure(measureName, startMark, endMark);
      const measure = window.performance.getEntriesByName(measureName)[0];
      
      if (measure && process.env.NODE_ENV === 'development') {
        console.log(`Performance: ${measureName}`, `${measure.duration.toFixed(2)}ms`);
      }
      
      return measure?.duration;
    } catch (error) {
      console.error('Performance measurement error:', error);
    }
  }
  return null;
};