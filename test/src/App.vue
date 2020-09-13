<template>
  <div id="app">
    <accordion v-model="expanded">
      <div v-for="item of items" :key="item">
        {{item}}
      </div>
    </accordion>
  </div>
</template>

<script>
  import Accordion from './components/Accordion.vue';

  export default {
    name: 'App',

    data: () => ({
      expanded: false,
      items: Array
        .apply(null, { length: 5 })
        .map(Math.random)
    }),

    components: {
      Accordion
    }
  }
</script>

<style >
  html,
  body {
    font-family: Cambria, Cochin, serif;
  }

  #app {
    margin: auto;
    max-width: 50vw;
  }
</style>