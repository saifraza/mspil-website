// Optimized scroll animation configurations for faster loading

export const fastFadeInProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { 
    once: true, 
    amount: 0.1,           // Trigger when only 10% visible (was 0.2)
    margin: "0px 0px -100px 0px"  // Start animation 100px before element enters viewport
  },
  transition: { duration: 0.4 }      // Faster animation (was 0.6)
};

export const fastSlideInProps = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  },
  transition: { duration: 0.4 }
};

export const fastScaleInProps = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  },
  transition: { duration: 0.4 }
};

// For staggered animations (cards, items in a grid)
export const fastStaggerProps = (index = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -150px 0px"  // Even earlier for staggered items
  },
  transition: { 
    duration: 0.4, 
    delay: index * 0.05  // Reduced delay between items (was 0.1-0.2)
  }
});

// For hero sections and immediate content (no delay)
export const immediateProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },  // Use animate instead of whileInView
  transition: { duration: 0.4 }
};

// For critical above-the-fold content
export const eagerProps = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { 
    once: true, 
    amount: 0.05,  // Trigger as soon as element starts entering
    margin: "0px 0px -200px 0px"  // Very early trigger
  },
  transition: { duration: 0.3 }  // Very fast
};