import { useRef, useCallback } from 'react';

export function useThrottle(callback, delay) {
  const lastRunRef = useRef(Date.now());
  const timeoutRef = useRef(null);

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRunRef.current;

    if (timeSinceLastRun >= delay) {
      callback(...args);
      lastRunRef.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRunRef.current = Date.now();
      }, delay - timeSinceLastRun);
    }
  }, [callback, delay]);

  return throttledCallback;
}