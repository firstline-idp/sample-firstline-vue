import { createRouter as createVueRouter, createWebHistory, Router } from "vue-router";
import Home from "../views/Home.vue";
import Logout from "../views/Logout.vue";
import Secured from "../views/Secured.vue";
import { createAuthGuard } from "@first-line/firstline-vue";
import { App } from 'vue';

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/secured",
        name: "secured",
        component: Secured,
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/logout",
        name: "logout",
        component: Logout
      },
    ],
    history: createWebHistory()
  })
}
