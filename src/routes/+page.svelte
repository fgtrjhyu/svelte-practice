<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import Root from './Root.svelte'

  class DefaultModel {
    constructor() {
      this.catalogue = {}
      this.subject = {
        requests: []
      }
    }
  }

  let model = new DefaultModel();

  const update = {
    loadModelFromLocalStorage: function() {
      const json = localStorage.getItem("model")
      if (json) {
        model = JSON.parse(json) || new DefaultModel();
      }
    },
    saveModelToLocalStorage: function() {
      localStorage.setItem("model", JSON.stringify(model))
    },
    removeModelFromLocalStorage: function() {
      localStorage.removeItem("model")
      model = new DefaultModel();
    },
    setModel(newModel) {
      model = newModel
    },
    updateCatalogue(catalogue) {
      return { ...model, catalogue }
    },
    updateSubject(subject) {
      const newModel = { ...model, subject }
      return newModel
    },
    updateEntryOnCatalogue(entry) {
      const newCatalogue = Object.fromEntries(
        Object.entries(model.catalogue || {}).concat( [ [ entry.name, entry ] ] )
      )
      return this.updateCatalogue(newCatalogue)
    },
    updateRequests(requests) {
      const oldSubject = model.subject || {}
      const newSubject = { ...oldSubject, requests }
      return this.updateSubject(newSubject)
    },
    addRequestToRequestsOnSubject(application) {
      const oldSubject = model.subject || {}
      const oldRequests = oldSubject.requests || []
      const newRequest = { application: application.name }
      const newRequests = [ ...oldRequests, newRequest ]
      return this.updateRequests(newRequests)
    },
    removeRequestAtRequestsOnSubject(position) {
      const oldRequests = model.subject.requests
      const newRequests = oldRequests.toSpliced(position, 1)
      return this.updateRequests(newRequests)
    }
  }

  onMount( () => {
    if (browser) {
      update.loadModelFromLocalStorage()
    }
  });

</script>

<div>
  <button onclick={update.loadModelFromLocalStorage}>load</button>
  <button onclick={update.saveModelToLocalStorage}>save</button>
  <button onclick={update.removeModelFromLocalStorage}>remove</button>
</div>

{#if model != null}
  <Root model={model} update={update}/>
{:else}
  no model found
{/if}
