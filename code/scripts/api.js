export default class API {
  key = '';
  baseUri = '';

  /** @param {String} key */
  setKey(key) {
    if (key) {
      this.key = key
    }
  }

  /** @returns {Promise<'starting'|'running'|'stopping'|'off'>} */
  async getStatus() {
    // const fakes = ['starting', 'running', 'stopping', 'off']
    // return fakes[Math.floor(Math.random() * fakes.length)]

    const resp = await fetch(`${this.baseUri}vm`)

    if (resp.status !== 200) {
      throw await this.handleError(resp)
    }

    return (await resp.json()).status
  }

  /** @returns {Promise<void>} */
  async on() {
    const resp = await fetch(`${this.baseUri}vm/on`, { method: 'POST', headers: { 'X-Key': this.key } })

    if (resp.status !== 200) {
      throw await this.handleError(resp)
    }
  }

  /** @returns {Promise<void>} */
  async off() {
    const resp = await fetch(`${this.baseUri}vm/off`, { method: 'POST', headers: { 'X-Key': this.key } })

    if (resp.status !== 200) {
      throw await this.handleError(resp)
    }
  }

  /**
   * @type {Response} resp
   * @returns {Promise<Error>}
   */
  async handleError(resp) {
    try {
      const j = await resp.clone().json()

      if ('error' in j && typeof j.error === 'string') {
        return new Error(j.error)
      }
    } catch {
      return new Error(await resp.text())
    }

    return new Error('Unknown error')
  }
}
