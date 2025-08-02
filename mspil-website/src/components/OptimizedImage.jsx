import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * OptimizedImage - Enhanced lazy loading with WebP support and responsive images
 * Automatically uses WebP format when available, with intelligent fallbacks
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  sizes = '100vw',
  priority = false,
  quality = 85,
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e0e0e0"/%3E%3C/svg%3E',
  onLoad,
  onError,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  // Generate optimized image sources
  const generateSources = (originalSrc) => {
    if (!originalSrc) return { webp: null, fallback: originalSrc };
    
    const { dir, name, ext } = parsePath(originalSrc);
    
    // Check if WebP version exists
    const webpSrc = `${dir}/${name}.webp`;
    
    // Generate responsive variants
    const responsiveWebP = {
      mobile: `${dir}/${name}_mobile.webp`,
      tablet: `${dir}/${name}_tablet.webp`, 
      desktop: `${dir}/${name}_desktop.webp`
    };
    
    return {
      webp: webpSrc,
      responsiveWebP,
      fallback: originalSrc
    };
  };

  // Parse file path
  const parsePath = (filePath) => {
    const lastDot = filePath.lastIndexOf('.');
    const lastSlash = filePath.lastIndexOf('/');
    
    return {
      dir: filePath.substring(0, lastSlash),
      name: filePath.substring(lastSlash + 1, lastDot),
      ext: filePath.substring(lastDot)
    };
  };

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Load image with WebP detection
  const loadOptimizedImage = (targetSrc) => {
    const sources = generateSources(targetSrc);
    
    // Try WebP first if supported
    if (supportsWebP() && sources.webp) {
      const webpImg = new Image();
      webpImg.src = sources.webp;
      
      webpImg.onload = () => {
        setImageSrc(sources.webp);
        setIsLoaded(true);
        onLoad?.();
      };
      
      webpImg.onerror = () => {
        // Fallback to original format
        loadFallbackImage(sources.fallback);
      };
    } else {
      // Load original format
      loadFallbackImage(sources.fallback);
    }
  };

  // Load fallback image
  const loadFallbackImage = (fallbackSrc) => {
    const img = new Image();
    img.src = fallbackSrc;
    
    img.onload = () => {
      setImageSrc(fallbackSrc);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setIsError(true);
      console.warn(`Failed to load image: ${fallbackSrc}`);
      onError?.();
    };
  };

  useEffect(() => {
    if (priority) {
      // Load immediately for critical images
      loadOptimizedImage(src);
      return;
    }

    // Lazy load with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadOptimizedImage(src);
            observer.disconnect();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority, onLoad, onError]);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src || isError) return undefined;
    
    const sources = generateSources(src);
    
    if (supportsWebP() && sources.responsiveWebP) {
      return `
        ${sources.responsiveWebP.mobile} 768w,
        ${sources.responsiveWebP.tablet} 1024w,
        ${sources.responsiveWebP.desktop} 1920w
      `.trim();
    }
    
    return undefined;
  };

  return (
    <picture>
      {/* WebP sources with responsive variants */}
      {supportsWebP() && !isError && (
        <source
          srcSet={generateSrcSet()}
          sizes={sizes}
          type="image/webp"
        />
      )}
      
      {/* Fallback image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          'transition-all duration-500 ease-out',
          isLoaded 
            ? 'opacity-100 blur-0' 
            : 'opacity-0 blur-sm',
          isError && 'opacity-50',
          className
        )}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...props}
      />
    </picture>
  );
};

// Higher-order component for easy migration from LazyImage
export const withOptimization = (WrappedComponent) => {
  return (props) => {
    if (props.src && typeof props.src === 'string') {
      return <OptimizedImage {...props} />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default OptimizedImage;