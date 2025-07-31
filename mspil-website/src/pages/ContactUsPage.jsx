import React from 'react';
import ContactUsSection from '@/components/sections/ContactUsSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';

const ContactUsPage = () => {
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <ContactUsSection />
    </div>
  );
};

export default ContactUsPage;