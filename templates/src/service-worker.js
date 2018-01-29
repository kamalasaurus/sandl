const PRECACHE = 'version1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'css/style.css',
  'randomness.js',
  'js/main.js',
  'examples.png'
];

// caches our resources
// caches is now a global object!
// self refers to the SeviceWorkerGlobalContext -- it's a new semantic
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// cleans out old caches
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
      //self.clients.claim will make the new service worker take effect immediately on any open pages in its scope.
  );
});

self.addEventListener('fetch', event => {
  // skip x-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) return cachedResponse;

          return caches.open(RUNTIME)
            .then(cache => {
              return fetch(event.request)
                .then(response => {
                  return cache.put(event.request, response.clone())
                    .then(() => response);
                });
            });

        })
    );
  }
});

