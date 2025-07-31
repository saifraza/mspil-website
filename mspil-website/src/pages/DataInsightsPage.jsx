import React from 'react';
import ComprehensiveDataInsightsSection from '@/components/sections/ComprehensiveDataInsightsSection';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import UnifiedBackground from '@/components/ui/UnifiedBackground';

const DataInsightsPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <ComprehensiveDataInsightsSection />
    </div>
  );
};

export default DataInsightsPage;