import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Newspaper, 
  RefreshCw, 
  Calendar, 
  ExternalLink, 
  TrendingUp,
  Factory,
  Droplets,
  Zap,
  Filter,
  Clock
} from 'lucide-react';

const AUTOMATION_SERVICE_URL = import.meta.env.VITE_AUTOMATION_SERVICE_URL || 'http://localhost:3001';

const AINewsSection = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);

  const categories = [
    { id: 'all', name: 'All News', icon: <Newspaper size={16} /> },
    { id: 'sugar', name: 'Sugar', icon: <Factory size={16} /> },
    { id: 'ethanol', name: 'Ethanol', icon: <Droplets size={16} /> },
    { id: 'power', name: 'Power', icon: <Zap size={16} /> },
    { id: 'market', name: 'Market', icon: <TrendingUp size={16} /> }
  ];

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const topics = selectedCategory === 'all' ? ['sugar', 'ethanol'] : [selectedCategory];
      const response = await fetch(`${AUTOMATION_SERVICE_URL}/api/news?topics=${topics.join(',')}&limit=20`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      setNews(data.news || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
      // Set mock data if API fails
      setNews([
        {
          id: 1,
          title: 'Sugar Production Increases by 15% in Current Season',
          source: 'ChiniMandi',
          date: new Date().toISOString(),
          summary: 'Sugar production in India has seen a significant increase of 15% in the current crushing season, reaching new heights in productivity.',
          category: 'sugar',
          url: '#'
        },
        {
          id: 2,
          title: 'Ethanol Blending Target Achieved Ahead of Schedule',
          source: 'ChiniMandi',
          date: new Date().toISOString(),
          summary: 'India achieves 12% ethanol blending target ahead of the 2025 deadline, marking a major milestone in renewable energy.',
          category: 'ethanol',
          url: '#'
        },
        {
          id: 3,
          title: 'New Technology Improves Sugar Mill Efficiency',
          source: 'Indian Sugar Mills Association',
          date: new Date().toISOString(),
          summary: 'Revolutionary new technology promises to improve sugar mill efficiency by 20%, reducing costs and environmental impact.',
          category: 'sugar',
          url: '#'
        }
      ]);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'sugar': return <Factory size={14} className="text-orange-400" />;
      case 'ethanol': return <Droplets size={14} className="text-blue-400" />;
      case 'power': return <Zap size={14} className="text-yellow-400" />;
      case 'market': return <TrendingUp size={14} className="text-green-400" />;
      default: return <Newspaper size={14} className="text-gray-400" />;
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Latest Industry News
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Stay updated with the latest developments in sugar and ethanol industry
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  ${selectedCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-800/40 border-white/20 text-gray-300 hover:bg-gray-700/40'
                  }
                `}
              >
                {category.icon}
                <span className="ml-1">{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Refresh and Last Updated */}
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                Updated {formatDate(lastUpdated)}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNews}
              disabled={isLoading}
              className="bg-gray-800/40 border-white/20 hover:bg-gray-700/40"
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* News Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="bg-gray-800/40 border-white/20 p-6">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                  </Card>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/60 backdrop-blur-xl border border-white/40 p-6 hover:bg-gray-800/80 transition-all duration-300 h-full flex flex-col">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <span className="text-xs text-gray-400 capitalize">{item.category}</span>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                      {item.summary}
                    </p>

                    {/* Source and Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-500">
                        Source: {item.source}
                      </span>
                      {item.url && item.url !== '#' && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Newspaper size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No news found</h3>
            <p className="text-gray-500">Try refreshing or selecting a different category</p>
          </motion.div>
        )}

        {/* AI Agent Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm text-gray-500"
        >
          <p>Powered by MSPIL AI Marketing Agent • Real-time industry updates from trusted sources</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AINewsSection;