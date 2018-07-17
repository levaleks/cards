<template>
  <div id="app">
    <app-cards> </app-cards>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppCards from './components/AppCards.vue';

  @Component({
    components: {
      AppCards,
    },
  })
  export default class App extends Vue {}
</script>

<style lang="scss"></style>
