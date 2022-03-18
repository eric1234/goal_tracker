<script>
import { onMount, onDestroy } from 'svelte'
import { sortBy, keyBy, uniq } from 'lodash'
import { DateTime } from 'luxon'

import db, { feed, cancel } from './db'
import { meanByInGroupBy } from './util'
import Grade from './report/Grade.svelte'

export let params

$: today = DateTime.fromISO(params.day)
$: yesterday = today.minus({day: 1}).toISODate()
$: tomorrow = today.plus({day: 1}).toISODate()
$: sevenAgo = today.minus({week: 1}).toISODate()
$: fourteenAgo = today.minus({weeks: 2}).toISODate()

function goalIdFromGrade(grade) { return grade._id.split('/').pop() }
function newGrade(goal) {
  return {
    _id: `grade/${params.day}/${goal._id}`,
    value: null,
  }
}

let goals = {}
$: goalCount = Object.values(goals).length
onMount(()=> feed({ type: 'goal', active: true }, results => goals = keyBy(results, '_id')))

let existingGrades = []
$: feed({_id: { $regex: `^grade/${params.day}` }}, (results => existingGrades = results), 'grades')

$: existingGoals = uniq(existingGrades.map(e => goalIdFromGrade(e)))
$: missingGoals = Object.values(goals).filter(g => !existingGoals.includes(g._id))
$: missingGrades = missingGoals.map(g => newGrade(g))
$: grades = sortBy(existingGrades.concat(missingGrades), grade => goals[goalIdFromGrade(grade)]?.name)

function avgBetween(queryId, startDate, endDate, callback) {
  feed(
    { _id: { $gte: `grade/${startDate}`, $lt: `grade/${endDate}` } },
    (results => callback(meanByInGroupBy(results, (grade => goalIdFromGrade(grade)), 'value', 1))),
    queryId
  )
}

let avgLastSeven = {}
$: avgBetween('lastSeven', sevenAgo, tomorrow, avg => avgLastSeven = avg)

let avgPreviousSeven = {}
$: avgBetween('previousSeven', fourteenAgo, sevenAgo, avg => avgPreviousSeven = avg)

onDestroy(cancel)
</script>

<ul class="uk-subnav uk-flex uk-flex-between">
  <li><a href={`#/${yesterday}`} uk-icon="icon: chevron-double-left"><span class="sr-only">Yesterday</span></a></li>
  <li>{params.day}</li>
  <li><a href={`#/${tomorrow}`} uk-icon="icon: chevron-double-right"><span class="sr-only">Tomorrow</span></a></li>
</ul>

{#if goalCount > 0}
  <form class="uk-form-stacked uk-margin">
    {#each grades as grade (grade._id)}
      <Grade {grade}
        goal={goals[goalIdFromGrade(grade)]}
        avgLastSeven={avgLastSeven[goalIdFromGrade(grade)]}
        avgPreviousSeven={avgPreviousSeven[goalIdFromGrade(grade)]} />
    {/each}

    {#if grades.length == 0}
      <p>No goals configured. Click cog icon to configure.</p>
    {/if}
  </form>
{/if}
