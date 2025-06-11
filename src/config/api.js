// API Configuration
export const getApiUrl = () => {
  // In production, use the Railway URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://mspil-mcp-production.up.railway.app/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3002/api';
};

export const API_URL = getApiUrl();