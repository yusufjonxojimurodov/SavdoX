import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/register",
    name: "RegisterView",
    component: () => import("../pages/auth/register/RegisterView.vue"),
  },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
