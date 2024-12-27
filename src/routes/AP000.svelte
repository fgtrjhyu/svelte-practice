<script>
  const { self, header } = $props()
</script>

<div class="header">
  {@render header()}
</div>

<div class="body">
  <label>
    text: <input type="text" value={self.text} required minlength="3" maxlength="10">
  </label>
</div>

<style>
div.header {
  padding: 4px;
  margin: 4px;
}

div.body {
  padding: 4px;
  margin: 4px;
}

input:invalid {
  border: 1px solid red;
}
</style>
