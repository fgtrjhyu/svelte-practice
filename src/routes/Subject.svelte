<script>
  const { self, update } = $props()

  function removeOnClick(index) {
    return function() {
      update.setModel(update.removeRequestAtRequestsOnSubject(index))
    }
  }

  function submitOnClick(event) {
    let ok = true;
    for(const input of Array.from(event.target.form)) {
      ok = ok & input.checkValidity()
    }
    if (ok) {
    }
  }
</script>

<form>
  {#each self.requests as request, index}
    {#await import(/* @vite-ignore */ `./${request.application}.svelte`)}
      <p>wait</p>
    {:then module}
      <div class="request">
        <div class="body">
          <div>
            <module.default self={request} update={update}>
              {#snippet header()}
                <div class="header">
                  <div>{ request.application }</div>
                  <div><button onclick={removeOnClick(index)}>remove</button></div>
                </div>
              {/snippet}
            </module.default>
          </div>
        </div>
      </div>
    {:catch error}
      <p>${error}</p>
    {/await}
  {/each}
  <div>
    {#if self.requests.length > 0}
      <button onclick={submitOnClick}>submit</button>
    {:else}
      <button disabled>submit</button>
    {/if}
  </div>
</form>

<style>
div.request {
  border: 1px solid gray;
  padding: 4px;
  margin: 4px;
}

div.header {
  border: 1px solid blue;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

div.header > :first-child {
  margin: 4px;
  padding: 4px;
}

div.header > :last-child {
  text-align: right;
  margin: 4px;
  padding: 4px;
}
div.request > div.body {
  border: 1px solid blue;
  grid-column-start: 2 span;
  margin: 4px;
  padding: 4px;
}
div.request > div.body > div {
  margin: 4px;
  padding: 4px;
}
button {
  margin: 4px;
  padding: 4px;
}
</style>
