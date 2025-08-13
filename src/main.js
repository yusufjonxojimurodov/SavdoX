import { createApp, h } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import App from "./App.vue";
import router from "./routers/router";
import { Select } from "ant-design-vue";
import IconClear from "./components/icons/IconClear.vue";

Select.props.clearIcon.default = () => h(IconClear);

const app = createApp(App);

app.use(createPinia());
app.use(Antd);
app.use(router);
app.mount("#app");
