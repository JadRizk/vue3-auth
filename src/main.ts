import { createApp } from "vue";
import { VuelidatePlugin } from "@vuelidate/core";
import Toast, { POSITION, PluginOptions } from "vue-toastification";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faLock,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faTwitter,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Tailwind Config
import "./assets/css/styles.css";
// vue-toastification
import "vue-toastification/dist/index.css";

// Icons imports
library.add(faChevronDown);
library.add(faLock);
library.add(faUser);
library.add(faEnvelope);
library.add(faFacebook);
library.add(faTwitter);
library.add(faGoogle);
library.add(faLinkedin);

// This will kick of the initial replacement of i to svg tags and configure a MutationObserver
// Replace <i> by <svg> using the browser API
dom.watch();

// Setup our toast configuations
const toastOptions: PluginOptions = {
  // Setting the global default position
  position: POSITION.TOP_RIGHT,
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  timeout: 3000,
};

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VuelidatePlugin);
app.use(Toast, toastOptions);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
