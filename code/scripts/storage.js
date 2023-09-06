/** @template {*} T */
export default class Storage {
  /** @type {String} */
  key;

  /** @param {String} key */
  constructor(key) {
    this.key = key
  }

  /** @param {T} value  */
  set(value) {
    try {
      localStorage.setItem(this.key, easyStringEncode(JSON.stringify(value)))
    } catch (err) {
      console.warn('Local storage is not available', err)
    }
  }

  /** @returns {T|undefined} */
  get() {
    let item = null

    try {
      item = localStorage.getItem(this.key)
    } catch (err) {
      console.warn('Local storage is not available', err)

      return undefined
    }

    if (item) {
      return JSON.parse(easyStringDecode(item))
    }

    return undefined
  }

  remove() {
    try {
      localStorage.removeItem(this.key)
    } catch (err) {
      console.warn('Local storage is not available', err)
    }
  }
}

/**
 * Encode a string to mask the value. To decode, use easyStringDecode().
 *
 * Note: This is NOT cryptographically secure. It is only meant to obfuscate the string.
 *
 * @param {String} str
 * @returns {String}
 */
export function easyStringEncode(str) {
  return window.btoa(encodeURIComponent(str)).replace(/=/g, '-').split('').reverse().join('')
}

/**
 * Decode a string encoded with easyStringEncode().
 *
 * @param {String} str
 * @returns {String}
 *
 * @throws {Error} If the string is not encoded properly
 */
export function easyStringDecode(str) {
  return decodeURIComponent(window.atob(str.split('').reverse().join('').replace(/-/g, '=')))
}
