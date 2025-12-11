import { debug } from '@/lib/logger'

export function setCookie (cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString() + ';'
  const newCookie = cname + '=' + cvalue + ';' + expires + ';path=/;' + 'domain=juanlabrada.com;samesite=strict;secure;'
  debug('setting cookie: ' + newCookie)
  document.cookie = newCookie
}

export function getCookie (cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (const c of ca) {
    const cookie = c.trim()

    if (cookie.indexOf(name) === 0) {
      debug('getting cookie: ' + cookie, 'getCookie')
      return cookie.substring(name.length, cookie.length)
    }
  }
  return ''
}

export function set (name, value) {
  setCookie(name, value, 100)
}

export function get (name) {
  return getCookie(name)
}
