import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 引入组件库和样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入刚写好的路由设备
import router from "./router/index.js";
//引入Pinia
import { createPinia } from "pinia";

// 1. 创建 Vue 应用实例
const app = createApp(App);
// 2. 使用 Element Plus
app.use(ElementPlus);
//使用路由
app.use(router);
// 3. 挂载到页面上
//让pinia上岗
app.use(createPinia());
app.mount("#app");
