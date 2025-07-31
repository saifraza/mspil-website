import React from 'react';
import CareersSection from '@/components/sections/CareersSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const CareersPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <CareersSection />
    </div>
  );
};

export default CareersPage;