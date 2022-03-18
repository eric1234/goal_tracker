import { meanBy, groupBy, round } from 'lodash'

export function meanByInGroupBy(collection, groupIterator, meanIterator, precision=0) {
  const grouped = groupBy(collection, groupIterator)
  Object.keys(grouped).forEach(groupName => {
    grouped[groupName] = round(meanBy(grouped[groupName], meanIterator), precision)
  })
  return grouped
}
