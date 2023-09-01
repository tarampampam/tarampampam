const cacheName = 'cache-v1'
const imageRegex = /disk\/\w+\.bin$/
const crapToCache = [
  imageRegex,
  /assets\/.+$/,
  /favicon\.ico$/,
  /^https:\/\/cdn\.jsdelivr\.net\/[^\s]+$/,
  /^https:\/\/cdnjs\.cloudflare\.com\/[^\s]+$/,
  /^https:\/\/fonts\.(gstatic|googleapis)\.com\/[^\s]+$/,
  /^https:\/\/cheerpxdemos\.leaningtech\.com\/publicdeploy\/[^\s]+\.(js|wasm)/,
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
        .then((resp) => {
          if (resp.status === 0) {
            return resp
          }

          // we only want to modify the response if it is not from the same origin
          if (self.location.hostname !== new URL(resp.url).hostname) {
            return resp
          }

          // we add headers to the original response its headers, in order to enable cross-origin-isolation.
          // and make it independent of the server config
          const newHeaders = new Headers(resp.headers)

          // COEP & COOP for cross-origin-isolation
          newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')
          newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
          newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin')

          // this workaround is necessary due to a limitation of CheerpOS, which relies on the response URL
          // being set to the resolved URL.
          // when constructing a new response object, the URL is not set by the Response() constructor and
          // the service worker respondwith() method will set the url to event.request.url in case of an
          // empty string. to address this, we set the location URL to the resolved response URL and set the
          // status code to 301 in the new Response object.
          // this causes the request to bounce back to the service worker from CheerpOS, with the
          // event.request.url now set to the resolved URL, which allows the respondWith method to properly
          // set the response URL in our new response
          if (resp.redirected === true) {
            newHeaders.set('location', resp.url)
          }

          return new Response(resp.redirected === true ? null : resp.body, {
            headers: newHeaders,
            status: resp.redirected === true ? 301 : resp.status,
            statusText: resp.statusText,
          })
        })
        // workaround for the disk image (Content-Range functionality)
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range
        .then(async (resp) => {
          if (!imageRegex.test(event.request.url)) {
            return resp
          }

          const requestedRange = String(event.request.headers.get('range'))
          if (!requestedRange) {
            return resp
          }

          const matches = requestedRange.match(/^(\w+)=(\d+)-((\d+)|\*)$/)
          if (!matches) {
            return resp
          }

          const body = await resp.blob()

          const [, unit, start, end] = matches
          const range = {
            unit,
            start: start != null ? Math.max(0, Number(start)) : null,
            end: end != null ? Math.min(Number(end), body.size) : null,
          }

          const responseData = body.slice(range.start, range.end+1, 'blob')

          console.debug('requested range:', requestedRange)
          console.debug('responded range:', `${range.unit} ${range.start}-${range.end}/${body.size}`)
          console.debug('responded data:', responseData)

          const newHeaders = new Headers(resp.headers)

          newHeaders.set('Content-Range', `${range.unit} ${range.start}-${range.end}/${body.size}`)

          return new Response(responseData, {
            headers: newHeaders,
            status: 206,
            statusText: "206 Partial Content",
          })
        })
    )
  }
})
