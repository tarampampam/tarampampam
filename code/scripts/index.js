/** @type {HTMLPictureElement} */
const logo = document.getElementById('logo')
/** @type {HTMLDivElement} */
const state = document.getElementById('state')
/** @type {HTMLInputElement} */
const sw = document.getElementById('state-switch')

const hiddenClass = 'hidden'

logo.addEventListener('dblclick', async (e) => {
  try {
    if (state.classList.contains(hiddenClass)) {
      const status = (await (await fetch('vm')).json()).status

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
      await fetch('vm/on', { method: 'POST' })
    } else {
      await fetch('vm/off', { method: 'POST' })
    }

    window.setTimeout(state.classList.toggle(hiddenClass), 1500)
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.toString() })
  }
}, false)
