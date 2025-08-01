import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: () => import("../pages/AppView.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../pages/Dashboard/DashboardView.vue"),
  },
  {
    path: "/basketProductView",
    name: "BasketProduct",
    component: () => import("../pages/BasketProduct/BasketProductView.vue"),
  }, 
  {
    path: "/basketProductView",
    name: "BasketProduct",
    component: () => import("../pages/Iphone/IphonePageView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
