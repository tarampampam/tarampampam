const d = document
const logo = d.getElementById('logo')
const state = d.getElementById('state')
const sw = d.getElementById('state-switch')
const hiddenClass = 'hidden'

logo.addEventListener('dblclick', async (e) => {
  if (e.ctrlKey) {
    if (state.classList.contains(hiddenClass)) {
      sw.checked = (await (await fetch('vm')).json()).status === 'running'
    }

    state.classList.toggle(hiddenClass)
  }
}, false)

sw.addEventListener('change', async (e) => {
  if (sw.checked) {
    await fetch('vm/on', { method: 'POST' })
  } else {
    await fetch('vm/off', { method: 'POST' })
  }

  window.setTimeout(state.classList.toggle(hiddenClass), 1500)
})

window.turnstileLoaded = () => {
  turnstile.render('#turnstile', {
    sitekey: '0x4AAAAAAAJwE0fGOLs_7cZ0',
    callback: function (token) {
      console.log(`Challenge Success ${token}`)
    },
  })
}
