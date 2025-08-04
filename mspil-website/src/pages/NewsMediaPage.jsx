import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsMediaSection from '@/components/sections/NewsMediaSection';
import AINewsSection from '@/components/AINewsSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const NewsMediaPage = () => {
  const [newsRefreshKey, setNewsRefreshKey] = useState(0);
  const location = useLocation();
  
  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      setTimeout(() => {
        const elementId = location.hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          const yOffset = -100; // Account for fixed header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);
  
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* AI-Powered Industry News */}
      <div id="news">
        <AINewsSection key={newsRefreshKey} />
      </div>
      
      {/* Gallery Section */}
      <div id="gallery">
        <NewsMediaSection />
      </div>
      
      {/* Press Releases Section */}
      <div id="press" className="py-16">
        {/* Press releases will be added here */}
      </div>
    </div>
  );
};

export default NewsMediaPage;