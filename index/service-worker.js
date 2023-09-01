const cacheName = 'cache-v1'

const crapToCache = [
  /assets\/.+$/,
  /favicon\.ico$/,
  /^https:\/\/cdn\.jsdelivr\.net\/[^\s]+$/,
  /^https:\/\/cdnjs\.cloudflare\.com\/[^\s]+$/,
  /^https:\/\/fonts\.(gstatic|googleapis)\.com\/[^\s]+$/,
]

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (String(event.request.method).toUpperCase() === 'GET') { // only for GET requests
    event.respondWith(
      caches.open(cacheName)
        .then(async (cache) => {
          const cached = await cache.match(event.request.url)
          if (cached) { // is in cache?
            return cached
          }

          const fetched = await fetch(event.request) // otherwise fetch

          if (crapToCache.some((re) => re.test(event.request.url))) { // needs to be cached?
            cache.put(event.request.url, fetched.clone())
          }

          return fetched
        })
    )
  }
})
