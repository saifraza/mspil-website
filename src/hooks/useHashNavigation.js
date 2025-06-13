import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHashNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const elementId = hash.substring(1); // Remove the # symbol
      
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          // Scroll to element with smooth behavior
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // If it's a tab content, activate the tab
          if (['sugar', 'ethanol', 'power', 'feed'].includes(elementId)) {
            const tabTrigger = document.querySelector(`[data-state="inactive"][value="${elementId}"]`);
            if (tabTrigger) {
              tabTrigger.click();
            }
          }
        }
      }, 100);
    }
  }, [location.hash]);
};

export default useHashNavigation;