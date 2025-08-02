import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Calendar, 
  Globe, 
  Plus,
  Check,
  Factory,
  Droplets,
  Zap,
  TrendingUp
} from 'lucide-react';

const NewsSearchResults = ({ newsItems, onPostToWebsite }) => {
  const [postedItems, setPostedItems] = useState(new Set());

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'sugar': return <Factory size={14} className="text-orange-400" />;
      case 'ethanol': return <Droplets size={14} className="text-blue-400" />;
      case 'power': return <Zap size={14} className="text-yellow-400" />;
      case 'market': return <TrendingUp size={14} className="text-green-400" />;
      default: return <Globe size={14} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handlePostToWebsite = async (newsItem) => {
    try {
      // Create formatted news item for the website
      const formattedNews = {
        id: Date.now(),
        title: newsItem.title,
        content: newsItem.summary || newsItem.content || 'Click to read more...',
        category: newsItem.categories?.[0] || 'market',
        author: 'Industry News',
        date: newsItem.date || new Date().toISOString(),
        source: newsItem.source || 'External Source',
        tags: newsItem.categories || ['industry'],
        published: true,
        originalUrl: newsItem.url
      };

      // Save to local storage
      const existingNews = JSON.parse(localStorage.getItem('mspil_news') || '[]');
      const updatedNews = [formattedNews, ...existingNews];
      localStorage.setItem('mspil_news', JSON.stringify(updatedNews));

      // Mark as posted
      setPostedItems(prev => new Set([...prev, newsItem.id || newsItem.title]));

      // Notify parent
      if (onPostToWebsite) {
        onPostToWebsite(formattedNews);
      }

      // Refresh the page to show updated news
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Error posting news to website:', error);
    }
  };

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mt-4">
      <div className="text-sm text-gray-400 mb-3">
        Found {newsItems.length} relevant news articles:
      </div>
      
      {newsItems.map((item, index) => {
        const itemId = item.id || item.title;
        const isPosted = postedItems.has(itemId);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-800/60 backdrop-blur-xl border border-white/40 p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(item.categories?.[0])}
                  <span className="text-xs text-gray-400 capitalize">
                    {item.categories?.[0] || 'Industry'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(item.date)}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-white font-medium mb-2 line-clamp-2">
                {item.title}
              </h4>

              {/* Summary */}
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {item.summary || item.content || 'No summary available'}
              </p>

              {/* Source and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500">
                  <Globe size={12} className="mr-1" />
                  {item.source || 'External Source'}
                </div>

                <div className="flex items-center gap-2">
                  {/* Original Link */}
                  {item.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(item.url, '_blank')}
                      className="h-7 px-2 text-xs text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={12} />
                    </Button>
                  )}

                  {/* Post to Website Button */}
                  <Button
                    variant={isPosted ? "outline" : "default"}
                    size="sm"
                    onClick={() => handlePostToWebsite(item)}
                    disabled={isPosted}
                    className={`h-7 px-3 text-xs ${
                      isPosted 
                        ? 'bg-green-600/20 border-green-600/40 text-green-400 cursor-not-allowed' 
                        : 'bg-primary hover:bg-primary/80'
                    }`}
                  >
                    {isPosted ? (
                      <>
                        <Check size={12} className="mr-1" />
                        Posted
                      </>
                    ) : (
                      <>
                        <Plus size={12} className="mr-1" />
                        Post to Website
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NewsSearchResults;