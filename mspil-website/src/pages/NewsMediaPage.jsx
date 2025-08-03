import React, { useState } from 'react';
import NewsMediaSection from '@/components/sections/NewsMediaSection';
import AINewsSection from '@/components/AINewsSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const NewsMediaPage = () => {
  const [newsRefreshKey, setNewsRefreshKey] = useState(0);
  
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* AI-Powered Industry News */}
      <AINewsSection key={newsRefreshKey} />
      
      {/* Gallery Section */}
      <NewsMediaSection />
    </div>
  );
};

export default NewsMediaPage;