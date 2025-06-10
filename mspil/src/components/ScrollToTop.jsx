import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, wait a bit for the page to load then scroll to the element
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Account for fixed navbar height (80px)
          const navbarHeight = 80;
          const elementPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: elementPosition,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // If element not found, scroll to top
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // No hash, scroll to top immediately
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;