import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import '@/styles/mobile-fixes.css';
import '@/utils/lightweightAnimations.css';
import { initPerformanceOptimizations } from '@/utils/performanceOptimizations';
import { initCommonAnimations } from '@/utils/lightweightScrollAnimations';

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Initialize lightweight scroll animations
window.addEventListener('DOMContentLoaded', () => {
  initCommonAnimations();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);