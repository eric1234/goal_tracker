<script>
import db from '../db'
import { fail } from '../util'

function newRecord() {
  return {
    name: '',
    description: '',
    active: true,
    type: 'goal',
  }
}

let newGoal = newRecord()

async function addGoal() {
  try {
    await db.post(newGoal)
    newGoal = newRecord()
  } catch(e) { fail(e) }
}
</script>

<div class="uk-card uk-card-default uk-card-body uk-margin">
  <h3 class="uk-card-title">New Goal</h3>

  <form class="uk-form-stacked">
    <div>
      <label class="uk-form-label" for="new_name">Name</label>
      <div class="uk-form-controls">
        <input id="new_name" type="text" class="uk-input" bind:value={newGoal.name} />
      </div>
    </div>

    <div>
      <label class="uk-form-label" for="new_description">Description</label>
      <div class="uk-form-controls">
        <textarea id="new_description" class="uk-textarea uk-height-small" bind:value={newGoal.description}></textarea>
      </div>
    </div>

    <div class="uk-flex uk-flex-right uk-margin">
      <button
        class="uk-button uk-button-primary"
        on:click|preventDefault={addGoal} type="submit">
        Add
      </button>
    </div>
  </form>
</div>
