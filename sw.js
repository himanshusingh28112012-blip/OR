const CACHE_NAME = 'or-omni-cache-v1';

// Add basic files to cache for offline fallback
const urlsToCache = [
  '/',
  '/login',
  '/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Fallback if offline and request fails
          return caches.match('/');
        });
      })
  );
});
