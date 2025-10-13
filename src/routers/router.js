import { createRouter, createWebHistory } from "vue-router";
import useRegister from "@/store/register.pinia";

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
        component: () => import("@/pages/Products/ProductsView.vue"),
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
    path: "/seller",
    name: "Seller",
    component: () => import("@/pages/seller-page/SellerView.vue"),
    meta: { title: "Sotuvchi", requiresRole: ["seller", "admin"] },
    children: [
      {
        path: "products",
        name: "Products",
        component: () =>
          import("@/pages/seller-page/pages/products-page/ProductsView.vue"),
        meta: { title: "Mahsulotlaringiz", requiresRole: ["seller", "admin"] },
      },
      {
        path: "pending",
        name: "Pending",
        component: () =>
          import(
            "../pages/seller-page/pages/pending-products-seller-page/PendingProductSellerView.vue"
          ),
        meta: {
          title: "Tasdiqlanishi kutilayotganlar",
          requiresRole: ["seller", "admin"],
        },
      },
      {
        path: "statistic",
        name: "Statistic",
        component: () =>
          import("@/pages/seller-page/pages/statistic-page/StatisticView.vue"),
        meta: { title: "Statistikangiz", requiresRole: ["seller", "admin"] },
      },

      {
        path: "complaints",
        name: "Complaints",
        component: () =>
          import(
            "../pages/seller-page/pages/complaint-seller/ComplaintView.vue"
          ),
        meta: { title: "Shikoyatlaringiz", requiresRole: ["seller", "admin"] },
      },

      {
        path: "deliveries/history",
        name: "Delivery History",
        component: () =>
          import(
            "@/pages/seller-page/pages/buyyed-products/BuyyedProductsView.vue"
          ),
        meta: {
          title: "Yetkazmalar tarixi",
          requiresRole: ["seller", "admin"],
        },
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

router.beforeEach(async (to, from, next) => {
  const registerStore = useRegister();

  if (!registerStore.user) {
    await registerStore.userInfo();
  }

  if (to.meta.requiresRole) {
    const allowedRoles = to.meta.requiresRole;
    const userRole = registerStore.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return next("/403");
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
