// Enhanced service worker for better performance
const CACHE_VERSION = 'mspil-v2';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Core assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/company_logo.webp',
  '/manifest.json',
  '/favicon.ico'
];

// Cache expiration times
const CACHE_EXPIRATION = {
  images: 7 * 24 * 60 * 60 * 1000, // 7 days
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 24 * 60 * 60 * 1000 // 24 hours
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        // Try to cache assets individually to avoid failing on missing files
        return Promise.allSettled(
          STATIC_ASSETS.map(asset => 
            cache.add(asset).catch(err => {
              console.warn(`Failed to cache ${asset}:`, err);
              return null;
            })
          )
        );
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.error('Service worker installation failed:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !cacheName.startsWith('static-') && 
                     !cacheName.startsWith('dynamic-') && 
                     !cacheName.startsWith('images-') ||
                     (cacheName !== STATIC_CACHE && 
                      cacheName !== DYNAMIC_CACHE && 
                      cacheName !== IMAGE_CACHE);
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to check if cache is expired
function isCacheExpired(response, maxAge) {
  const fetchDate = response.headers.get('date');
  if (!fetchDate) return true;
  
  const fetchTime = new Date(fetchDate).getTime();
  return Date.now() - fetchTime > maxAge;
}

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Handle images with cache-first strategy
  if (request.url.includes('/images/') || request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_EXPIRATION.images)) {
            return cachedResponse;
          }

          return fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse || new Response('Image not available', { status: 404 }));
        });
      })
    );
    return;
  }

  // Handle static assets (JS, CSS) with cache-first strategy
  if (request.url.match(/\.(js|css)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_EXPIRATION.static)) {
            return cachedResponse;
          }

          return fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);
        });
      })
    );
    return;
  }

  // Handle API calls and HTML with network-first strategy
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Clone the response before caching
        const responseToCache = networkResponse.clone();

        caches.open(DYNAMIC_CACHE).then((cache) => {
          // Only cache successful responses
          if (networkResponse.status === 200) {
            cache.put(request, responseToCache);
          }
        });

        return networkResponse;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return new Response('<h1>Offline</h1><p>Please check your connection.</p>', {
              headers: { 'Content-Type': 'text/html' }
            });
          }

          return new Response('Network error', { status: 408 });
        });
      })
  );
});

// Background sync for offline form submissions (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineData());
  }
});

// Periodic background sync for keeping content fresh
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateCachedContent());
  }
});

async function syncOfflineData() {
  // Future implementation for offline form submissions
}

async function updateCachedContent() {
  // Future implementation for updating cached content
}