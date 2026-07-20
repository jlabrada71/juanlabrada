window.jl = window.js || {}

function getCookie (cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (const c of ca) {
    const cookie = c.trim()
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return ''
}

function setCookie (cname, cvalue, exdays = 100) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString() + ';'
  const newCookie = cname + '=' + cvalue + ';' + expires + ';path=/;' + 'domain=juanlabrada.com;samesite=strict;secure;'
  document.cookie = newCookie
}

function getUserId () {
  const userId = getCookie('jl_userId')
  if (userId) {
    return userId
  }
  const newUserId = crypto.randomUUID();
  setCookie('jl_userId', newUserId)
  return newUserId
}

window.jl.sendAnalytics = (url, data) => {
  const now = new Date()
  data.userId = getUserId();
  data.ts = now.getTime();
  data.timeStamp = now.toString();
  const body = JSON.stringify(data);
  (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
  fetch(url, { body, method: 'POST', keepalive: true })
}

let hidden, visibilityChange
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
}

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange () {
  const data = { visibilityHidden: document.visibilityState || document[hidden] }

  if (document.visibilityState === 'hidden' || document[hidden]) {
    data.name = 'performance'
    data.timeOrigin = window.performance.timeOrigin
    data.perfEntries = performance.getEntriesByType('navigation')
  }
  const analyticsUrl = getCookie('jl_analytics')
  window.jl.sendAnalytics(analyticsUrl, data)
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
  console.log('This requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
} else {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false)
}
