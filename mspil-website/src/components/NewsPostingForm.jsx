import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Newspaper, 
  Save, 
  X, 
  Factory, 
  Droplets, 
  Zap, 
  TrendingUp,
  Plus,
  Tag
} from 'lucide-react';

const NewsPostingForm = ({ isOpen, onClose, onNewsPosted }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    source: 'MSPIL News'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'sugar', name: 'Sugar', icon: <Factory size={16} /> },
    { id: 'ethanol', name: 'Ethanol', icon: <Droplets size={16} /> },
    { id: 'power', name: 'Power', icon: <Zap size={16} /> },
    { id: 'market', name: 'Market', icon: <TrendingUp size={16} /> }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) return;

    setIsSubmitting(true);
    
    try {
      // Create news item
      const newsItem = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        category: formData.category,
        author: 'Marketing Agent',
        date: new Date().toISOString(),
        source: formData.source,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        published: true
      };

      // Save to local storage for now (in production, this would be an API call)
      const existingNews = JSON.parse(localStorage.getItem('mspil_news') || '[]');
      const updatedNews = [newsItem, ...existingNews];
      localStorage.setItem('mspil_news', JSON.stringify(updatedNews));

      // Notify parent component
      if (onNewsPosted) {
        onNewsPosted(newsItem);
      }

      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        source: 'MSPIL News'
      });

      onClose();
    } catch (error) {
      console.error('Error posting news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-gray-900/95 backdrop-blur-xl border border-white/40 shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Newspaper className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Post News Article</h3>
                <p className="text-sm text-gray-400">Share industry updates and company news</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                News Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter news headline..."
                className="bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500"
                required
              />
            </div>

            {/* Category and Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="bg-gray-800/40 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-white/20">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Source
                </label>
                <Input
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  placeholder="News source..."
                  className="bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                News Content *
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your news article content here..."
                className="bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500 min-h-32"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex items-center">
                <Tag size={16} className="text-gray-400 mr-2" />
                <Input
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="Enter tags separated by commas (e.g., sugar, production, industry)"
                  className="bg-gray-800/40 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-gray-800/40 border-white/20 text-gray-300 hover:bg-gray-700/40"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.title || !formData.content || !formData.category || isSubmitting}
                className="bg-primary hover:bg-primary/80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Post News
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default NewsPostingForm;