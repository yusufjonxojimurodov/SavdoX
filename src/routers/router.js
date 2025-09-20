import { createRouter, createWebHistory } from "vue-router";
import useRegister from "@/store/register.pinia";

const routes = [
  {
    path: "/",
    name: "AppView",
    component: () => import("../pages/AppView.vue"),
    meta: { title: "Home" },
    children: [
      {
        path: "",
        name: "Mahsulotlar",
        component: () => import("@/pages/Products/ProductsView.vue"),
        meta: { title: "Mahsulotlar" },
      },
      {
        path: "apple",
        name: "Apple Mahsulotlari",
        component: () => import("@/pages/Iphone/IphonePageView.vue"),
        meta: { title: "Apple Mahsulotlari" },
      },
      {
        path: "samsung",
        name: "Samsung Mahsulotlari",
        component: () => import("@/pages/SamsungPage/SamsungPageView.vue"),
        meta: { title: "Samsung Mahsulotlari" },
      },
      {
        path: "xiaomi",
        name: "Xiaomi Mahsulotlari",
        component: () => import("@/pages/XiaomiPage/XiaomiPageView.vue"),
        meta: { title: "Xiaomi Mahsulotlari" },
      },
      {
        path: "google",
        name: "Google Mahsulotlari",
        component: () => import("@/pages/Google-Page/GoogleView.vue"),
        meta: { title: "Google Mahsulotlari" },
      },
      {
        path: "others",
        name: "Boshqa Mahsulotlar",
        component: () => import("@/pages/others/OthersProductView.vue"),
        meta: { title: "Boshqa Mahsulotlar" },
      },
    ],
  },
  {
    path: "/basket",
    name: "Savatcha",
    component: () => import("@/pages/BasketProduct/BasketProductView.vue"),
    meta: { title: "Savatcha" },
  },
  {
    path: "/seller",
    name: "Sotuvchi",
    component: () => import("@/pages/seller-page/SellerView.vue"),
    meta: { title: "Sotuvchi", requiresRole: "seller" },
  },
  {
    path: "/pending/product",
    name: "Kutilayotgan Mahsulotlar",
    component: () =>
      import("@/pages/pending-products-buyer/PendingProductsView.vue"),
    meta: { title: "Kutilayotgan Mahsulotlar" },
  },
  {
    path: "/buyyed/product",
    name: "Sotib Olingan Mahsulotlar",
    component: () =>
      import("@/pages/buyyed-product-buyer/BuyyedProductView.vue"),
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
    path: "/404",
    name: "404",
    component: () => import("@/pages/error/PageNotFound.vue"),
    meta: { title: "Sahifa Topilmadi" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const registerStore = useRegister();

  if (
    to.meta.requiresRole &&
    registerStore.user.role !== to.meta.requiresRole
  ) {
    return next("/403");
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;