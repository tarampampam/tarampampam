export class Typer {
  /** @type HTMLElement */
  node;

  /** @param {HTMLElement} node  */
  constructor(node) {
    this.node = node
  }

  /**
   * @param {Number} speed Less is faster
   *
   * @returns {Promise<void>}
   */
  clear(speed = 50) {
    return new Promise((resolve) => {
      const len = this.node.innerText.length

      if (len === 0) {
        return resolve()
      }

      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          this.node.textContent = this.node.textContent.slice(0, -1)

          if (i === len - 1) {
            resolve()
          }
        }, speed * i)
      }
    })
  }

  /**
   * @param {String} text
   * @param {Number} speed Less is faster
   *
   * @returns {Promise<void>}
   */
  write(text, speed = 50) {
    return new Promise((resolve) => {
      const len = text.length

      if (len === 0) {
        return resolve()
      }

      for (let i = 0; i < len; i++) {
        setTimeout(() => {
          this.node.textContent += text.charAt(i)

          if (i === len - 1) {
            resolve()
          }
        }, speed * i)
      }
    })
  }
}

export class Locker {
  locked = false;

  /** @param {Function} fn */
  async do(fn) {
    if (this.locked) {
      return
    }

    this.locked = true

    try {
      await fn()
    } finally {
      this.locked = false
    }
  }
}

export class Notify {
  /**
   * @param {String} title
   * @param {String} message
   * @param {Number|false} timeout
   */
  static success(title, message = '', timeout = 5000) {
    iziToast.success({ title, message, timeout })
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {Number|false} timeout
   */
  static error(title, message = '', timeout = 5000) {
    iziToast.error({ title, message, timeout })
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {Number|false} timeout
   */
  static warning(title, message = '', timeout = 5000) {
    iziToast.warning({ title, message, timeout })
  }
}

/** @param {Number} delay */
export async function pause(delay = 100) {
  await new Promise((resolve) => window.setTimeout(resolve, delay))
}
