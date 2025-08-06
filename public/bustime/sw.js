// Service Worker for Bus Timer PWA
const CACHE_NAME = 'bus-timer-v1';
const urlsToCache = [
  '/bustime/',
  '/bustime/index.html',
  '/bustime/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Cache install failed:', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Only handle requests for the bustime scope
  if (!event.request.url.includes('/bustime/') && !event.request.url.includes('/api/bus-checker')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // For API calls, always try network first
        if (event.request.url.includes('/api/bus-checker')) {
          return fetch(event.request);
        }
        
        return fetch(event.request);
      })
      .catch(err => {
        console.log('Fetch failed:', err);
        // Return offline page or cached content
        return caches.match('/bustime/index.html');
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('bus-timer-')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
