const CACHE_NAME = "movie-search-app";

const FILES_TO_CACHE = [
    "index.html",
    "movies.html",
    "script.js",
    "movies.js",
    "manifest.json"
];

// instalacja
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// pobieranie z cache
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});