<template>
  <div class="h-16">
    <nav class="px-4 lg:px-8 py-4 flex justify-between items-center fixed z-10 w-full bg-white border-b border-slate-100">
      <ul class="flex items-center px-4 w-full">
        <li class="px-2">
          <router-link to="/" class="no-link-style flex items-center gap-3">
            <img
              src="/firstline-logo.svg"
              alt=""
              class="h-6"
            />
            <h1 class="font-medium tracking-wider text-xl">Firstline</h1>
          </router-link>
        </li>

        <li class="pl-4 pr-2" v-if="isAuthenticated">
          <router-link to="/secured" class="hover:underline">Secured Page</router-link>
        </li>
        <li class="grow"></li>        
        <li class="px-2">
          <button
            v-if="!isAuthenticated && !isLoading"
            id="qsLoginBtn"
            class="sm:whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm duration-100 select-none bg-primary text-white hover:bg-primary-hover active:bg-primary-active"
            @click.prevent="login"
          >
            Login
          </button>
          <button
            v-if="isAuthenticated"
            id="qsLogoutBtn"
            class="sm:whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm duration-100 select-none bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-100"
            @click.prevent="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { useFirstline } from '@first-line/firstline-vue';

export default {
  name: "NavBar",
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

