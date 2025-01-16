const CACHE_NAME = "offline-cache-v1";
const OFFLINE_FILES = [
    "/index.html",
    "/white-noise.mp3"
];

// Install the Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching offline files");
            return cache.addAll(OFFLINE_FILES);
        })
    );
});

// Fetch files from cache or network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate the Service Worker and clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});