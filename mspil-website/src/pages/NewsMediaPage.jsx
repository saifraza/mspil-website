import React from 'react';
import NewsMediaSection from '@/components/sections/NewsMediaSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const NewsMediaPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <NewsMediaSection />
    </div>
  );
};

export default NewsMediaPage;