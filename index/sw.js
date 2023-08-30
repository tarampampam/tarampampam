async function handleFetch(request) {
  try { // perform the original fetch request and store the result in order to modify the response
    var r = await fetch(request)
  } catch (e) {
    console.error(e)
  }

  if (r.status === 0) {
    return r
  }

  // we add headers to the original response its headers, in order to enable cross-origin-isolation.
  // and make it independent of the server config
  const newHeaders = new Headers(r.headers)

  // COEP & COOP for cross-origin-isolation
  newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp')
  newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin')
  newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin')

  /**
   * This workaround is necessary due to a limitation of CheerpOS, which relies on the response URL being
   * set to the resolved URL.
   * When constructing a new response object, the URL is not set by the Response() constructor and the
   * serviceworker respondwith() method will set the url to event.request.url in case of an empty string.
   * To address this, we set the location URL to the resolved response URL and set the status code to 301
   * in the new Response object.
   * This causes the request to bounce back to the serviceworker from Cheerpos, with the event.request.url
   * now set to the resolved URL, which allows the respondWith method to properly set the response URL in
   * our new response.
   * https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith.
  */
  if (r.redirected === true) {
    newHeaders.set('location', r.url)
  }

  // in case of a redirection, we set the status to 301, and body to null, in order to not transfer too
  // much data needlessly
  const moddedResponse = new Response(r.redirected === true ? null : r.body, {
    headers: newHeaders,
    status: r.redirected === true ? 301 : r.status,
    statusText: r.statusText,
  })

  return moddedResponse
}

function serviceWorkerInit() {
  // init the service worker
  self.addEventListener('install', () => self.skipWaiting())
  self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))

  // listen for fetch requests and call handleFetch function.
  self.addEventListener('fetch', function (e) {
    try {
      e.respondWith(handleFetch(e.request))
    } catch (err) {
      console.log('ServiceWorker NetworkError:' + err)
    }
  })
}

async function doRegister() {
  try {
    const registration = await navigator.serviceWorker.register(window.document.currentScript.src)

    // EventListener to make sure that the page gets reloaded when a new serviceworker gets installed.
    // f.e on first access.
    registration.addEventListener('updatefound', () => {
      try {
        window.location.reload()
      } catch (err) {
        console.log('Service Worker failed reloading the page. ERROR:' + err)
      }
    })

    // when the registration is active, but it's not controlling the page, we reload the page to have it
    // take control.
    // This f.e occurs when you hard-reload (shift + refresh).
    // https://www.w3.org/TR/service-workers/#navigator-service-worker-controller
    if (registration.active && !navigator.serviceWorker.controller) {
      try {
        window.location.reload()
      } catch (err) {
        console.log('Service Worker failed reloading the page. ERROR:' + err)
      }
    }
  } catch {
    console.error('Service Worker failed to register:', e)
  }
}

async function serviceWorkerRegister() {
  if (window.crossOriginIsolated) {
    return
  }

  if (!window.isSecureContext) {
    console.log('Service Worker not registered, a secure context is required.')

    return
  }

  // register the service worker and reload the page to transfer control to the serviceworker.
  if ('serviceWorker' in navigator) {
    await doRegister()
  } else {
    console.log('Service worker is not supported in this browser')
  }
}

if (typeof window === 'undefined') { // if the script is running in a Service Worker context
  serviceWorkerInit()
} else { // if the script is running in the browser context
  serviceWorkerRegister()
}
