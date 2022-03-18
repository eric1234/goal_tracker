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

const routes = {
  '/settings': Settings,
  '/:day': Report,
  '/': wrap({
    component: {},
    conditions: [_ => false]
  }),
}

function onFail(event) {
  if( event.detail.route == '/' ) {
    const yesterday = DateTime.now().minus({day: 1}).toISODate()
    replace(`/${yesterday}`)
  }
}

export default new App({
  target: document.body,
  props: { routes, onFail }
})
