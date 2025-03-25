const CACHE_NAME = 'facepass-v1';

self.addEventListener("installButton", function (event) {
  event.waitUntil(
    caches.open("facepass-v1").then(function (cache) {
      return cache.addAll([
        "/",
        "/style.css",
        "/app.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open("facepass-v1").then(function (cache) {
      return cache.match(event.request).then(function (response) {
        cache.addAll([event.request.url]);

        if (response) {
          return response;
        }

        return fetch(event.request);
      });
    })
  );
});