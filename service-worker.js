const CACHE_NAME = "anniversary-app-v1";
const urlsToCache = [
  "./",
  "./src/index.html",
  "./src/output.css",
  "./assets/img1.jpg",
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./assets/img4.jpg",
  "./assets/Logo.png",
];

// Install SW & cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate SW & clear old cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
