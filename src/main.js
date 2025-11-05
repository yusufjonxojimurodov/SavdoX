import { createApp, h } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";
import router from "./routers/router";
import useNotification from "./store/notifications.pinia";

const app = createApp(App);

app.use(createPinia());
app.use(Antd);
app.use(router);
app.mount("#app");

document.addEventListener(
  "click",
  () => {
    const notifStore = useNotification();
    notifStore.notifSound.play().catch(() => {});
    notifStore.notifSound.pause();
    notifStore.notifSound.currentTime = 0;
  },
  { once: true }
);
