self.addEventListener('install', function(event) {
    console.log('install------');
    event.waitUntil(
        caches.open('cache').then((cache) => {
            return cache.add('./offline.html');
        })
    );
});

// self.addEventListener('fetch');