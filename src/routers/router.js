import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: () => import("../pages/AppView.vue"),
  },
  {
    path: "/basketProductView",
    name: "BasketProduct",
    component: () => import("../pages/BasketProduct/BasketProductView.vue"),
  },
  {
    path: "/basketProductView",
    name: "BasketProduct",
    component: () => import("../pages/BasketProduct/BasketProductView.vue"),
  },
  {
    path: "/iphonePageView",
    name: "IphonePage",
    component: () => import("../pages/Iphone/IphonePageView.vue"),
  },
  {
    path: "/samsungPageView",
    name: "SamsungPage",
    component: () => import("../pages/SamsungPage/SamsungPageView.vue"),
  },
  {
    path: "/xiaomiPageView",
    name: "XiaomiPage",
    component: () => import("../pages/XiaomiPage/XiaomiPageView.vue"),
  },
  {
    path: "/googlePageView",
    name: "GooglePage",
    component: () => import("../pages/Google-Page/GoogleView.vue"),
  },
  {
    path: "/seller",
    name: "SellerPage",
    component: () => import("../pages/seller-page/SellerView.vue"),
  },
  {
    path: "/pending/product",
    name: "PendingPage",
    component: () =>
      import("../pages/pending-products-buyer/PendingProductsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
