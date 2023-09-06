import { Typer, Locker, Notify, pause } from './tools.js'
import API from './api.js'
import Storage from './storage.js'

const api = new API()

/** @type Storage<string> */
const keyStorage = new Storage('key')

// set auth key if it exists
api.setKey(keyStorage.get())

/** @type {'starting'|'running'|'stopping'|'off'|null} */
let serverStatus = null

{ // start server status updating loop
  let reqCounter = 0
  /** @type {Number|null} */
  let statusTimer = null
  let locker = new Locker()

  const updateServerStatus = async () => {
    await locker.do(async () => {
      try {
        serverStatus = await api.getStatus()
      } catch (err) {
        Notify.error('Error', err.toString())

        serverStatus = '(╯°□°）╯︵ ┻━┻'
      } finally {
        if (reqCounter++ >= 100) {
          if (statusTimer) {
            clearInterval(statusTimer)

            Notify.warning('Status updates have been stopped', 'Refresh this page to resume', false)
          }
        }
      }
    })
  }

  statusTimer = setInterval(async () => {
    if (!document.hidden) {
      updateServerStatus()
    }
  }, 3500) // update status every 3.5 seconds

  updateServerStatus() // update the status immediately
}

/** @type {String|null} */
let lastServerStatus = null

// initialize elements
const elements = {
  logo: {
    pre: document.querySelector('.text-logo .pre'),
    post: document.querySelector('.text-logo .post'),
  },
  state: {
    self: document.querySelector('.state'),
    pre: document.querySelector('.state .pre'),
    post: document.querySelector('.state .post'),
  },
  act: {
    self: document.querySelector('.actions'),
    auth: document.querySelector('.actions .action.auth'),
    on: document.querySelector('.actions .action.on'),
    off: document.querySelector('.actions .action.off'),
  },
}

// attach event listener for auth key changing
elements.act.auth.addEventListener('click', async () => {
  const key = prompt('Enter auth key')

  if (key) {
    Notify.success('Success', 'Auth key is changed')

    keyStorage.set(key)
    api.setKey(key)
  } else {
    if (keyStorage.get()) {
      Notify.warning('Warning', 'Auth key is not changed')
    } else {
      Notify.error('Error', 'Auth key is required')
    }
  }
})

// attach event listener for server power on action
elements.act.on.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('disabled')) {
    try {
      await api.on()

      Notify.success('Success', 'Server is starting')
      e.target.classList.add('disabled')
    } catch (err) {
      Notify.error('Error', err.toString())
    }
  }
})

// attach event listener for server power off action
elements.act.off.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('disabled')) {
    try {
      await api.off()

      Notify.success('Success', 'Server is stopping')
      e.target.classList.add('disabled')
    } catch (err) {
      Notify.error('Error', err.toString())
    }
  }
})

// start typing animation
new Typer(elements.logo.pre)
  .write('Code', 100)
  .then(async () => {
    await pause(170)

    new Typer(elements.logo.post).write('Space', 80)
      .then(async () => {
        await pause(170)

        elements.state.self.classList.remove('hidden')

        new Typer(elements.state.pre).write('The server is')
          .then(() => {
            const st = new Typer(elements.state.post)
            let locker = new Locker()

            // watch for server status changes
            setInterval(async () => {
              await locker.do(async () => {
                if (!serverStatus) {
                  return
                }

                if (lastServerStatus === serverStatus) {
                  return
                }

                await st.clear()
                await st.write(serverStatus)

                lastServerStatus = serverStatus

                const hasAuth = typeof keyStorage.get() === 'string'

                switch (serverStatus) {
                  case 'starting':
                    elements.act.self.classList.remove('hidden')
                    elements.act.on.classList.add('disabled')
                    elements.act.off.classList.add('disabled')
                    break

                  case 'running':
                    elements.act.self.classList.remove('hidden')
                    elements.act.on.classList.add('disabled')
                    if (hasAuth) {
                      elements.act.off.classList.remove('disabled')
                    }
                    break

                  case 'stopping':
                    elements.act.self.classList.remove('hidden')
                    elements.act.on.classList.add('disabled')
                    elements.act.off.classList.add('disabled')
                    break

                  case 'off':
                    elements.act.self.classList.remove('hidden')
                    if (hasAuth) {
                      elements.act.on.classList.remove('disabled')
                    }
                    elements.act.off.classList.add('disabled')
                    break

                  default:
                    elements.act.self.classList.add('hidden')
                    elements.act.off.classList.add('disabled')
                    elements.act.on.classList.add('disabled')
                    break
                }
              })
            }, 200)
          })
      })
  })

