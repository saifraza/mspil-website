import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, CalendarDays, Video, Image as ImageIcon, Linkedin, Twitter, ImageOff, X, ChevronLeft, ChevronRight, TrendingUp, Clock, Eye } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useImages } from '@/contexts/ImageContext';

// News ticker component
const NewsTicker = ({ items }) => {
  const t = useTranslation();
  
  return (
    <div className="overflow-hidden bg-primary/10 dark:bg-primary/20 py-2 mb-8 rounded-lg">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={index} className="inline-flex items-center mx-8 text-sm font-medium text-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t(item.titleKey)}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Lightbox component for gallery
const Lightbox = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
  const t = useTranslation();
  
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [setCurrentIndex, images.length]);
  
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [setCurrentIndex, images.length]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, onClose, handlePrevious, handleNext]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        <motion.button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <X className="w-8 h-8" />
        </motion.button>
        
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>
        
        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
        
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl max-h-[80vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {images[currentIndex]?.imageUrl ? (
            <img
              src={images[currentIndex].imageUrl}
              alt={t(images[currentIndex].altKey) || t(images[currentIndex].titleKey)}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-96 h-96 flex items-center justify-center bg-muted rounded-lg">
              <ImageOff className="w-20 h-20 text-muted-foreground" />
            </div>
          )}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-center mt-4 text-lg"
          >
            {t(images[currentIndex]?.titleKey)}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NewsMediaSection = () => {
  const t = useTranslation();
  const { getImage, getCategoryImages } = useImages();
  const [galleryItemsWithUrls, setGalleryItemsWithUrls] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredNewsItem, setHoveredNewsItem] = useState(null);
  const [uploadedMediaFiles, setUploadedMediaFiles] = useState([]);

  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const newsItems = useMemo(() => [
    { titleKey: "newsItem1Title", dateKey: "newsItem1Date", categoryKey: "newsItem1Category", icon: <Newspaper className="w-5 h-5 text-primary" />, views: 1234 },
    { titleKey: "newsItem2Title", dateKey: "newsItem2Date", categoryKey: "newsItem2Category", icon: <CalendarDays className="w-5 h-5 text-primary" />, views: 856 },
    { titleKey: "newsItem3Title", dateKey: "newsItem3Date", categoryKey: "newsItem3Category", icon: <CalendarDays className="w-5 h-5 text-primary" />, views: 2341 },
  ], []);

  const initialGalleryItems = useMemo(() => [
    { type: 'video', titleKey: 'newsGalleryVideo1Title', imagePath: 'news_media/video1_thumbnail.jpg', videoPath: 'news_media/video1.mp4', altKey: 'newsGalleryVideo1Alt' },
    { type: 'image', titleKey: 'newsGalleryImage1Title', imagePath: 'news_media/image1.jpg', altKey: 'newsGalleryImage1Alt' },
    { type: 'image', titleKey: 'newsGalleryImage2Title', imagePath: 'news_media/image2.jpg', altKey: 'newsGalleryImage2Alt' },
    { type: 'image', titleKey: 'newsGalleryImage3Title', imagePath: 'news_media/image3.jpg', altKey: 'newsGalleryImage3Alt' },
    { type: 'image', titleKey: 'newsGalleryImage4Title', imagePath: 'news_media/image4.jpg', altKey: 'newsGalleryImage4Alt' },
    { type: 'image', titleKey: 'newsGalleryImage5Title', imagePath: 'news_media/image5.jpg', altKey: 'newsGalleryImage5Alt' }
  ], []);
  
  useEffect(() => {
    const fetchUploadedMedia = async () => {
      try {
        const API_URL = process.env.NODE_ENV === 'production' 
          ? 'https://mspil-mcp-production.up.railway.app/api' 
          : 'http://localhost:3002/api';
        const response = await fetch(`${API_URL}/content`);
        const allContent = await response.json();
        
        // Filter for media-images and news-images
        const mediaFiles = allContent.filter(item => 
          item.category === 'media-images' || item.category === 'news-images'
        );
        
        setUploadedMediaFiles(mediaFiles);
      } catch (error) {
        console.log('Could not fetch media files:', error);
      }
    };

    const processGalleryItems = () => {
      // Combine static gallery items with uploaded media files
      const staticItems = initialGalleryItems.map((item, index) => {
        let imageUrl = '';
        if (item.imagePath) {
          // Try to get from CMS first, fallback to local path
          imageUrl = getImage('news-images', `/images/${item.imagePath}`, index) || `/images/${item.imagePath}`;
        }
        return { ...item, imageUrl: imageUrl };
      });

      // Convert uploaded media files to gallery format
      const uploadedItems = uploadedMediaFiles.map((file, index) => ({
        type: 'image',
        titleKey: `uploadedMedia${index}Title`,
        imagePath: file.url,
        altKey: `uploadedMedia${index}Alt`,
        imageUrl: file.url,
        isUploaded: true,
        uploadedTitle: file.metadata?.title || file.filename,
        uploadedDescription: file.comment || 'Uploaded media file'
      }));

      setGalleryItemsWithUrls([...staticItems, ...uploadedItems]);
    };

    fetchUploadedMedia();
    processGalleryItems();
  }, [initialGalleryItems, uploadedMediaFiles.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-muted/30 to-background dark:from-background dark:to-muted/20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 70px)`,
          }}
          animate={{
            x: [0, 70],
            y: [0, 70],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInProps} className="text-center mb-8">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {t('newsSectionTitle')}
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('newsSectionSubtitle')}
          </motion.p>
        </motion.div>

        {/* News Ticker */}
        <NewsTicker items={newsItems} />

        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.2 }} className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.h3 
              className="text-2xl font-semibold text-foreground mb-6 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Newspaper className="mr-3 w-7 h-7 text-primary"/>
              </motion.div>
              {t('newsRecentUpdatesTitle')}
            </motion.h3>
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onHoverStart={() => setHoveredNewsItem(index)}
                  onHoverEnd={() => setHoveredNewsItem(null)}
                  style={{
                    transform: hoveredNewsItem === index ? 'perspective(1000px) rotateY(-5deg)' : 'perspective(1000px) rotateY(0deg)',
                  }}
                  className="transition-all duration-300"
                >
                  <Card className="hover:shadow-2xl transition-all duration-300 border-primary/10 hover:border-primary/30 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                    <CardContent className="p-4 flex items-start space-x-3 relative z-10">
                      <motion.div 
                        className="flex-shrink-0 pt-1"
                        animate={{
                          rotate: hoveredNewsItem === index ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground hover:text-primary transition-colors">{t(item.titleKey)}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t(item.dateKey)}
                          </p>
                          <p className="text-xs text-muted-foreground">{t(item.categoryKey)}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                            <Eye className="w-3 h-3" />
                            {item.views}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              <Button variant="link" className="mt-6 text-primary">
                {t('newsViewAllButton')} 
                <motion.span 
                  className="ml-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              className="text-2xl font-semibold text-foreground mb-6 flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: "spring" }}
              >
                <Video className="mr-3 w-7 h-7 text-primary"/>
              </motion.div>
              {t('newsMediaGalleryTitle')}
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryItemsWithUrls.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  onClick={() => item.type === 'image' && openLightbox(index)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden aspect-square group relative bg-muted shadow-lg hover:shadow-2xl transition-all duration-300">
                    {item.imageUrl ? (
                      <motion.img 
                        alt={t(item.altKey) || t(item.titleKey)} 
                        className="w-full h-full object-cover" 
                        src={item.imageUrl}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.type === 'video' ? 
                          <Video className="w-10 h-10 text-white mb-2" /> : 
                          <ImageIcon className="w-10 h-10 text-white mb-2" />
                        }
                        <p className="text-white text-sm font-medium text-center">
                          {item.isUploaded ? item.uploadedTitle : t(item.titleKey)}
                        </p>
                      </motion.div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring" }}
            >
              <Button variant="link" className="mt-6 text-primary">
                {t('newsExploreGalleryButton')} 
                <motion.span 
                  className="ml-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div {...fadeInProps} transition={{ ...fadeInProps.transition, delay: 0.5 }} className="text-center">
          <motion.h3 
            className="text-2xl font-semibold text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('newsFollowUsTitle')}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('newsFollowUsDesc')}
          </motion.p>
          <div className="flex justify-center space-x-6">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring" }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-primary/10 hover:border-primary group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[#0077b5]/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Linkedin className="mr-2 h-5 w-5 text-[#0077b5] relative z-10" /> 
                <span className="relative z-10">LinkedIn</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring" }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-primary/10 hover:border-primary group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[#1DA1F2]/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Twitter className="mr-2 h-5 w-5 text-[#1DA1F2] relative z-10" /> 
                <span className="relative z-10">Twitter</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryItemsWithUrls.filter(item => item.type === 'image')}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </section>
  );
};

export default NewsMediaSection;