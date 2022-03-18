<script>
export let routes
export let onFail

import Router from 'svelte-spa-router'
</script>

<main class="uk-container uk-container-xsmall">

  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-center">
      <a href="#/" class="uk-navbar-item uk-logo">Goal Tracker</a>
    </div>
    <div class="uk-navbar-right">
      <div class="uk-navbar-nav">
        <li><a href="#/settings" uk-icon="cog"><span class="sr-only">Settings</span></a></li>
      </div>
    </div>
  </nav>

  <Router {routes} on:conditionsFailed={onFail} />
</main>
