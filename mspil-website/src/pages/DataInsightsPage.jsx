import React from 'react';
import ComprehensiveDataInsightsSection from '@/components/sections/ComprehensiveDataInsightsSection';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const DataInsightsPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary}`}>
      <ComprehensiveDataInsightsSection />
    </div>
  );
};

export default DataInsightsPage;