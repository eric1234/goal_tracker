import PouchDB from 'pouchdb'
import FindPlugin from 'pouchdb-find'
import LiveFindPlugin from 'pouchdb-live-find'

PouchDB.plugin(FindPlugin)
PouchDB.plugin(LiveFindPlugin)

import { fail } from './util'

const db = new PouchDB('tracker')
export default db

let activeFeeds = {}

export async function feed(selectorOrOptions, callback, queryId=null) {
  try {
    if( !queryId ) queryId = `query_${Object.keys(activeFeeds).length}`

    if( activeFeeds[queryId] ) {
      callback([])
      activeFeeds[queryId].cancel()
    }

    if( !selectorOrOptions.selector )
      selectorOrOptions = { selector: selectorOrOptions }

    const fields = Object.keys(selectorOrOptions.selector)
    if( fields != ['_id'] ) await db.createIndex({ index: { fields } })

    activeFeeds[queryId] = db
      .liveFind(Object.assign(selectorOrOptions, { aggregate: true }))
      .on('update', (_, results) => callback(results))

    // Wait for initial results so we can catch errors
    await activeFeeds[queryId]

    return activeFeeds[queryId]
  } catch(e) { fail(e) }
}

export function cancel() {
  Object.values(activeFeeds).forEach(feed => feed.cancel())
  activeFeeds = {}
}
