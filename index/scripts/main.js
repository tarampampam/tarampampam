if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .catch(console.error)
}
