import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { createFirstline } from "@first-line/firstline-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";

hljs.registerLanguage('json', json);

const app = createApp(App);

library.add(faLink, faUser, faPowerOff);

app
  .use(hljsVuePlugin)
  .use(createRouter(app))
  .use(
    createFirstline({
      domain: import.meta.env.VITE_FIRSTLINE_DOMAIN,
      audience: import.meta.env.VITE_FIRSTLINE_AUDIENCE,
      client_id: import.meta.env.VITE_FIRSTLINE_CLIENT_ID,
      redirect_uri: window.location.origin,
      logout_uri: `${window.location.origin}/logout`
    })
  )
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
