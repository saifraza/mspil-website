// Image proxy utility to handle CORS issues
export async function loadImageAsDataURL(imageUrl) {
  try {
    const response = await fetch(imageUrl, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load image: ${response.status}`);
    }
    
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
}

// Batch load images with data URLs
export async function loadImagesAsDataURLs(imageUrls) {
  const promises = imageUrls.map(url => loadImageAsDataURL(url));
  return Promise.all(promises);
}