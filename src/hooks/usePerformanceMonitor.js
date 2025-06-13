import { useEffect } from 'react';

export function usePerformanceMonitor(componentName) {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 100) {
        console.warn(`[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  }, [componentName]);
}