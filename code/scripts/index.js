/** @type {String|null} */
let turnstileToken = null
const hiddenClass = 'hidden'

window.turnstileLoaded = () => {
  try {
    turnstile.render('#tt', {
      sitekey: '0x4AAAAAAAJwE0fGOLs_7cZ0',
      appearance: 'interaction-only',
      callback: (token) => { turnstileToken = token },
    })
  } catch (err) {
    iziToast.error({ title: 'Turnstile error', message: err.toString() })
  }

  /** @type {HTMLPictureElement} */
  const logo = document.getElementById('logo')
  /** @type {HTMLDivElement} */
  const state = document.getElementById('state')
  /** @type {HTMLInputElement} */
  const sw = document.getElementById('state-switch')

  logo.addEventListener('dblclick', async (e) => {
    try {
      if (state.classList.contains(hiddenClass)) {
        const status = (await (await fetch('vm', {
          headers: { 'X-Tt': turnstileToken },
        })).json()).status

        console.log(status)

        sw.checked = status === 'running'
      }

      state.classList.toggle(hiddenClass)
    } catch (err) {
      iziToast.error({ title: 'Error', message: err.toString() })
    }
  }, false)

  sw.addEventListener('change', async (e) => {
    try {
      if (sw.checked) {
        await fetch('vm/on', { method: 'POST', headers: { 'X-Tt': turnstileToken } })
      } else {
        await fetch('vm/off', { method: 'POST', headers: { 'X-Tt': turnstileToken } })
      }

      window.setTimeout(state.classList.toggle(hiddenClass), 1500)
    } catch (err) {
      iziToast.error({ title: 'Error', message: err.toString() })
    }
  }, false)
}
