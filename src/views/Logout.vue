<template>
  <div>
    <p v-if="!isLoading && !isAuthenticated" class="text-2xl mb-2">You have been successfully signed out.</p>
    <router-link to="/" class="hover:underline text-primary">Return home</router-link>
  </div>
</template>

<script lang="ts">
import { useFirstline } from '@first-line/firstline-vue';

export default {
  name: "logout-view",
  setup() {
    const { isLoading, isAuthenticated } = useFirstline();
    return {
      isLoading,
      isAuthenticated
    }
  }
};
</script>

