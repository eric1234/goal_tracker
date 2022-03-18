<script>
import Show from './goal/Show.svelte'
import Edit from './goal/Edit.svelte'

export let goal

let edit = false
function toggle() { edit = !edit }
</script>

<div class="uk-card uk-card-default uk-card-body uk-margin">
  {#if edit}
    <Edit {goal} on:toggle={toggle} />
  {:else}
    <Show {goal} on:toggle={toggle} />
  {/if}
</div>
