import { createRouter, createWebHistory } from "vue-router";
import Lottery from "../views/Lottery.vue";
import About from "../views/About.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Lottery },
    { path: "/about", component: About },
  ],
});

export default router;
