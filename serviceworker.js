self.addEventListener('install', function(event) {
    console.log('install------');
    event.waitUntil(
        caches.open('cache').then((cache) => {
            return cache.add('./new_offline.html');
        })
    );
});
self.addEventListener('fetch', function(event) {
    console.log('fetch-----');
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match('./new_offline.html');
        })
    );
});
