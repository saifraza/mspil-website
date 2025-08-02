// Performance optimization utilities

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Only preload in production mode where CSS files are built
  const isProduction = import.meta.env.PROD;
  
  if (isProduction) {
    // Try to find the actual CSS file in production
    const existingCSSLink = document.querySelector('link[rel="stylesheet"]');
    if (existingCSSLink && existingCSSLink.href) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = existingCSSLink.href;
      document.head.appendChild(link);
    }
  }
  
  // Preload fonts (only if not already loaded)
  const fontLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];
  
  fontLinks.forEach(font => {
    if (!document.querySelector(`link[href="${font}"]`)) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'style';
      fontLink.href = font;
      document.head.appendChild(fontLink);
    }
  });
};

// Optimize video loading for better performance
export const optimizeVideoLoading = () => {
  const videos = document.querySelectorAll('video[data-src]');
  
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          
          // Only load video on larger screens or when user interacts
          if (window.innerWidth > 768) {
            video.src = video.dataset.src;
            video.load();
          }
          
          videoObserver.unobserve(video);
        }
      });
    }, {
      rootMargin: '200px' // Load when video is 200px away from viewport
    });

    videos.forEach(video => {
      videoObserver.observe(video);
    });
  }
};

// Defer non-critical JavaScript
export const deferNonCriticalJS = () => {
  const scripts = [
    '/js/analytics.js',
    '/js/social-widgets.js'
  ];
  
  // Load after page is fully loaded
  window.addEventListener('load', () => {
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    });
  });
};

// Reduce motion for performance on mobile
export const checkReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  
  if (prefersReducedMotion || isMobile) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.documentElement.style.setProperty('--transition-duration', '0.1s');
  }
};

// Network-aware loading
export const adaptToNetworkCondition = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    
    // Reduce quality on slow connections
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.documentElement.classList.add('low-bandwidth');
      
      // Disable videos on slow connections
      document.querySelectorAll('video').forEach(video => {
        video.style.display = 'none';
      });
      
      // Show poster images instead
      document.querySelectorAll('video[poster]').forEach(video => {
        const img = document.createElement('img');
        img.src = video.poster;
        img.alt = video.getAttribute('aria-label') || 'Video thumbnail';
        img.className = video.className;
        video.parentNode.replaceChild(img, video);
      });
    }
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run immediately
  checkReducedMotion();
  adaptToNetworkCondition();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      optimizeVideoLoading();
      preloadCriticalResources();
    });
  } else {
    lazyLoadImages();
    optimizeVideoLoading();
    preloadCriticalResources();
  }
  
  // Run after page load
  window.addEventListener('load', () => {
    deferNonCriticalJS();
  });
};