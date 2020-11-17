const publicPath = '/servicewroker-demo/';

self.addEventListener('install', function(event) {
    console.log('install------');
    event.waitUntil(
        caches.open('static-v1').then((cache) => {
            return cache.addAll([`${publicPath}pig-gif.gif`, `${publicPath}index.html`]);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('activate------');
    clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('event:fetch', event);
    console.log('event.request.url', event.request.url);
    const url = new URL(event.request.url);
    if (url.origin === location.origin) {
        if (url.pathname.includes('pig.jpg')) {
            event.respondWith(caches.match(`${publicPath}pig-gif.gif`));
        }
        if (url.pathname === publicPath) {
            event.respondWith(caches.match(`${publicPath}index.html`));
        }
    }
});
