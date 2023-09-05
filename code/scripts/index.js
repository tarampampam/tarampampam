let turnstileToken = null

window.turnstileLoaded = () => {
  turnstile.render('#tt', {
    sitekey: '0x4AAAAAAAJwE0fGOLs_7cZ0',
    appearance: 'interaction-only',
    callback: (token) => { turnstileToken = token },
  })
}

const d = document
const logo = d.getElementById('logo')
const state = d.getElementById('state')
const sw = d.getElementById('state-switch')
const hiddenClass = 'hidden'

logo.addEventListener('dblclick', async (e) => {
  try {
    if (state.classList.contains(hiddenClass)) {
      sw.checked = (await (await fetch('vm', {
        method: 'POST',
        body: JSON.stringify({ token: turnstileToken })
      })).json()).status === 'running'
    }

    state.classList.toggle(hiddenClass)
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: err.toString(),
    })
  }
}, false)

sw.addEventListener('change', async (e) => {
  if (sw.checked) {
    await fetch('vm/on', { method: 'POST', body: JSON.stringify({ token: turnstileToken }) })
  } else {
    await fetch('vm/off', { method: 'POST', body: JSON.stringify({ token: turnstileToken }) })
  }

  window.setTimeout(state.classList.toggle(hiddenClass), 1500)
})


