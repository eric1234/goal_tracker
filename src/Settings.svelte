<script>
import { onMount, onDestroy } from 'svelte'

import db, { feed, cancel } from './db'
import Goal from './settings/Goal.svelte'
import NewGoal from './settings/NewGoal.svelte'

let goals = []

onMount(()=> {
  feed(
    {
      selector: { type: 'goal', active: true },
      sort: [{ name: 'asc' }],
    },
    results => goals = results
  )
})
onDestroy(cancel)
</script>

{#each goals as goal (goal._id)}
  <Goal {goal} />
{/each}
<NewGoal />
