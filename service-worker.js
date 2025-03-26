const CACHE_NAME = 'facepass-v1';
const FILES_TO_CACHE = [
  "/",
  "/style.css",
  "/app.js",
];

// Instalando e salvando arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // Ativa o novo SW imediatamente
});

// Ativando e limpando caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Garante que o novo SW assuma o controle imediato
});

// Interceptando requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Retorna do cache se disponível
      }

      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // Salva a resposta no cache
          return response;
        });
      }).catch(() => {
        return caches.match("/"); // Se falhar, retorna a página inicial
      });
    })
  );
});