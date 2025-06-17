import React, { createContext, useContext, useState, useEffect } from 'react';

const ImageContext = createContext();

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeServerUrl, setActiveServerUrl] = useState('');

  useEffect(() => {
    const fetchAllImages = async () => {
      let allContent = [];
      
      // Temporarily disable CMS image fetching due to server issues
      const disableCMS = true; // TODO: Re-enable when CMS is stable
      const forceProduction = process.env.NODE_ENV === 'production' || process.env.REACT_APP_FORCE_PRODUCTION_IMAGES === 'true';
      
      try {
        // Skip CMS fetching if disabled
        if (disableCMS) {
          console.log('🚫 CMS image fetching disabled - using static images only');
          setImages({});
          setActiveServerUrl(null);
          setIsLoading(false);
          return;
        }
        
        // First, try local server (only if not forced to production)
        if (process.env.NODE_ENV !== 'production' && !forceProduction) {
          console.log('🔍 Trying to fetch images from local server...');
          try {
            const localResponse = await fetch('http://localhost:3002/api/content');
            if (localResponse.ok) {
              const localContent = await localResponse.json();
              allContent = localContent;
              setActiveServerUrl('http://localhost:3002');
              console.log('✅ Loaded images from local server:', localContent.length, 'items');
            }
          } catch (localError) {
            console.log('⚠️ Local server not available, trying production server...');
          }
        } else if (forceProduction) {
          console.log('🌐 Forcing production server due to REACT_APP_FORCE_PRODUCTION_IMAGES=true');
        }
        
        // If no content from local or in production or forced, try production server
        if (allContent.length === 0 || forceProduction) {
          console.log(forceProduction ? '🌐 Force fetching from production server...' : '🌐 Fetching images from production server...');
          
          // Try multiple production URLs in order of likelihood
          const productionUrls = [
            'https://mspil-mcp-production.up.railway.app', // Railway production (now working!)
            process.env.REACT_APP_PRODUCTION_CMS_URL || 'https://mspil-mcp-production.up.railway.app', // Railway fallback
          ].filter(Boolean);
          
          console.log('🔍 Will try these production URLs:', productionUrls);
          
          for (const baseUrl of productionUrls) {
            try {
              const apiUrl = baseUrl.includes('/api') ? baseUrl + '/content' : baseUrl + '/api/content';
              console.log(`🔍 Trying production server: ${apiUrl}`);
              
              const productionResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                mode: 'cors' // Explicitly set CORS mode
              });
              
              console.log(`📊 Response status: ${productionResponse.status} from ${baseUrl}`);
              console.log(`📊 Response headers:`, {
                'content-type': productionResponse.headers.get('content-type'),
                'access-control-allow-origin': productionResponse.headers.get('access-control-allow-origin')
              });
              
              if (productionResponse.ok) {
                const productionContent = await productionResponse.json();
                console.log(`📊 Response data:`, { 
                  url: baseUrl, 
                  itemCount: productionContent.length,
                  categories: productionContent.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + 1;
                    return acc;
                  }, {})
                });
                
                if (productionContent.length > 0) {
                  // Set active server URL before processing content
                  setActiveServerUrl(baseUrl);
                  
                  // Fix any old/localhost URLs in the content
                  console.log(`🔧 Fixing URLs for ${productionContent.length} items...`);
                  productionContent.forEach(item => {
                    if (item.url && item.url.includes('localhost:3002')) {
                      const oldUrl = item.url;
                      const filename = item.url.split('/uploads/').pop();
                      item.url = `${baseUrl}/uploads/${filename}`;
                      console.log(`🔄 Fixed: ${oldUrl} → ${item.url}`);
                    }
                    // Also fix HTTP to HTTPS
                    if (item.url && item.url.startsWith('http://')) {
                      item.url = item.url.replace('http://', 'https://');
                      console.log(`🔒 Fixed HTTP to HTTPS: ${item.url}`);
                    }
                  });
                  
                  allContent = productionContent;
                  console.log(`✅ SUCCESS! Loaded ${productionContent.length} images from: ${baseUrl}`);
                  break; // Success! Stop trying other URLs
                } else {
                  console.log(`⚠️ Empty response from ${baseUrl}`);
                }
              } else {
                console.log(`❌ HTTP ${productionResponse.status} from ${baseUrl}:`, productionResponse.statusText);
                // Try to get error details
                try {
                  const errorText = await productionResponse.text();
                  console.log(`❌ Error response body:`, errorText);
                } catch (e) {
                  console.log(`❌ Could not read error response body`);
                }
              }
            } catch (urlError) {
              console.log(`❌ Network error from ${baseUrl}:`, urlError.message);
              console.log(`❌ Full error details:`, urlError);
            }
          }
          
          if (allContent.length === 0) {
            console.log('⚠️ Could not fetch images from any production server');
          }
        }
        
        // Group images by category and fix old URLs
        const groupedImages = {};
        allContent.forEach(item => {
          // Fix old localhost URLs
          if (item.url && item.url.includes('localhost:3002')) {
            const oldUrl = item.url;
            const filename = item.url.split('/uploads/').pop();
            const baseUrl = activeServerUrl || 'https://mspil-mcp-production.up.railway.app';
            item.url = `${baseUrl}/uploads/${filename}`;
            console.log(`🔄 Fixed in grouping: ${oldUrl} → ${item.url}`);
          }
          
          // Fix HTTP to HTTPS
          if (item.url && item.url.startsWith('http://')) {
            item.url = item.url.replace('http://', 'https://');
          }
          
          if (!groupedImages[item.category]) {
            groupedImages[item.category] = [];
          }
          groupedImages[item.category].push(item);
        });
        
        setImages(groupedImages);
        console.log('🖼️ All images grouped by category:', Object.keys(groupedImages));
        console.log('📊 Image counts by category:', Object.entries(groupedImages).map(([cat, imgs]) => `${cat}: ${imgs.length}`));
        
        // Log available CMS images to console for debugging
        console.log('Available CMS images:', groupedImages);
      } catch (error) {
        console.log('❌ Could not fetch images from any server:', error);
        console.error('Full error stack:', error.stack);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  // Helper function to get image URL with fallback
  const getImage = (category, fallbackUrl = '', index = 0) => {
    const categoryImages = images[category];
    if (categoryImages && categoryImages[index]) {
      const imageItem = categoryImages[index];
      let imageUrl = imageItem.url;
      
      // If URL is already absolute, ensure it uses HTTPS
      if (imageUrl.startsWith('http')) {
        // Force HTTPS for security
        return imageUrl.replace('http://', 'https://');
      }
      
      // For relative URLs, determine the correct base URL
      // Use the active server URL if available, otherwise determine based on environment
      let baseUrl;
      if (activeServerUrl) {
        baseUrl = activeServerUrl;
      } else if (process.env.NODE_ENV === 'production') {
        baseUrl = process.env.REACT_APP_PRODUCTION_CMS_URL || 'https://mspil-mcp-production.up.railway.app';
      } else {
        // Check if the image was loaded from production server
        const isFromProduction = imageUrl.includes('/uploads/') && 
          !imageUrl.startsWith('http://localhost');
        baseUrl = isFromProduction 
          ? (process.env.REACT_APP_PRODUCTION_CMS_URL || 'https://mspil-mcp-production.up.railway.app')
          : 'http://localhost:3002';
      }
      
      return `${baseUrl}${imageUrl}`;
    }
    return fallbackUrl;
  };

  // Helper function to get all images from a category
  const getCategoryImages = (category) => {
    const categoryImages = images[category] || [];
    
    return categoryImages.map(img => {
      let imageUrl = img.url;
      
      // If URL is already absolute, ensure it uses HTTPS
      if (imageUrl.startsWith('http')) {
        // Force HTTPS for security
        return { ...img, url: imageUrl.replace('http://', 'https://') };
      }
      
      // For relative URLs, determine the correct base URL
      // Use the active server URL if available, otherwise determine based on environment
      let baseUrl;
      if (activeServerUrl) {
        baseUrl = activeServerUrl;
      } else if (process.env.NODE_ENV === 'production') {
        baseUrl = process.env.REACT_APP_PRODUCTION_CMS_URL || 'https://mspil-mcp-production.up.railway.app';
      } else {
        // Check if the image was loaded from production server
        const isFromProduction = imageUrl.includes('/uploads/') && 
          !imageUrl.startsWith('http://localhost');
        baseUrl = isFromProduction 
          ? (process.env.REACT_APP_PRODUCTION_CMS_URL || 'https://mspil-mcp-production.up.railway.app')
          : 'http://localhost:3002';
      }
      
      return {
        ...img,
        url: `${baseUrl}${imageUrl}`
      };
    });
  };

  const value = {
    images,
    loading,
    getImage,
    getCategoryImages
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;