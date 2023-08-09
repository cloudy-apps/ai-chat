import "./style.css";
import { createApp } from "vue";
import { setEnv } from "./composables/env";
import App from "./components/App.vue";

fetch("/.env")
  .then((x) => x.json())
  .then((env) => {
    setEnv(env);
    createApp(App).mount("#app");
  });
