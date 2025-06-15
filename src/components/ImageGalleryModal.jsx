import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import LazyImage from '@/components/LazyImage';

const ImageGalleryModal = ({ isOpen, setIsOpen, images, businessName }) => {
  const t = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setDirection(0);
    }
  }, [isOpen]);

  const safeImages = useMemo(() => images || [], [images]);

  const nextImage = () => {
    if (safeImages.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % safeImages.length);
  };

  const prevImage = () => {
    if (safeImages.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + safeImages.length) % safeImages.length);
  };

  const selectImage = (index) => {
    if (safeImages.length === 0) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentImage = useMemo(() => {
    if (safeImages.length === 0) return null;
    return safeImages[currentIndex];
  }, [safeImages, currentIndex]);
  

  const imageVariants = {
    enter: (customDirection) => ({ x: customDirection > 0 ? 500 : -500, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (customDirection) => ({ zIndex: 0, x: customDirection < 0 ? 500 : -500, opacity: 0 }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) nextImage();
    else prevImage();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl p-0 dark:bg-background">
        <DialogHeader className="p-4 border-b dark:border-border">
          <DialogTitle className="text-2xl text-foreground dark:text-foreground">{t('imageGalleryTitle') || 'Image Gallery'}: {businessName || t('defaultBusinessName')}</DialogTitle>
          <DialogDescription className="text-muted-foreground dark:text-muted-foreground">
            {t('imageGalleryDescriptionStart') || 'Explore images related to our'} {businessName || t('defaultBusinessName')} {t('imageGalleryDescriptionEnd') || 'division.'}
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 md:p-4 relative">
          <div className="aspect-[16/9] w-full overflow-hidden relative bg-muted dark:bg-muted/50 rounded-lg mb-4">
            {currentImage ? (
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <LazyImage  
                    src={currentImage.srcUrl || "/images/infrastructure/sugar-mill.jpg"} 
                    alt={t(currentImage.altKey) || currentImage.altKey || (t('defaultImageAlt') || 'Gallery image')} 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = '/images/infrastructure/sugar-mill.jpg';
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageOff className="w-24 h-24 mb-4" />
                <p>{t('noImagesAvailable') || 'No images available for this gallery.'}</p>
              </div>
            )}
            {safeImages.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 dark:bg-background/30 dark:hover:bg-background/60 dark:text-foreground"
                  onClick={() => paginate(-1)}
                  aria-label={t('previousImageAria') || "Previous image"}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 dark:bg-background/30 dark:hover:bg-background/60 dark:text-foreground"
                  onClick={() => paginate(1)}
                  aria-label={t('nextImageAria') || "Next image"}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {safeImages.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto p-2 bg-muted/50 dark:bg-muted/30 rounded-md">
              {safeImages.map((img, index) => (
                <button
                  key={img.altKey ? `${img.altKey}_${index}` : index} // Ensure unique keys
                  onClick={() => selectImage(index)}
                  className={`w-20 h-16 md:w-24 md:h-20 rounded-md overflow-hidden border-2 transition-all
                    ${index === currentIndex ? 'border-primary scale-105' : 'border-transparent hover:border-primary/50'}`}
                  aria-label={`${t('goToImageAria') || "Go to image"} ${index + 1}: ${t(img.altKey)}`}
                >
                  <LazyImage  
                    src={img.srcUrl || "/images/infrastructure/sugar-mill.jpg"} 
                    alt={t(img.altKey) || img.altKey || (t('thumbnailAlt') || 'Thumbnail')} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/infrastructure/sugar-mill.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end p-4 border-t dark:border-border">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="dark:text-foreground dark:border-border dark:hover:bg-muted">
            <X className="mr-2 h-4 w-4" /> {t('closeButton') || 'Close'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;