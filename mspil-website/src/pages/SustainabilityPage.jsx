import React from 'react';
import SustainabilitySection from '@/components/sections/SustainabilitySection';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const SustainabilityPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary}`}>
      <SustainabilitySection />
    </div>
  );
};

export default SustainabilityPage;