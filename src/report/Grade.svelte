<script>
import { range } from 'lodash'

import db from '../db'
import { fail } from '../util'

export let grade
export let goal
export let avgLastSeven
export let avgPreviousSeven

async function save(score) {
  try {
    await db.put(Object.assign(grade, { value: score }))
  } catch(e) { fail(e) }
}
</script>

<div>
  <label class="uk-form-label uk-text-bold" for="score">
    <div class="uk-flex uk-flex-between">
      {goal.name}

      <span>
        {#if avgLastSeven}
          <span class="uk-badge">Past Week Avg: {avgLastSeven}</span>
        {/if}

        {#if avgPreviousSeven}
          <span class="uk-badge">Previous Week Avg: {avgPreviousSeven}</span>
        {/if}
      </span>
    </div>
  </label>

  <div class="uk-form-controls" id="score">
    <div class="uk-text-muted" style="white-space: pre-wrap">{goal.description}</div>

    <div class="uk-flex uk-flex-between uk-margin">
      {#each range(11) as score}
        <label>
          <input
            type="radio" class="uk-radio"
            name={goal._id} value={score}
            bind:group={grade.value}
            on:input={_ => save(score)} />
          {score}
        </label>
      {/each}
    </div>
  </div>
</div>

<style>
.uk-badge { padding: 0.5rem }
</style>
