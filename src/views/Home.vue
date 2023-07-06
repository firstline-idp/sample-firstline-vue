<template>
  <div v-if="isLoading">
    <p class="text-2xl mb-4">Loading ...</p>
  </div>

  <div v-if="!isLoading">
    <div v-if="isAuthenticated">
      <h1 class="text-2xl mb-4">Welcome {{user.email}}.</h1>
      <home-content />
    </div>
    <div v-if="!isAuthenticated">
      <h1 class="text-2xl mb-2">Please sign-in </h1>
      <button
        id="qsLoginBtn"
        class="sm:whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm duration-100 select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active"
        @click.prevent="login"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import HomeContent from "../components/HomeContent.vue";
import { useFirstline } from '@first-line/firstline-vue';

export default {
  name: "home-view",
  components: {
    HomeContent
  },
  setup() {
    const firstline = useFirstline();
    return {
      isAuthenticated: firstline.isAuthenticated,
      isLoading: firstline.isLoading,
      user: firstline.user,
      login() {
        firstline.loginWithRedirect();
      },
      logout() {
        firstline.logout();
      }
    }
  }
};
</script>