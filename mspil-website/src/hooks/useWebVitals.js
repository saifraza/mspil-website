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

    // Native performance monitoring without external dependencies
    if ('PerformanceObserver' in window) {
      // Observe Layout Shift (CLS)
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            reportWebVital({
              name: 'CLS',
              value: entry.value,
              id: `${Date.now()}-${Math.random()}`
            });
          }
        });
      }).observe({ type: 'layout-shift', buffered: true });

      // Observe Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportWebVital({
          name: 'LCP',
          value: lastEntry.startTime,
          id: `${Date.now()}-${Math.random()}`
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    }
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