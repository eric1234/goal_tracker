<script>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

import db from '../../db'

export let goal

async function save() {
  await db.put(goal)
  dispatch('toggle')
}

function remove() { db.put(Object.assign({}, goal, { active: false })) }
</script>

<h3 class="uk-card-title uk-flex uk-flex-between">
  <input class="uk-input" type="text" title="Goal name" bind:value={goal.name} />

  <div class="uk-text-nowrap uk-margin-left">
    <button
      on:click={save}
      class="uk-icon-button uk-button-primary" uk-icon="check">
    </button>
    <button
      on:click={remove}
      class="uk-icon-button uk-button-danger" uk-icon="trash">
    </button>
  </div>
</h3>

<textarea class="uk-textarea uk-height-small" title="Goal description" bind:value={goal.description}></textarea>
