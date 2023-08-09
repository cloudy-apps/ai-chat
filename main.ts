import "./style.css";
import { createApp } from "vue";
import App from "./components/App.vue";

fetch("/.env")
  .then((x) => x.json())
  .then((env) => {
    createApp(App, { env }).mount("#app");
  });
