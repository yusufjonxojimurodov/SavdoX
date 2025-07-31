import { defineStore } from "pinia";
import {
  ApiBasketProduct,
  ApiCreateProduct,
  ApiGetProducts,
} from "../api/products.api";
import { message } from "ant-design-vue";

const useProducts = defineStore("products", {
  state: () => ({
    products: [],
    basketProducts: [],
    loader: false,
    createLoader: false,
  }),

  actions: {
    async createProduct(form) {
      this.loader = true;
      try {
        const { data } = await ApiCreateProduct(form);
        this.products = data;
        message.success("Mahsulot Yaratildi");
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "Mahsulot yaratishda xatolik yuzaga keldi";
        message.error(errorMessage);
      } finally {
        this.loader = false;
      }
    },

    async getProducts({ search = null, price = null }) {
      this.loader = true;

      try {
        const { data } = await ApiGetProducts(search, price);
        this.products = data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Server bilan bog'liq xatolik";
        message.warning(errorMessage);
      } finally {
        this.loader = false;
      }
    },

    async basketProduct(productId) {
      this.loader = true;

      try {
        await ApiBasketProduct(productId);
        message.success("Mahsulot savatchaga qoshildi");
      } catch (errorBasket) {
        const errorMessage =
          errorBasket.data?.response?.message ||
          "Mahsulotni savatchaga qo'shib bo'lmadi";
        message.error(errorMessage);
      } finally {
        this.loader = false;
      }
    },
  },
});

export default useProducts;
