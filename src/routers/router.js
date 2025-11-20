import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "@/pages/Products/ProductsView.vue";
import AppView from "@/pages/AppView.vue";
import IphonePageView from "../pages/apple/IphonePageView.vue";
import SamsungPageView from "../pages/samsung/SamsungPageView.vue";
import XiaomiPageView from "../pages/xiaomi/XiaomiPageView.vue";
import GoogleView from "../pages/google/GoogleView.vue";
import OthersProductView from "../pages/others/OthersProductView.vue";
import ProductInfoView from "../pages/product-info/ProductInfoView.vue";
import ChatsView from "../pages/chats/ChatsView.vue";
import BasketProductView from "../pages/basket-product/BasketProductView.vue";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: AppView,
    meta: { title: "Home" },
    children: [
      {
        path: "",
        name: "Products",
        component: ProductsView,
        meta: { title: "Mahsulotlar" },
      },
      {
        path: "apple",
        name: "Apple",
        component: IphonePageView,
        meta: { title: "Apple Mahsulotlari" },
      },
      {
        path: "samsung",
        name: "Samsung",
        component: SamsungPageView,
        meta: { title: "Samsung Mahsulotlari" },
      },
      {
        path: "xiaomi",
        name: "Xiaomi",
        component: XiaomiPageView,
        meta: { title: "Xiaomi Mahsulotlari" },
      },
      {
        path: "google",
        name: "Google",
        component: GoogleView,
        meta: { title: "Google Mahsulotlari" },
      },
      {
        path: "others",
        name: "Others",
        component: OthersProductView,
        meta: { title: "Boshqa Mahsulotlar" },
      },
      {
        path: "product/info",
        name: "ProductInfo",
        component: ProductInfoView,
        meta: { title: "Mahsulot haqida" },
      },
      {
        path: "chats",
        name: "Chats",
        component: ChatsView,
        meta: { title: "Chatlar" },
      },
    ],
  },
  {
    path: "/basket",
    name: "Basket",
    component: BasketProductView,
    meta: { title: "Savatcha" },
  },
  {
    path: "/pending/product",
    name: "PendingProducts",
    component: () => import("@/pages/pending-product/PendingProductsView.vue"),
    meta: { title: "Kutilayotgan Mahsulotlar" },
  },
  {
    path: "/buyyed/product",
    name: "History",
    component: () => import("@/pages/history/BuyyedProductView.vue"),
    meta: { title: "Sotib Olingan Mahsulotlar" },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/pages/error/ServerNotWorking.vue"),
    meta: { title: "Server bilan muammo" },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/pages/error/ForbiddenPage.vue"),
    meta: { title: "Ruxsat berilmadi" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/error/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
