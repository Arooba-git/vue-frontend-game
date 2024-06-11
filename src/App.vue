<template>
  <router-view />
</template>

<script>
  export default { name: 'App' }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .jumbotron {
    margin-top: 5em ;
  }

  .custom-checkbox {
    display: flex;
    flex-direction: row;
  }

  [type=checkbox] {
    display: inline-flex;
    flex-grow: 0.05;
    position: relative;
      top: 0.2em;

  }

  [type=checkbox]::before {
    display: inline-flex;
  position: relative;
    top: 0.2em;
  }
  
  [type=checkbox]::before {}

    .close {
      padding: calc(var(--bs-modal-header-padding-y) * 0.5) calc(var(--bs-modal-header-padding-x) * 0.5);
      margin: calc(-0.5 * var(--bs-modal-header-padding-y)) calc(-0.5 * var(--bs-modal-header-padding-x)) calc(-0.5 * var(--bs-modal-header-padding-y)) auto;
      font-size: 1.5em;
      box-sizing: content-box;
      width: 1em;
      padding: 0.25em 0.25em;
      color: var(--bs-btn-close-color);
      background: transparent var(--bs-btn-close-bg) center/1em auto no-repeat;
      border: 0;
      border-radius: 25px;
      opacity: var(--bs-btn-close-opacity);
    }
  
    .close:hover {
      color: var(--bs-btn-close-color);
      text-decoration: none;
      opacity: var(--bs-btn-close-hover-opacity);
    }
  
    .close:focus {
      outline: 0;
      box-shadow: var(--bs-btn-close-focus-shadow);
      opacity: var(--bs-btn-close-focus-opacity);
    }

.form-group {
  margin-bottom: 1em;
}

</style>
