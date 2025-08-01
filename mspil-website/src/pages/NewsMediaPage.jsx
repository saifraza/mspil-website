import React, { useState } from 'react';
import NewsMediaSection from '@/components/sections/NewsMediaSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import MarketingAgentChat from '@/components/MarketingAgentChat';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const NewsMediaPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <NewsMediaSection />
      
      {/* Marketing Agent Button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/80 shadow-lg"
        size="lg"
      >
        <MessageSquare className="mr-2" size={20} />
        Marketing Agent
      </Button>
      
      {/* Marketing Agent Chat */}
      <MarketingAgentChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default NewsMediaPage;