/**
 * Lightweight Scroll Animations
 * Performance-optimized alternative to framer-motion scroll animations
 */

class ScrollAnimationManager {
  constructor() {
    this.observers = new Map();
    this.elements = new Set();
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    // Create intersection observer for scroll animations
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = entry.target;
          const config = this.elements.has(element) 
            ? Array.from(this.elements).find(el => el === element)?.animationConfig 
            : {};
          
          if (entry.isIntersecting) {
            this.triggerAnimation(element, config);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px' // Start animation when element is 50px in viewport
      }
    );

    this.initialized = true;
  }

  // Add element for scroll animation
  addElement(element, config = {}) {
    if (!element) return;

    this.init();

    const defaultConfig = {
      type: 'fadeInUp',
      delay: 0,
      duration: '0.6s',
      easing: 'ease-out',
      once: true
    };

    const animationConfig = { ...defaultConfig, ...config };
    element.animationConfig = animationConfig;

    // Set initial styles
    this.setInitialStyles(element, animationConfig);

    // Observe element
    this.observer.observe(element);
    this.elements.add(element);
  }

  // Set initial styles based on animation type
  setInitialStyles(element, config) {
    const { type, duration, easing } = config;

    // Base transition
    element.style.transition = `opacity ${duration} ${easing}, transform ${duration} ${easing}`;
    
    switch (type) {
      case 'fadeIn':
        element.style.opacity = '0';
        break;
      case 'fadeInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'fadeInLeft':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fadeInRight':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
      case 'scaleIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        break;
      case 'slideInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        break;
      default:
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    }
  }

  // Trigger animation
  triggerAnimation(element, config) {
    const { delay = 0, once = true } = config;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) translateX(0) scale(1)';

      if (once) {
        // Remove observer after first animation
        this.observer.unobserve(element);
        this.elements.delete(element);
      }
    }, delay);
  }

  // Cleanup
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.elements.clear();
    this.initialized = false;
  }
}

// Global instance
const scrollAnimationManager = new ScrollAnimationManager();

// Utility functions for easy use
export const animateOnScroll = (element, config) => {
  scrollAnimationManager.addElement(element, config);
};

// React hook for scroll animations
export const useScrollAnimation = (ref, config = {}) => {
  if (typeof React !== 'undefined' && React.useEffect) {
    React.useEffect(() => {
      if (ref.current) {
        animateOnScroll(ref.current, config);
      }
    }, [ref, config]);
  }
};

// Higher-order component for scroll animations
export const withScrollAnimation = (WrappedComponent, animationConfig = {}) => {
  if (typeof React !== 'undefined' && React.forwardRef) {
    return React.forwardRef((props, ref) => {
      const elementRef = React.useRef(null);
      const combinedRef = ref || elementRef;

      React.useEffect(() => {
        if (combinedRef.current) {
          animateOnScroll(combinedRef.current, animationConfig);
        }
      }, [combinedRef, animationConfig]);

      // Return the component without JSX syntax
      return React.createElement(WrappedComponent, { ref: combinedRef, ...props });
    });
  }
  return WrappedComponent;
};

// Stagger animations for multiple elements
export const staggerElements = (elements, baseConfig = {}, staggerDelay = 100) => {
  elements.forEach((element, index) => {
    if (element) {
      const config = {
        ...baseConfig,
        delay: (baseConfig.delay || 0) + (index * staggerDelay)
      };
      animateOnScroll(element, config);
    }
  });
};

// CSS class-based animations (even lighter)
export const addScrollClass = (element, className = 'scroll-reveal') => {
  if (!element) return;

  element.classList.add(className);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-50px 0px' }
  );

  observer.observe(element);
};

// Batch class-based animations
export const addScrollClassToAll = (selector, className = 'scroll-reveal') => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => addScrollClass(element, className));
};

// Performance-optimized card hover effects
export const addHoverEffects = (element, type = 'lift') => {
  if (!element) return;

  const effectClasses = {
    lift: 'hover-lift',
    scale: 'hover-scale',
    brightness: 'hover-brightness'
  };

  element.classList.add(effectClasses[type] || effectClasses.lift);
};

// Initialize scroll animations for common patterns
export const initCommonAnimations = () => {
  // Auto-detect and animate common elements
  const commonSelectors = [
    '.animate-on-scroll',
    '[data-animate]',
    '.card',
    '.feature-item',
    '.stats-item'
  ];

  commonSelectors.forEach(selector => {
    addScrollClassToAll(selector);
  });
};

// Cleanup function
export const cleanupScrollAnimations = () => {
  scrollAnimationManager.destroy();
};

export default scrollAnimationManager;