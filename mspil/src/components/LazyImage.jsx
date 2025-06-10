import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e0e0e0"/%3E%3C/svg%3E',
  onLoad,
  onError,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
              onLoad?.();
            };
            img.onerror = () => {
              setIsError(true);
              onError?.();
            };
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    />
  );
};

export default LazyImage;