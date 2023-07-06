<template>
  <div id="app">
    <nav-bar />

    <div class="lg:px-12 px-6 py-8">
      <div class="mb-2">
        <error />
      </div>
      
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";
import Error from "./components/Error.vue";
import "./App.css";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>
