import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon, Video, ZoomIn } from 'lucide-react';
import UnifiedBackground from '@/components/ui/UnifiedBackground';
import { pageBackgrounds } from '@/utils/backgroundStyles';
import { useTranslation } from '@/contexts/LanguageContext';

const GalleryPage = () => {
  const t = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryMedia = async () => {
      try {
        // Always use production API for now since local isn't running
        const API_URL = 'https://automationservice-production-4565.up.railway.app/api';
        
        const response = await fetch(`${API_URL}/media/list?category=news-gallery`, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const mediaFiles = await response.json();
          
          if (mediaFiles && mediaFiles.length > 0) {
            // Transform API response to gallery format
            const galleryItems = mediaFiles.map((file, index) => ({
              type: file.mimetype?.includes('video') ? 'video' : 'image',
              titleKey: `galleryImage${index + 1}`,
              title: file.metadata?.title || file.originalName || `Gallery Image ${index + 1}`,
              imageUrl: `${file.url}?t=${Date.now()}`,
              videoUrl: file.mimetype?.includes('video') ? `${file.url}?t=${Date.now()}` : undefined,
              altKey: `galleryImage${index + 1}Alt`,
              uploadDate: file.uploadDate
            }));
            
            setGalleryItems(galleryItems);
          } else {
            // Use static fallback
            setStaticGalleryItems();
          }
        } else {
          // Use static fallback
          setStaticGalleryItems();
        }
      } catch (error) {
        console.log('Failed to fetch gallery media:', error);
        // Use static fallback
        setStaticGalleryItems();
      } finally {
        setIsLoading(false);
      }
    };

    const setStaticGalleryItems = () => {
      const staticItems = [
        { type: 'image', titleKey: 'newsGalleryImage1Title', imageUrl: '/images/news_media/image1.jpg', altKey: 'newsGalleryImage1Alt' },
        { type: 'image', titleKey: 'newsGalleryImage2Title', imageUrl: '/images/news_media/image2.jpg', altKey: 'newsGalleryImage2Alt' },
        { type: 'image', titleKey: 'newsGalleryImage3Title', imageUrl: '/images/news_media/image3.jpg', altKey: 'newsGalleryImage3Alt' },
        { type: 'image', titleKey: 'newsGalleryImage4Title', imageUrl: '/images/news_media/image4.jpg', altKey: 'newsGalleryImage4Alt' },
        { type: 'image', titleKey: 'newsGalleryImage5Title', imageUrl: '/images/news_media/image5.jpg', altKey: 'newsGalleryImage5Alt' },
        { type: 'image', titleKey: 'newsGalleryImage6Title', imageUrl: '/images/placeholder.jpg', altKey: 'newsGalleryImage6Alt' }
      ];
      setGalleryItems(staticItems);
    };

    fetchGalleryMedia();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`min-h-screen ${pageBackgrounds.primary} relative`}>
      <UnifiedBackground />
      
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('galleryTitle', 'Media Gallery')}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {t('gallerySubtitle', 'Explore our collection of images and videos showcasing our operations, community initiatives, and milestones.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            [...Array(12)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-800/60 animate-pulse rounded-lg" />
            ))
          ) : galleryItems.length > 0 ? (
            galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              onClick={() => openLightbox(index)}
              className="cursor-pointer relative group"
            >
              <div className="overflow-hidden aspect-square bg-gray-800/60 backdrop-blur-xl border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={t(item.altKey) || t(item.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-white font-medium">
                        {item.title || t(item.titleKey)}
                      </p>
                      {item.type === 'video' ? (
                        <Video className="w-5 h-5 text-white" />
                      ) : (
                        <ZoomIn className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p className="text-lg">No media available in the gallery.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="max-w-5xl max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[lightboxIndex]?.type === 'video' ? (
                <video
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                  src={galleryItems[lightboxIndex].videoUrl}
                />
              ) : (
                <img
                  src={galleryItems[lightboxIndex]?.imageUrl}
                  alt={t(galleryItems[lightboxIndex]?.altKey) || t(galleryItems[lightboxIndex]?.titleKey)}
                  className="w-full h-full object-contain rounded-lg"
                />
              )}
              <p className="text-white text-center mt-4 text-lg">
                {t(galleryItems[lightboxIndex].titleKey)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;