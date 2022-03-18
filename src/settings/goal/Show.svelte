<script>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

export let goal
</script>

<h3 class="uk-card-title uk-flex uk-flex-between">
  {goal.name}

  <div class="uk-text-nowrap uk-margin-left">
    <button
      on:click={_ => dispatch('toggle')}
      class="uk-icon-button uk-button-primary" uk-icon="pencil">
    </button>
  </div>
</h3>

<div style="white-space: pre-wrap">{goal.description}</div>
