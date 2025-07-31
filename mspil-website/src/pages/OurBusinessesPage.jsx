import React from 'react';
import OurBusinessesSection from '@/components/sections/OurBusinessesSection';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';

const OurBusinessesPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <div className="pt-8">
        <OurBusinessesSection />
      </div>
    </div>
  );
};

export default OurBusinessesPage;