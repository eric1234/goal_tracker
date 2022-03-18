import { wrap } from 'svelte-spa-router/wrap'
import { replace } from 'svelte-spa-router'
import { DateTime } from 'luxon'

import './theme.scss'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
UIkit.use(Icons)

import App from './App.svelte'
import Report from './Report.svelte'
import Settings from './Settings.svelte'

// Setup global event handlers to catch any errors or uncaught promises and
// display to user. The user may not know why or how to fix it but they know
// something went wrong and at least know to be cautious and has something to
// report.
//
// Both handlers to do not call `preventDefault` as we want the original
// error to still log in the console with a stacktrace so we can debug.
window.addEventListener('error', event => alert(event.message))
window.onunhandledrejection = event => alert(`Unhandled error in async call: ${event.reason}`)

const routes = {
  '/settings': Settings,
  '/:day': Report,
  '/': wrap({
    component: {},
    conditions: [_ => false]
  }),
}

function onRouteFail(event) {
  if( event.detail.route == '/' ) {
    const yesterday = DateTime.now().minus({day: 1}).toISODate()
    replace(`/${yesterday}`)
  }
}

export default new App({
  target: document.body,
  props: { routes, onFail: onRouteFail }
})
