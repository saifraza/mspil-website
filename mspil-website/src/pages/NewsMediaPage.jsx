import React, { useState, useEffect } from 'react';
import NewsMediaSection from '@/components/sections/NewsMediaSection';
import AINewsSection from '@/components/AINewsSection';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import MarketingAgentChat from '@/components/MarketingAgentChat';
import MarketingAgentAuth from '@/components/MarketingAgentAuth';
import NewsPostingForm from '@/components/NewsPostingForm';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';

const NewsMediaPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsRefreshKey, setNewsRefreshKey] = useState(0);
  
  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem('mspil_agent_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleAgentClick = () => {
    if (isAuthenticated) {
      setIsChatOpen(true);
    } else {
      setShowAuth(true);
    }
  };
  
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setShowAuth(false);
    setIsChatOpen(true);
  };

  const handleNewsPosted = (newsItem) => {
    // Refresh the news section by updating the key
    setNewsRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      {/* AI-Powered Industry News */}
      <AINewsSection key={newsRefreshKey} />
      
      {/* Gallery Section */}
      <NewsMediaSection />
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Post News Button - Only show if authenticated */}
        {isAuthenticated && (
          <Button
            onClick={() => setShowNewsForm(true)}
            className="bg-green-600 hover:bg-green-700 shadow-lg"
            size="lg"
          >
            <Plus className="mr-2" size={20} />
            Post News
          </Button>
        )}
        
        {/* Marketing Agent Button */}
        <Button
          onClick={handleAgentClick}
          className="bg-primary hover:bg-primary/80 shadow-lg"
          size="lg"
        >
          <MessageSquare className="mr-2" size={20} />
          Marketing Agent
        </Button>
      </div>
      
      {/* Authentication Modal */}
      {showAuth && (
        <MarketingAgentAuth 
          onAuthenticated={handleAuthenticated}
        />
      )}
      
      {/* Marketing Agent Chat */}
      {isAuthenticated && (
        <MarketingAgentChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}

      {/* News Posting Form */}
      <NewsPostingForm
        isOpen={showNewsForm}
        onClose={() => setShowNewsForm(false)}
        onNewsPosted={handleNewsPosted}
      />
    </div>
  );
};

export default NewsMediaPage;