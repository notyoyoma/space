import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Home from "./Home";
import router from "./router";

const app = createApp(Home);

app.component("i-fa", FontAwesomeIcon);
app.use(router);
app.mount("#app");
