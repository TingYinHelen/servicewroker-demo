self.addEventListener('install', function(event) {
    console.log('install------');
    event.waitUntil(
        caches.open('static-v1').then((cache) => {
            return cache.addAll(['/pig-gif.gif', '/index.html']);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('activate------');
});

self.addEventListener('fetch', function(event) {
    console.log('event:fetch', event);
    console.log('event.request.url', event.request.url);
    const url = new URL(event.request.url);
    if (url.origin === location.origin) {
        if (url.pathname === '/pig.jpg') {
            event.respondWith(caches.match('/pig-gif.gif'));
        }
        if (url.pathname === '/') {
            event.respondWith(caches.match('/index.html'));
        }
    }
});
