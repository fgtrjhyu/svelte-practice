<script>
  import Subject from './Subject.svelte'

  const { model, update } = $props()

  function checkUniqueCatalogueName(event) {
    const catalogue = model.catalogue || {};
    const value = event.target.value.toUpperCase()
    const existent = catalogue[value]
    if (existent) {
      event.target.setCustomValidity(`${value} is already exists.`)
    } else {
      event.target.setCustomValidity('')
    }
  }

  function addCatalogue(event) {
    const form = event.target.form
    const name = form.name;
    if (name.checkValidity()) {
      const value = name.value.toUpperCase()
      const entry = { name: value }
      const model = update.updateEntryOnCatalogue(entry)
      update.setModel(model)
    }
  }

  function addRequest(app) {
    return function() {
      const newModel = update.addRequestToRequestsOnSubject(app)
      update.setModel(newModel)
    }
  }
</script>

<h1>AppRoot</h1>
<div class="grid-container"> 
  <div class="grid-cell">
    <div>Application Catalogue</div>
    {#each Object.values(model.catalogue || {}) as item}
      <div class="btn-container">
        {#if model.subject.requests.length < 5 }
          <button onclick={addRequest(item)}>{item.name}</button>
        {:else}
          <button disabled>{item.name}</button>
        {/if}
      </div>
    {/each}
    <form>
      <div id="add-catalogue">
        <div>
          <label>
            name
            <input name="name" required maxlength="5" pattern="[A-Za-z][A-Za-z]\d\d\d" autocomplete="off" oninput={checkUniqueCatalogueName}>
          </label>
        </div>
        <div style="text-align: right;">
          <button onclick={addCatalogue}>add</button>
        </div>
      </div>
    </form>
  </div>
  <div class="grid-cell">
    { model.subject.requests.length }
    <Subject self={model.subject} update={update} />
  </div>
</div>

<style>
div.grid-container {
  display: grid;
  grid-template-columns: 1fr 6fr;
  border: 1px solid green;
  margin: 4px;
  padding: 4px;
}
div.grid-cell {
  border: 1px solid blue;
  margin: 4px; padding: 4px;
}
div#add-catalogue {
  display: grid;
  grid-template-columns: 2fr 1fr;
  border: 1px solid green;
  margin: 4px;
  padding: 4px;
}
div#add-catalogue input {
  width: 5em;
  margin: 4px;
  padding: 8px;
}
div#add-catalogue button {
  margin: 4px;
  padding: 8px;
  height: 80%;
}
div.btn-container {
  margin: 4px;
  padding: 4px;
}
div.btn-container button {
  width: 100%;
  margin: 0px;
  padding: 8px;
}
</style>
