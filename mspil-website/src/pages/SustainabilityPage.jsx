import React from 'react';
import SustainabilitySection from '@/components/sections/SustainabilitySection';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';

const SustainabilityPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <SustainabilitySection />
    </div>
  );
};

export default SustainabilityPage;