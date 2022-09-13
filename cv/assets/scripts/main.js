// This script should be optional, and critical parts of the page should work without it

class OnLoadHandler {
  constructor() {
    let handled = false
    let timer = undefined

    const handleOnce = () => {
      if (!handled) {
        handled = true

        window.clearTimeout(timer)
        this.handle()
      }
    }

    window.addEventListener('load', handleOnce)
    timer = window.setTimeout(handleOnce, 3500) // used as a fallback
  }

  handle() {
    document.body.classList.remove('loading')
  }
}

new OnLoadHandler()
