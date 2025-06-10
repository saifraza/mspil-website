import React from 'react';
import OurBusinessesSection from '@/components/sections/OurBusinessesSection';

const OurBusinessesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-eco-lime-50 dark:from-bio-green-800 dark:to-bio-green-900">
      <div className="pt-8">
        <OurBusinessesSection />
      </div>
    </div>
    // This page will be expanded with sub-pages or more detailed tab content
    // for Sugar, Ethanol, Power, Animal Feed, and Dairy as per your plan.
  );
};

export default OurBusinessesPage;