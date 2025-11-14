import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "@/pages/Products/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: () => import("@/pages/AppView.vue"),
    meta: { title: "Home" },
    children: [
      {
        path: "",
        name: "Mahsulotlar",
        component: ProductsView,
        meta: { title: "Mahsulotlar" },
      },
      {
        path: "apple",
        name: "Apple Mahsulotlari",
        component: () => import("@/pages/apple/IphonePageView.vue"),
        meta: { title: "Apple Mahsulotlari" },
      },
      {
        path: "samsung",
        name: "Samsung Mahsulotlari",
        component: () => import("@/pages/samsung/SamsungPageView.vue"),
        meta: { title: "Samsung Mahsulotlari" },
      },
      {
        path: "xiaomi",
        name: "Xiaomi Mahsulotlari",
        component: () => import("@/pages/xiaomi/XiaomiPageView.vue"),
        meta: { title: "Xiaomi Mahsulotlari" },
      },
      {
        path: "google",
        name: "Google Mahsulotlari",
        component: () => import("@/pages/google/GoogleView.vue"),
        meta: { title: "Google Mahsulotlari" },
      },
      {
        path: "others",
        name: "Boshqa Mahsulotlar",
        component: () => import("@/pages/others/OthersProductView.vue"),
        meta: { title: "Boshqa Mahsulotlar" },
      },
      {
        path: "product/info",
        name: "ProductInfo",
        component: () => import("@/pages/product-info/ProductInfoView.vue"),
        meta: { title: "Mahsulot haqida" },
      },
    ],
  },
  {
    path: "/basket",
    name: "Basket",
    component: () => import("@/pages/basket-product/BasketProductView.vue"),
    meta: { title: "Savatcha" },
  },
  {
    path: "/pending/product",
    name: "Pending Products",
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

// router.beforeEach(async (to, from, next) => {
//   const registerStore = useRegister();

//   if (!registerStore.user) {
//     await registerStore.userInfo();
//   }

//   if (to.meta.requiresRole) {
//     const allowedRoles = to.meta.requiresRole;
//     const userRole = registerStore.user?.role;

//     if (!allowedRoles.includes(userRole)) {
//       return next("/403");
//     }
//   }

//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }

//   next();
// });

export default router;
